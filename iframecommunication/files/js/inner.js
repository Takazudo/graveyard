(function() {
  var $window, app, htmlUpdater, msgReceiver, styleUpdater,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $window = $(window);

  app = window.app;

  app.MsgReceiver = (function(_super) {

    __extends(MsgReceiver, _super);

    function MsgReceiver() {
      this._handleHash = __bind(this._handleHash, this);      this._eventify();
    }

    MsgReceiver.prototype._eventify = function() {
      $window.on('hashchange', this._handleHash);
      return this;
    };

    MsgReceiver.prototype._handleHash = function() {
      var data, str;
      str = location.hash.slice(1);
      data = $.deparam(str);
      this.trigger('receive', data);
      return this;
    };

    return MsgReceiver;

  })(app.Event);

  app.AbstractUpdater = (function(_super) {

    __extends(AbstractUpdater, _super);

    function AbstractUpdater() {
      AbstractUpdater.__super__.constructor.apply(this, arguments);
    }

    AbstractUpdater.prototype.fetch = function(key) {
      var _this = this;
      return $.Deferred(function(defer) {
        var src;
        src = app.urlMap[key];
        return ($.get(src)).done(function(text) {
          return defer.resolve(text);
        });
      }).promise();
    };

    return AbstractUpdater;

  })(app.Event);

  app.StyleUpdater = (function(_super) {

    __extends(StyleUpdater, _super);

    function StyleUpdater() {
      this.$previewSyle = $('#previewstyle');
    }

    StyleUpdater.prototype.update = function(styleKey, cssVals) {
      var _this = this;
      if (cssVals == null) {
        cssVals = {};
      }
      console.log(cssVals);
      return (this.fetch(styleKey)).done(function(text) {
        var html, template;
        template = Handlebars.compile(text);
        html = template(cssVals);
        return _this.$previewSyle.html(html);
      });
    };

    return StyleUpdater;

  })(app.AbstractUpdater);

  app.HtmlUpdater = (function(_super) {

    __extends(HtmlUpdater, _super);

    function HtmlUpdater() {
      this.$holder = $('#htmlholder');
    }

    HtmlUpdater.prototype.update = function(htmlKey) {
      var _this = this;
      return (this.fetch(htmlKey)).done(function(text) {
        return _this.$holder.html(text);
      });
    };

    return HtmlUpdater;

  })(app.AbstractUpdater);

  msgReceiver = new app.MsgReceiver;

  styleUpdater = new app.StyleUpdater;

  htmlUpdater = new app.HtmlUpdater;

  msgReceiver.on('receive', function(data) {
    console.log(data);
    styleUpdater.update(data.style, data.cssvals);
    return htmlUpdater.update(data.html);
  });

}).call(this);
