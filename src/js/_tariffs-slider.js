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
});  