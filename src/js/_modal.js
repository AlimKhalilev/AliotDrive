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
});