$(document).ready(function(){

	// jquery scripts


	
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
				}, 2000);
			}
		});
		return false;
	});
}
