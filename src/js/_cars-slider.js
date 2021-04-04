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
}); 