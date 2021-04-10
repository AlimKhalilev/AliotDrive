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
    --include("_modal.js")

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
        let zone_map_coords = [
            [30, 10],
            [20, 20],
            [30, 30],
            [40, 40],
            [50, 50],
            [60, 60]
        ]
        $(".to-start").click(function(e) {
            document.querySelector(".section-start").scrollIntoView({ behavior: 'smooth' })
            e.preventDefault();
        });
    
        $(".to-tariffs").click(function(e) {
            document.querySelector(".section-tariffs").scrollIntoView({ behavior: 'smooth' })
            e.preventDefault();
        });

        $(".zone-content-items-item").hover(function(e) {
            let index = $(this).index();
            $(".zone-content-map-location").css("top", `${zone_map_coords[index][0]}%`);
            $(".zone-content-map-location").css("left", `${zone_map_coords[index][1]}%`);
            console.log();
        }, function(e) {
            $(".zone-content-map-location").css("top", `-10%`);
            $(".zone-content-map-location").css("top", `-10%`);
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