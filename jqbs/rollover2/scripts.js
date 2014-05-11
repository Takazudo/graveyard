$(function(){
	$('.rollover').each(function(){
		var a = $(this);
		var img = a.find('img');
		var src_off = img.attr('src');
		var src_on = src_off.replace(/^(.+)_off(\.[^\.]+)$/,'$1_on$2');
		$('<img />').attr('src', src_on);
		a.bind('mouseenter focus', function(){
			img.attr('src', src_on);
		});
		a.bind('mouseleave blur', function(){
			img.attr('src', src_off);
		});
	});
});
