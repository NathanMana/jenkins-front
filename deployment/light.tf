# Configure the AWS Provider
provider "aws" {
  region = "eu-west-1"
}

variable "project_name" {
  type     = string
  default = "web_app"
}

variable "deploy_env" {
  type     = string
  default = "dev"
}

variable "key_name" {
  type = string
  default = "privateKey"
}

variable "private_key" {
  type = string
}

#Init the backend
terraform {
  backend "s3" {
    bucket = "s3-bucket-project-efrei-deploy"
    key    = "bucket/deploy/key"
    region = "eu-west-1"
  }
}

#Retrieve vpc main
data "aws_vpc" "main" {
  filter {
    name   = "tag:Name"
    values = ["main_vpc"]
  }
  filter {
    name   = "tag:Env"
    values = [var.deploy_env]
  }

  filter {
    name   = "tag:Project"
    values = [var.project_name]
  }
}


data "aws_subnet" "first" {
  filter {
    name   = "tag:Name"
    values = ["first"]
  }

  filter {
    name   = "tag:Env"
    values = [var.deploy_env]
  }

  filter {
    name   = "tag:Project"
    values = [var.project_name]
  }
  vpc_id = data.aws_vpc.main.id
}

# Autoscaling group
resource "aws_security_group" "allow_http" {
  name        = "allow_http_traffic"
  description = "Allow TLS inbound traffic"
  vpc_id      = data.aws_vpc.main.id

  ingress {
    description = "TLS from VPC"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

   ingress {
    description = "TLS from VPC"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outbound traffic.
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Project = var.project_name
    Env = var.deploy_env
  }
}

resource "aws_security_group" "allow_ssh" {
  name        = "Allow ssh"
  description = "Example security group for EC2 instances"
  vpc_id      = data.aws_vpc.main.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

#Trying to create a new instance in a specific region
resource "aws_instance" "randomInstance" {
  ami           = "ami-0333305f9719618c7"
  instance_type = "t2.micro"
  subnet_id = data.aws_subnet.first.id
  security_groups = [aws_security_group.allow_http.id, aws_security_group.allow_ssh.id]
  associate_public_ip_address = true
  key_name = "kp-devOps-project"

  provisioner "remote-exec" {
    inline = ["sudo apt update", "sudo apt install python3 -y", "echo Done!"]

    connection {
      host        = self.public_ip
      type        = "ssh"
      user        = "ubuntu"
      private_key = var.private_key
    }
  }

  provisioner "local-exec" {
    command = "ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i ${self.public_ip}, -u ubuntu --private-key=${var.private_key} playbook.yml"
  }
}