(function($, window, document, undefined){

/* define NS */
var app = window.app = {};

// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
	log.history = log.history || []; // store logs to an array for reference
	log.history.push(arguments);
	if(this.console) {
		arguments.callee = arguments.callee.caller;
		console.log( Array.prototype.slice.call(arguments) );
	}
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});

// deferreded alt of setTimeout
window.dwait = function(millisec){
	return $.Deferred(function(defer){
		setTimeout(function(){
			defer.resolve();
		}, millisec);
	}).promise();
};

/**
 * app.UrlDispatcher
 */
app.UrlDispatcher = function(presets){
	var self = this;
	self._presets = presets;
	if(Modernizr.history){
		self._davis = Davis(function(){
			var davis = this;
			$.each(presets, function(i, p){
				davis[p.davis_method](p.davis_path || p.path, p.handler);
			});
		});
		self._davis.configure(function(config){
			config.linkSelector = 'a.js-davis',
			config.formSelector = 'form.js-davis'
		});
	}
};
app.UrlDispatcher.prototype = {
	fire: function(){
		if(Modernizr.history){
			this._davis.start();
			return;
		}
		$.each(this._presets, function(i, p){
			var handleThis = false;
			if(p.nodavis_path){
				handleThis = p.nodavis_path.test(location.pathname);
			}else{
				handleThis = p.path === location.pathname;
			}
			if(!handleThis){
				return;
			}else{
				p.handler();
				return false;
			}
		});
	},
	invoke: function(path, method){
		if(this._davis){
			Davis.location.assign(new Davis.Request({
				method: method || 'get',
				fullPath: path,
				title: ''
			}));
		}else{
			location.href = path;
		}
	}
};

/**
 * ui.slideexpand
 */
$.widget('ui.slideexpand', {
	options: {
		expandedHeight: 500
	},
	_expanded: false,
	_create: function(){
		this.widgetEventPrefix = 'slideexpand.';
		var $el = this._$el = this.element;
		this._$inner = $('.item-inner', $el);
		this._origHeight = this._$inner.height();
		return this;
	},
	expand: function(){
		if(this._expanded){
			return this;
		}
		this._expanded = true;
		var self = this;
		var h = self.options.expandedHeight;
		self._$el.height(h);
		dwait(250)
			.done(function(){
				self._$inner.animate({ height: h });
			});
		return this;
	},
	shrink: function(){
		if(!this._expanded){
			return this;
		}
		this._expanded = false;
		var self = this;
		var h = self._origHeight;
		self._$el.height(h);
		dwait(100).done(function(){
			self._$inner.animate({ height: h });
		});
		return this;
	}
});

/**
 * utils
 */
$.fn.getItemExClass = function(){
	var classArray = this.attr('class').split(' ');
	var res = $.grep(classArray, function(current, i){
		return /^item-/.test(current);
	});
	if(res.length === 0){
		return false;
	}
	return res[0].replace(/^item-/,'');
};
$.fn.itemHasExClass = function(exClass){
	return (this.getItemExClass(exClass) !== exClass) ? true : false;
};

/* do everythign onload */
$(function(){

	var $container = $('#container');
	$container.isotope({
        itemSelector: '.item',
		masonry: {
			columnWidth: 180
		},
		getSortData: {
			number: function($elem){
				return parseInt( $elem.find('.item-num').text(), 10 );
			},
			itemExClass: function($elem){
				return $elem.getItemExClass();
			},
			hoge: function($elem){
				return $elem.itemHasExClass('hoge') ? 1 : -1;
			},
			foo: function($elem){
				return $elem.itemHasExClass('foo') ? 1 : -1;
			},
			bar: function($elem){
				return $elem.itemHasExClass('bar') ? 1 : -1;
			}
		}
	});

	var $hogeExpandable = $('.item-hogeExpandable').slideexpand();

	var dispatcher = new app.UrlDispatcher([
		{
			path: '/',
			davis_method: 'get',
			handler: function(){
				$hogeExpandable.slideexpand('shrink');
				$container.isotope('reLayout');
				$container.isotope({ filter: '*' });
			}
		},
		{
			path: '/hoge',
			davis_method: 'get',
			handler: function(){
				$hogeExpandable.slideexpand('expand');
				$container.isotope('reLayout');
				$container.isotope({ filter: '.item-hoge' });
			}
		},
		{
			path: '/foo',
			davis_method: 'get',
			handler: function(){
				$hogeExpandable.slideexpand('shrink');
				$container.isotope('reLayout');
				$container.isotope({ filter: '.item-foo' });
			}
		},
		{
			path: '/bar',
			davis_method: 'get',
			handler: function(){
				$hogeExpandable.slideexpand('shrink');
				$container.isotope('reLayout');
				$container.isotope({ filter: '.item-bar' });
			}
		}
	]);

	dispatcher.fire();

});
/* end of do everythign onload */

// disable JS cache
$(window).bind('unload', $.noop);

})(jQuery, this, this.document);
