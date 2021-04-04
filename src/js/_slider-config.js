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
});