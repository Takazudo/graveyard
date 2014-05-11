(function() {
  var $document, msgSender, pframeresizer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $document = $(document);

  app.attachPframe = function() {
    var src;
    src = '<iframe src="2.html" id="previewframe"></iframe>';
    return $('#previewframewrap').html(src);
  };

  app.attachPframe();

  app.pframe = window.previewframe;

  app.$pframe = $('#previewframe');

  app.pframeOriginalSrc = app.$pframe.attr('src');

  app.pframeReady = $.Deferred(function(defer) {
    return app.pframe.onload = function() {
      return defer.resolve();
    };
  }).promise();

  app.PframeResizer = (function(_super) {

    __extends(PframeResizer, _super);

    function PframeResizer() {
      this.width = 80;
    }

    PframeResizer.prototype.narrower = function() {
      var width;
      width = this.width - 20;
      if (width <= 0) {
        return;
      }
      app.$pframe.css({
        width: "" + width + "%"
      });
      this.width = width;
      return this;
    };

    PframeResizer.prototype.wider = function() {
      var width;
      width = this.width + 20;
      if (width >= 100) {
        return this;
      }
      app.$pframe.css({
        width: "" + width + "%"
      });
      this.width = width;
      return this;
    };

    return PframeResizer;

  })(app.Event);

  app.MsgSender = (function(_super) {

    __extends(MsgSender, _super);

    function MsgSender() {
      MsgSender.__super__.constructor.apply(this, arguments);
    }

    MsgSender.prototype.send = function(data) {
      var decodedParams, src;
      decodedParams = $.param(data);
      src = "" + app.pframeOriginalSrc + "#" + decodedParams;
      app.$pframe.attr('src', src);
      this._lastData = data;
      return this;
    };

    MsgSender.prototype.partialSend = function(data) {
      data = $.extend({}, this._lastData, data);
      this.send(data);
      return this;
    };

    return MsgSender;

  })(app.Event);

  msgSender = new app.MsgSender;

  pframeresizer = new app.PframeResizer;

  app.pframeReady.done(function() {
    var $foowidth, send;
    $foowidth = $('#foowidth');
    $foowidth.on('change', function() {
      return msgSender.partialSend({
        cssvals: {
          foowidth: $foowidth.val()
        }
      });
    });
    send = function(data) {
      $('.borderwidth').show();
      if (data.cssvals == null) {
        data.cssvals = {};
      }
      if (data.cssvals.foowidth == null) {
        data.cssvals.foowidth = $foowidth.val();
      }
      return msgSender.send(data);
    };
    $document.on('click', '#button1', function() {
      return send({
        style: 'style1',
        html: 'html1'
      });
    });
    $document.on('click', '#button2', function() {
      return send({
        style: 'style2',
        html: 'html2'
      });
    });
    $document.on('click', '#morenarrow', function() {
      return pframeresizer.narrower();
    });
    return $document.on('click', '#morewide', function() {
      return pframeresizer.wider();
    });
  });

}).call(this);
