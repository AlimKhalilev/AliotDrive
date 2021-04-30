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
        name: "Chevrolet Aveo",
        description: "Надёжный и комфортабельный седан с вместительным багажным отделением. Прекрасно подходит для перемещений по городу и за его пределами.",
        drive_cost: "От 8 ₽/мин",
        wait_cost: "От 2.5 ₽/мин"
    },
    {
        name: "Haval F7",
        description: "Интеллектуальный кроссовер, динамичный и лёгкий в управлении. Доступна настройка режимов вождения, эргономичный и комфортный салон. Повышенный клиренс, вместительный багажник.",
        drive_cost: "От 18 ₽/мин",
        wait_cost: "От 2.5 ₽/мин"
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
    let overlay = $(".overlay");

let modal_type = null;
let modal_form_content = [];
let modal_form_error_text = document.querySelector(".modal-form-error");
let modal_form_save = document.querySelector("#send_button");
let modal_form_inputs = document.querySelectorAll(".modal_input");
let correctForm = false;

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

$("#open_modal_dop, #open_modal_footer").click(function() {
    showModal("#modal_form");
    modal_type = "partner";
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

        console.log(modal_form_content);
        $.post("./ajax.php", // POST ЗАПРОС
        {
            act: "send",
            name: modal_form_content[0],
            number: modal_form_content[1],
            comment: modal_form_content[2],
            type: modal_form_content[3]
        },
        function (result) {
            if (result) {
                closeModals();
                setTimeout(() => {
                    showModal("#modal_success");
                }, 500);
        
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
                console.log("Ошибка соединения с сервером!");
            }
        });

    }
    else {
        modal_form_error_text.classList.add("error");
        console.log("Форма заполнена неверно...");
    }

    e.preventDefault();
});;

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