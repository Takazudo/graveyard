/* utils */

function filterContent(pagestr){
	var started = false;
	var res = [];
	$.each(pagestr.split('\n'), function(i, line){
		if(line === '<!-- CONTENTSTART -->'){
			started = true;
			return;
		}
		if(line === '<!-- CONTENTEND -->'){
			return false;
		}
		if(started){
			res.push(line);
		}
	});
	return res.join('\n');
}
function fetchPage(url){
	return $.Deferred(function(defer){
		$.get(url).then(function(res){
			defer.resolve( filterContent(res) );
		}, function(){
			defer.reject('something wrong');
		});
	}).promise();
}
$.fn.updateContent = function(content){
	return this.each(function(){
		var $el = $(this);
		$el.empty().hide().append(content).fadeIn(800);
	});
};


$(function(){

	var $content = $('#content');

	/* setup Davis */

	var davis = Davis(function(){
		this.get('/', function(){
			fetchPage('/').then(function(html){
				$content.updateContent(html);
			});
		})
		this.get('/hoge.html', function(){
			fetchPage('/hoge.html').then(function(html){
				$content.updateContent(html);
			});
		})
		this.get('/foo.html', function(){
			fetchPage('/foo.html').then(function(html){
				$content.updateContent(html);
			});
		})
		this.get('/bar.html', function(){
			fetchPage('/bar.html').then(function(html){
				$content.updateContent(html);
			});
		})
	});

	davis.start();

});
