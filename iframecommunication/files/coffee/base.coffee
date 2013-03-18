do ->
  
  app = window.app = {}
  app.editpage = {}
  app.previewpage = {}

  app.urlMap =
    style1: 'style1.css'
    style2: 'style2.css'
    html1: 'previewhtml1.html'
    html2: 'previewhtml2.html'

  class app.Event

    on: (ev, callback) ->
      @_callbacks = {} unless @_callbacks?
      evs = ev.split(' ')
      for name in evs
        @_callbacks[name] or= []
        @_callbacks[name].push(callback)
      @

    once: (ev, callback) ->
      @on ev, ->
        @off(ev, arguments.callee)
        callback.apply(@, arguments)

    trigger: (args...) ->
      ev = args.shift()
      list = @_callbacks?[ev]
      return unless list
      for callback in list
        if callback.apply(@, args) is false
          break
      @

    off: (ev, callback) ->
      unless ev
        @_callbacks = {}
        return @

      evs = ev.split(' ')
      for name in evs

        list = @_callbacks?[name]
        return this unless list

        unless callback
          delete @_callbacks[name]
          return this

        for cb, i in list when cb is callback
          list = list.slice()
          list.splice(i, 1)
          @_callbacks[name] = list
          break
      @

