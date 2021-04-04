--include("_webpsup.js");
--include("_cars-data.js");

let overlay = $(".overlay");
let body = $("body");
let header = $(".section-header");
let main_pane = $(".section-main");
let isHeaderTop = true;
let isMainPage = $("#main_page").length;

if (isMainPage) {
    window.addEventListener('scroll', function() {
        if (pageYOffset >= main_pane.outerHeight() && isHeaderTop) {
            header.addClass("fixed");
            isHeaderTop = false;
        }
        if (pageYOffset <= main_pane.outerHeight() && !isHeaderTop) {
            header.removeClass("fixed");
            isHeaderTop = true;
        }
    });
}
else {
    header.addClass("fixed static");
}

$(document).ready(function() {

    --include("_slider-config.js");
    --include("_cars-slider.js");
    --include("_tariffs-slider.js");

    let faq_content = $(".faq-content-item");

    $(faq_content).click(function (e) {
        let elem = $(this).children(":last");
        if (!elem.is(':visible')) {
            elem.slideDown('normal');
        } 
        else {
            elem.slideUp('normal');
        }
    });

 

    // КОД ДЛЯ БУРГЕР МЕНЮ
    
    // let button_burger = $(".burger");
    // let menu_burger = $(".header-menu");
    // let body = $("body");

    // $(button_burger).click(function () {
    //     if (!menu_burger.is(':visible')) {
    //         menu_burger.slideDown('normal');
    //         body.css("overflow-y", "hidden");
    //     } 
    //     else {
    //         menu_burger.slideUp('normal');
    //         body.css("overflow-y", "");
    //     }
    // });

    /* 
    
    $("#open_modal").click(function() {
        overlay.css("visibility", "visible");
        overlay.css("opacity", "0.8");
        body.css("overflow-y", "hidden");

        if ($(window).width() <= '576') { // высота открытия модали на мобиле
            $(".modal-form").css("top", "50px");
        }
        
        if ($(window).width() > '576') { // высота открытия на экране больше 576
            $(".modal-form").css("top", "120px");
        }
    });

    $(".overlay").click(function() {

        $(".modal-form").css("top", "");
        body.css("overflow-y", "");
        overlay.css("visibility", "");
        overlay.css("opacity", "");
    });

    */

});