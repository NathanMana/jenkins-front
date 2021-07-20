$(document).ready(function(){

    /* DECLARATION DES VARIABLES */
    let inverse = false;
    let countCaroussel = 0;
    let tabInverse = [];
    let tabCountCaroussel = [];
    let isContainer = $('.caroussel');

    let time1 = null;
    let time2 = null;
    let time3 = null;

    if(isContainer.length === 1){
        $('.caroussel-inner').css({
            "-webkit-transform":"translateX(-0%)",
            "-ms-transform":"translateX(-0%)",
            "transform":"translateX(-0%)"
        });

        if($('.caroussel')[0].className.indexOf("caroussel-control")){
            let nberChildren = $('.caroussel-inner')[0].children.length;
            for(var i=0; i < nberChildren; i++){
                if(i === 0){ //Pour l'initiation
                    $('.positionning').append("<div class='child child-white child-active' id='child-" + i + "'></div>");
                } else {
                    $('.positionning').append("<div class='child child-white' id='child-" + i + "'></div>");
                }
            }
            time1 = setInterval(() => {
                caroussel(nberChildren);
            }, 8000);
        } else {
            let nberChildren = $('.caroussel-inner')[0].children.length;
            for(var i=0; i < nberChildren; i++){
                if(i === 0){ //Pour l'initiation
                    $('.positionning').append("<div class='child child-active' id='child-" + i + "'></div>");
                } else {
                    $('.positionning').append("<div class='child' id='child-" + i + "'></div>");
                }
            }
            time1 = setInterval(() => {
                caroussel(nberChildren);
            }, 3000);
        }
    } else if($('.caroussel').length === 2){
        var selector = document.querySelectorAll(".caroussel-inner");

        let nberChildren = [];
        for(var i = 0; i < selector.length; i++){
            selector[i].classList.add("caroussel-nber-" + i);
            nberChildren.push(selector[i].children.length);
            tabCountCaroussel.push(0);
            tabInverse.push(false);
            $('.caroussel-nber-' + i).css({
                "-webkit-transform":"translateX(-0%)",
                "-ms-transform":"translateX(-0%)",
                "transform":"translateX(-0%)"
            });
        }
        time2 = setInterval(() => {
            caroussel2(nberChildren[0]);
            caroussel3(nberChildren[1]);
        }, 3000);
    } 
    else if($('.caroussel').length === 3) {
        var selector = document.querySelectorAll(".caroussel-inner");

        let nberChildren = [];
        for(var i = 0; i < selector.length; i++){
            selector[i].classList.add("caroussel-nber-" + i);
            nberChildren.push(selector[i].children.length);
            tabCountCaroussel.push(0);
            tabInverse.push(false);
            $('.caroussel-nber-' + i).css({
                "-webkit-transform":"translateX(-0%)",
                "-ms-transform":"translateX(-0%)",
                "transform":"translateX(-0%)"
            });
        }
        time3 = setInterval(() => {
            caroussel2(nberChildren[0]);
            caroussel3(nberChildren[1]);
            caroussel4(nberChildren[1]);
        }, 3000);
    }

    if($('.child')){
        $('.child').click(function(){ 
            $('.child-active').removeClass('child-active');
            $(this).addClass('child-active');
            var idString = $(this).attr('id');
            var id = idString.substring(idString.length - 1, idString.length); //On récupère l'id de l'élément sur lequel on a cliqué

            clearInterval(time1);

            $('.caroussel-inner').css({
                "-webkit-transform":"translateX(-"+ id +"00%)",
                "-ms-transform":"translateX(-"+ id +"00%)",
                "transform":"translateX(-"+ id +"00%)"
            });
        });
    }

    function caroussel(nbChildren){
        
        var valueString = $('.caroussel-inner')[0].style.msTransform;
        let value = 0;

        if(valueString === "translateX(-0%)" ||valueString === "translateX(0%)"){
            value = 0;
        } else {
            value = parseInt(valueString.substring(valueString.length - 5, valueString.length - 2));
        }
         
        let calc = 100;

        if(inverse){
            calc = -(value - 100);
            $('#child-' + countCaroussel).removeClass("child-active");
            countCaroussel--;
            $('#child-' + countCaroussel).addClass("child-active");
        } else {
            calc = -(Math.abs(value) + 100);
            $('#child-' + countCaroussel).removeClass("child-active");
            countCaroussel++;
            $('#child-' + countCaroussel).addClass("child-active");
        }

        if(countCaroussel === nbChildren - 1){
            inverse = true;
        } else if(countCaroussel === 0) {
            inverse = false;
        } 

        $('.caroussel-inner').css({
            "-webkit-transform":"translateX(" + calc +"%)",
            "-ms-transform":"translateX(" + calc +"%)",
            "transform":"translateX(" + calc +"%)"
        });
    }

    function caroussel2(nbChildren){
        
        var valueString = $('.caroussel-inner')[0].style.msTransform;
        let value = 0;

        if(valueString === "translateX(-0%)" ||valueString === "translateX(0%)"){
            value = 0;
        } else {
            value = parseInt(valueString.substring(valueString.length - 5, valueString.length - 2));
        }
         
        let calc = 100;
        
        if(tabInverse[0]){
            calc = -(value - 100);
            $('.caroussel-nber-0 #child-' + tabCountCaroussel[0]).removeClass("child-active");
            tabCountCaroussel[0]--;
            $('.caroussel-nber-0 #child-' + tabCountCaroussel[0]).addClass("child-active");
        } else {
            calc = -(Math.abs(value) + 100);
            $('.caroussel-nber-0 #child-' + tabCountCaroussel[0]).removeClass("child-active");
            tabCountCaroussel[0]++;
            $('.caroussel-nber-0 #child-' + tabCountCaroussel[0]).addClass("child-active");
        }


        if(tabCountCaroussel[0] === nbChildren - 1){
            tabInverse[0] = true;
        } else if(tabCountCaroussel[0] === 0) {
            tabInverse[0] = false;
        } 

        $('.caroussel-nber-0').css({
            "-webkit-transform":"translateX(" + calc +"%)",
            "-ms-transform":"translateX(" + calc +"%)",
            "transform":"translateX(" + calc +"%)"
        });
    }

    function caroussel3(nbChildren){
        var valueString = $('.caroussel-inner')[1].style.msTransform;
        let value = 0;

        if(valueString === "translateX(-0%)" ||valueString === "translateX(0%)"){
            value = 0;
        } else {
            value = parseInt(valueString.substring(valueString.length - 5, valueString.length - 2));
        }
         
        let calc = 100;

        if(tabInverse[1]){
            calc = -(value - 100);
            $('.caroussel-nber-1 #child-' + tabCountCaroussel[1]).removeClass("child-active");
            tabCountCaroussel[1]--;
            $('.caroussel-nber-1 #child-' + tabCountCaroussel[1]).addClass("child-active");
        } else {
            calc = -(Math.abs(value) + 100);
            $('.caroussel-nber-1 #child-' + tabCountCaroussel[1]).removeClass("child-active");
            tabCountCaroussel[1]++;
            $('.caroussel-nber-1 #child-' + tabCountCaroussel[1]).addClass("child-active");
        }

        if(tabCountCaroussel[1] === nbChildren - 1){
            tabInverse[1] = true;
        } else if(tabCountCaroussel[1] === 0) {
            tabInverse[1] = false;
        } 

        $('.caroussel-nber-1').css({
            "-webkit-transform":"translateX(" + calc +"%)",
            "-ms-transform":"translateX(" + calc +"%)",
            "transform":"translateX(" + calc +"%)"
        });
    }

    function caroussel4(nbChildren){
        var valueString = $('.caroussel-inner')[2].style.msTransform;
        let value = 0;

        if(valueString === "translateX(-0%)" ||valueString === "translateX(0%)"){
            value = 0;
        } else {
            value = parseInt(valueString.substring(valueString.length - 5, valueString.length - 2));
        }
         
        let calc = 100;

        if(tabInverse[2]){
            calc = -(value - 100);
            $('.caroussel-nber-2 #child-' + tabCountCaroussel[2]).removeClass("child-active");
            tabCountCaroussel[2]--;
            $('.caroussel-nber-2 #child-' + tabCountCaroussel[2]).addClass("child-active");
        } else {
            calc = -(Math.abs(value) + 100);
            $('.caroussel-nber-2 #child-' + tabCountCaroussel[2]).removeClass("child-active");
            tabCountCaroussel[2]++;
            $('.caroussel-nber-2 #child-' + tabCountCaroussel[2]).addClass("child-active");
        }

        if(tabCountCaroussel[2] === nbChildren - 1){
            tabInverse[2] = true;
        } else if(tabCountCaroussel[1] === 0) {
            tabInverse[2] = false;
        } 

        $('.caroussel-nber-2').css({
            "-webkit-transform":"translateX(" + calc +"%)",
            "-ms-transform":"translateX(" + calc +"%)",
            "transform":"translateX(" + calc +"%)"
        });
    }
});

var openMenu = false;

function openSlideMenu(){
    if(!openMenu){
        $('.responsive-menu').css({'height':'fit-content'});
        openMenu = true;
    } else {
        $('.responsive-menu').css({'height':'0'});
        openMenu = false;
    }
}
