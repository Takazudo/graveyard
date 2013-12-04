(function() {

  var selector_button = '.togglablePanel__button';
  var selector_body = '.togglablePanel__body';
  var cls_button_open = 'togglablePanel__button_state_open';
  var cls_body_open = 'togglablePanel__body_state_open';

  var TogglablePanel = function(el) {
    this.opened = false;
    this.$el = $(el);
    this.$button = $(selector_button, el);
    this.$body = $(selector_body, el);
    this._eventify();
  };

  TogglablePanel.prototype = {
    open: function() {
      if(this.opened) {
        return;
      }
      this.opened = true;
      this.$button.addClass(cls_button_open);
      this.$body.addClass(cls_body_open);
      this.$el.trigger('panel.open');
    },
    close: function() {
      if(!this.opened) {
        return;
      }
      this.opened = false;
      this.$button.removeClass(cls_button_open);
      this.$body.removeClass(cls_body_open);
      this.$el.trigger('panel.close');
    },
    toggle: function() {
      if(this.opened) {
        this.close();
      } else {
        this.open();
      }
    },
    _eventify: function() {
      var self =  this;
      self.$el.on('click', selector_button, function() {
        self.toggle();
      });
    }
  };

  window.TogglablePanel = TogglablePanel; // attach to global

}());
