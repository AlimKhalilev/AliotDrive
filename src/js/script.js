--include("_webpsup.js");
--include("_cars-data.js");

let overlay = $(".overlay");
let body = $("body");
let header = $(".section-header");
let main_pane = $(".section-main");
let isHeaderTop = true;
let isMainPage = $("#main_page").length;
let isContactPage = $("#contact_page").length;
let ROMAN = 0;

function showModal(name) {
    overlay.css("visibility", "visible");
    overlay.css("opacity", "0.8");
    body.css("overflow-y", "hidden");

    if ($(window).width() <= '576') { // высота открытия модали на мобиле
        $(name).css("top", "50px");
    }
    
    if ($(window).width() > '576') { // высота открытия на экране больше 576
        $(name).css("top", "120px");
    }
}

function closeModals() {
    $(".modal").css("top", "");
    body.css("overflow-y", "");
    overlay.css("visibility", "");
    overlay.css("opacity", "");
}

$(".overlay, .modal-close, .modal-close-dop").click(function() {
    closeModals();
});

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
    header.addClass("static");
}

$(document).ready(function() {

    if (ROMAN) {
        showModal(".modalAction");
    }

    --include("_slider-config.js");
    --include("_cars-slider.js");
    --include("_tariffs-slider.js");
    --include("_modal.js");

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

    if (isMainPage) {

        function scaleIcon(id) {
            map_location_item[id].classList.toggle("scale");
        }

        let map_location_item = document.querySelectorAll(".zone-content-info-map-location img");

        $(".zone-content-info-items-item").hover(function(e) {
            scaleIcon($(this).index());
        }, function(e) {
            scaleIcon($(this).index());
        });

        $(".to-start").click(function(e) {
            document.querySelector(".section-start").scrollIntoView({ behavior: 'smooth' })
            e.preventDefault();
        });
    
        $(".to-tariffs").click(function(e) {
            document.querySelector(".section-tariffs").scrollIntoView({ behavior: 'smooth' })
            e.preventDefault();
        });

        $(".openModalApp").click(function() {
            showModal(".modalApp");
        });
    }

    // КОД ДЛЯ БУРГЕР МЕНЮ
    
    let button_burger = $(".burger");
    let menu_burger = $(".header-menu");
    let body = $("body");

    $(button_burger).click(function () {
        if (!menu_burger.is(':visible')) {
            menu_burger.slideDown('normal');
            body.css("overflow-y", "hidden");
        } 
        else {
            menu_burger.slideUp('normal');
            body.css("overflow-y", "");
        }
    });

});