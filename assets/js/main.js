$(document).ready(function(){

	// jquery scripts


	
	// ------------ модальные окна ------------ 

	// форма
	$('.popup-form').magnificPopup({
		type:'inline',
		removalDelay: 500,
		mainClass: 'mfp-zoom-in',
		midClick: true
	});

	// увеличенное изображение
	$('.popup-img').magnificPopup({
		type: 'image',
		mainClass: 'mfp-zoom-in',
		removalDelay: 500,
		closeOnContentClick: true,
		zoom: {
			enabled: true,
		},
		midClick: true
	});

	// галерея
	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		gallery: {
			enabled: true,
    },
    midClick: true
	});


	// ------------ слайдеры ------------

	$('.slider').slick({
		arrows: true, //
		dots: true,
		slidesToShow: 1,
		infinite: true,
		//centerMode: true,
		//variableWidth: false,
		//autoplay: true,
		//autoplaySpeed: 2000,
		//fade: true
	});


	// ------------ кнопка наверх ------------ 

	// появление кнопки
	$(window).scroll(function()
	{
		if ($(this).scrollTop() > 10)
		{
			if ($('.btn-top').is(':hidden'))
			{
				$('.btn-top').css({opacity : 1}).fadeIn('slow');
			}
		}
		else
		{
			$('.btn-top').stop(true, false).fadeOut('fast');
		}
	});
	// скролл наверх
	$('.btn-top').on('click', function(e){
		e.preventDefault();
		 $('html:not(:animated),body:not(:animated)').animate({ scrollTop: 0}, 550);
	});


});




// Отправка формы обратной связи

function sendForm(FormID)
{
	$(FormID).unbind();
	var loading_wrap = $('.loading');
	$(FormID).submit(function()
	{
		var data = $(this).serialize();
		$.ajax({
			url: 'mail.php',
			method: 'POST',
			beforeSend: function(){
				$(loading_wrap).addClass('active');
			},
			data: data,
			success: function(response){
				$(loading_wrap).removeClass('active');
				$('.form-success').html(response);
				setTimeout(function(){
					$(FormID).trigger('reset');
					$.magnificPopup.close();
				}, 3000);
			}
		});
		return false;
	});
}
