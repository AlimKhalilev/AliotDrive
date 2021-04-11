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
        drive_cost: "От 10 ₽/мин",
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
        drive_cost: "От 12 ₽/мин",
        wait_cost: "От 5 ₽/мин"
    },
    {
        name: "Volkswagen Multivan T6",
        description: "Динамичный и лёгкий в управлении седан. Более приятные цены по сравнению.",
        drive_cost: "От 12 ₽/мин",
        wait_cost: "От 5 ₽/мин"
    },
    {
        name: "Volkswagen Multivan T65",
        description: "Динамичный и лёгкий в управлении седан. Более приятные цены по сравнению.",
        drive_cost: "От 12 ₽/мин",
        wait_cost: "От 5 ₽/мин"
    }
];

let overlay = $(".overlay");
let body = $("body");
let header = $(".section-header");
let main_pane = $(".section-main");
let isHeaderTop = true;
let isMainPage = $("#main_page").length;
let isContactPage = $("#contact_page").length;

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
    let elem = $(this).children(":first");
    elem.toggleClass("active");

    if (id !== start_id) {
        let nodeList = document.querySelectorAll(".cars-slider-container-item");
        nodeList[start_id-1].classList.remove("active");

        start_id = id;
        nodeList[start_id-1].classList.add("active");

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
    controls: true,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    speed: 600,
    responsive : [
        {
            breakpoint: 780,
            settings: {
                item:3,
                slideMove:1
              }
        },
        {
            breakpoint: 578,
            settings: {
                item:2,
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
            breakpoint: 780,
            settings: {
                item: 2,
                slideMove: 1
              }
        },
        {
            breakpoint: 580,
            settings: {
                item: 1,
                slideMove: 1
              }
        }
    ]
});  ;

    if (isContactPage) {
        let overlay = $(".overlay");

let modal_type = null;
let modal_form_content = [];
let modal_form_error_text = document.querySelector(".modal-form-error");
let modal_form_save = document.querySelector("#send_button");
let modal_form_inputs = document.querySelectorAll(".modal_input");
let correctForm = false;

function showModal(name) {
    overlay.css("visibility", "visible");
    overlay.css("opacity", "0.8");
    body.css("overflow-y", "hidden");

    if ($(window).width() <= '576') { // высота открытия модали на мобиле
        $(name).css("top", "50px");
    }
    
    if ($(window).width() > '576') { // высота открытия на экране больше 576
        $(name).css("top", "150px");
    }
}

function closeModals() {
    $("#modal_form, #modal_success").css("top", "");
    body.css("overflow-y", "");
    overlay.css("visibility", "");
    overlay.css("opacity", "");
}

function errorClass(item) {
    if (item.type === "checkbox") {
        classOption(item, item.checked === false)
    }
    else {
        classOption(item, item.value === "")
    }
}

function classOption(item, state) {
    if (state) {
        item.classList.add("error");
        correctForm = false;
    }
    else {
        item.classList.remove("error");
        if (document.querySelectorAll(".modal-form .error").length === 1) {
            modal_form_error_text.classList.remove("error");
        }
    }
}

$("#open_modal").click(function() {
    showModal("#modal_form");
    modal_type = "support";
});

$("#open_modal_dop").click(function() {
    showModal("#modal_form");
    modal_type = "partner";
});

$(".overlay, .modal-close, .modal-close-dop").click(function() {
    closeModals();
});

$(".modal_input.number").mask("+7 (999) 99-99-999");

modal_form_save.addEventListener("click", (e) => {
    correctForm = true;

    modal_form_inputs.forEach(item => {
        errorClass(item);
    });

    modal_form_inputs.forEach(item => {
        item.addEventListener("blur", () => {
            errorClass(item);
        });
    });

    if (correctForm) {
        console.log("Форма заполнена корректно!");

        modal_form_inputs.forEach((item, i) => {
            if (item.type !== "checkbox") {
                modal_form_content.push(item.value);
            }
        });
        modal_form_content.push(modal_type);

        closeModals();
        setTimeout(() => {
            showModal("#modal_success");
        }, 500);

        console.log(modal_form_content);

        // чистим всю инфу

        modal_form_inputs.forEach(item => {
            if (item.type !== "checkbox") {
                item.value = "";
            }
            else {
                item.checked = false;
            }
        });
        modal_form_content = [];

    }
    else {
        modal_form_error_text.classList.add("error");
        console.log("Форма заполнена неверно...");
    }

    e.preventDefault();
});;
    }

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