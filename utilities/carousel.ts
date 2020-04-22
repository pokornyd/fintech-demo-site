export const runCarousel = (element: HTMLElement) => {
    const slider = $(element);
    const sliderArrow = slider.attr('data-arrow') == 'false' ? false : true; //option: true or false
    const sliderDots = slider.attr('data-dots') == 'false' ? false : true; //option: true or false
    const sliderAutoPlay = slider.attr('data-autoplay') ? false : true; //option: number in ms
    const sliderAutoPlayTime = slider.attr('data-autoplay') ? Number(sliderAutoPlay) : 4000;
    const sliderSpeed = slider.attr('data-speed') ? slider.attr('data-speed') : 800; //option: number in ms (Smart speed)
    const sliderMargin = slider.attr('data-margin') ? slider.attr('data-margin') : 30; //option: number in px
    const sliderLoop = slider.attr('data-loop') == 'false' ? false : true; //option: true or false
    const sliderStart = slider.attr('data-start') ? slider.attr('data-start') : 0; //option: number
    // @ts-ignore
    const sliderSlideBy = slider.attr('data-slideby') ? sliderSlideBy == 'page' ? 'page' : Number(slider.attr('data-slideby')) : Number(1); //option: number
    const sliderHoverPause = slider.attr('data-pause') == 'false' ? false : true; //option: true or false
    const sliderMerge = slider.attr('data-merge') == 'true' ? true : false; //option: number (use in slider items DIV)
    const sliderDrag = slider.attr('data-drag') == 'false' ? false : true; //option: true or false
    const sliderRewind = slider.attr('data-rewind') == 'true' ? true : false; //option: true or false
    const sliderCenter = slider.attr('data-center') == 'true' ? true : false; //option: true or false
    const sliderVideo = slider.attr('data-video') == 'true' ? true : false; //option: true or false
    const sliderLazy = slider.attr('data-lazyload') == 'true' ? true : false; //option: true or false
    const sliderRTL = slider.attr('data-rtl'); //option: true (false by default)
    const sliderItems = slider.attr('data-items') ? slider.attr('data-items') : 4; //option: number (items in all device)
    const sliderItemsXl = slider.attr('data-items-xl') ? slider.attr('data-items-xl') : Number(sliderItems); //option: number (items in 1200 to end )
    const sliderItemsLg = slider.attr('data-items-lg') ? slider.attr('data-items-lg') : Number(sliderItemsXl); //option: number (items in 992 to 1199 )
    const sliderItemsMd = slider.attr('data-items-md') ? slider.attr('data-items-md') : Number(sliderItemsLg); //option: number (items in 768 to 991 )
    const sliderItemsSm = slider.attr('data-items-sm') ? slider.attr('data-items-sm') : Number(sliderItemsMd); //option: number (items in 576 to 767 )
    const sliderItemsXs = slider.attr('data-items-xs') ? slider.attr('data-items-xs') : Number(sliderItemsSm); //option: number (items in start to 575 )
    slider.owlCarousel({
      margin: Number(sliderMargin),
      loop: sliderLoop,
      merge: sliderMerge,
      mouseDrag: sliderDrag,
      startPosition: Number(sliderStart),
      rewind: sliderRewind,
      slideBy: sliderSlideBy,
      center: sliderCenter,
      lazyLoad: sliderLazy,
      nav: sliderArrow,
      navText: [
        '<i class="ti-angle-left"></i>',
        '<i class="ti-angle-right"></i>',
      ],
      autoplay: sliderAutoPlay,
      autoplayTimeout: sliderAutoPlayTime,
      autoplayHoverPause: sliderHoverPause,
      dots: sliderDots,
      smartSpeed: Number(sliderSpeed),
      video: sliderVideo,
      rtl: sliderRTL,
      responsive: {
        0: { items: Number(sliderItemsXs) },
        576: { items: Number(sliderItemsSm) },
        768: { items: Number(sliderItemsMd) },
        992: { items: Number(sliderItemsLg) },
        1200: { items: Number(sliderItemsXl) },
      },
    });
  };
