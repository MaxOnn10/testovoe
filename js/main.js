
//Табы
$('ul.tab-list').on('click', 'li:not(.active)', function () {
    $(this).addClass('active').siblings().removeClass('active').closest('.wrapper').find('.tab-content__item').removeClass('active').eq($(this).index()).addClass('active');
});
//+slick
$('.slider1').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    prevArrow: '<img class="slider__arrows slider__arrows-left" src="./images/arrow-prev.svg" alt="arrows-prev">',
    nextArrow: '<img class="slider__arrows slider__arrows-right" src="./images/arrow-next.svg" alt="arrows-next">',
    responsive: [
        {
            breakpoint: 768,
            settings: {
                dots: false,
                arrows: true
            }
        },
        {
            breakpoint: 991,
            settings: {
                arrows: false
            }
        }
    ]
});

$('.slider2').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    prevArrow: '<img class="slider__arrows slider__arrows-left" src="./images/arrow-prev.svg" alt="arrows-prev">',
    nextArrow: '<img class="slider__arrows slider__arrows-right" src="./images/arrow-next.svg" alt="arrows-next">',
    responsive: [
        {
            breakpoint: 768,
            settings: {
                dots: false
            }
        }
    ]
});

//Slider-header
$(function () {
    $('.header__slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1000,
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: false
                }
            }
        ]
    });
});

//Timer
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + "мин " + seconds + "сек";

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}
window.onload = function () {
    var fifteenMinutes = 60 * 15.5,
        display = document.querySelector('#time');
    startTimer(fifteenMinutes, display);  
};

//Изменения при нажатии
$('.table__item').on("click",function(){
    $(".table__item.active").removeClass('active');
    $(this).addClass("active");
});
$('.stages__btn').on("click",function(){
    $(".stages__btn.active").removeClass('active');
    $(this).addClass("active");
});

