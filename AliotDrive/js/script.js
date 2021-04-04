// Проверка на поддержку WebP от браузера

function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp-support');
    }
});;
let jsonData = [
    {
        name: "Volkswagen Toureg",
        description: "Динамичный и лёгкий в управлении седан. Более приятные цены по сравнению.",
        drive_cost: "От 8 ₽/мин",
        wait_cost: "От 5 ₽/мин"
    },
    {
        name: "Volkswagen Polo",
        description: "Динамичный и лёгкий в управлении седан. Более приятные цены по сравнению.",
        drive_cost: "От 8 ₽/мин",
        wait_cost: "От 5 ₽/мин"
    },
    {
        name: "Kia Rio",
        description: "Динамичный и лёгкий в управлении седан. Более приятные цены по сравнению.",
        drive_cost: "От 8 ₽/мин",
        wait_cost: "От 5 ₽/мин"
    },
    {
        name: " Mercedes-Benz SLK 280",
        description: "Динамичный и лёгкий в управлении седан. Более приятные цены по сравнению.",
        drive_cost: "От 8 ₽/мин",
        wait_cost: "От 5 ₽/мин"
    },
    {
        name: "Volkswagen Multivan T6",
        description: "Динамичный и лёгкий в управлении седан. Более приятные цены по сравнению.",
        drive_cost: "От 8 ₽/мин",
        wait_cost: "От 5 ₽/мин"
    }
];

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

    let start_id = 1;

$(".cars-slider-container").click(function(e) {
    let id = e.currentTarget.dataset.id;
    if (id !== start_id) {
        start_id = id;
        let img = document.querySelector(".cars-info-preview img");
        img.classList.add("invisible");
        
        setTimeout(function() {
            document.querySelector(".cars-info-preview source").setAttribute("srcset", `./img/car_max_${id}.webp`);
            img.setAttribute("src", `./img/car_max_${id}.png`);
            img.setAttribute("alt", jsonData[id-1].name);
            img.classList.remove("invisible")
        }, 300)
    
        document.querySelector(".cars-info-descr-title").innerText = jsonData[id-1].name;
        document.querySelector(".cars-info-descr-text").innerText = jsonData[id-1].description;
        document.querySelector(".drive_cost").innerText = jsonData[id-1].drive_cost;
        document.querySelector(".wait_cost").innerText = jsonData[id-1].wait_cost;
    }
});;
    $('.cars-slider').lightSlider({
    item:5,
    slideMove: 1,
    slideMargin: "",
    controls: false,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    speed: 600,
    responsive : [
        {
            breakpoint: 1000,
            settings: {
                item:2,
                slideMove:1
              }
        },
        {
            breakpoint: 578,
            settings: {
                item: 1,
                slideMove: 1
              }
        }
    ]
}); ;
    $('.tariffs-slider').lightSlider({
    item: 4,
    slideMove: 1,
    slideMargin: "",
    controls: true,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    speed: 600,
    responsive : [
        {
            breakpoint: 1280,
            settings: {
                item: 3
            }
        },
        {
            breakpoint: 578,
            settings: {
                item: 1,
                slideMove: 1
              }
        }
    ]
});  ;

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