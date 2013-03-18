$window = $(window)

app = window.app

class app.MsgReceiver extends app.Event
  
  constructor: ->
    @_eventify()

  _eventify: ->
    $window.on 'hashchange', @_handleHash
    return this

  _handleHash: =>
    str = location.hash.slice(1) # trim '#'
    data = $.deparam str
    @trigger 'receive', data
    return this

class app.AbstractUpdater extends app.Event
  
  fetch: (key) ->
    $.Deferred (defer) =>
      src = app.urlMap[key]
      ($.get src).done (text) ->
        defer.resolve text
    .promise()

class app.StyleUpdater extends app.AbstractUpdater
  
  constructor: ->
    @$previewSyle = $('#previewstyle')

  update: (styleKey, cssVals = {}) ->
    console.log cssVals
    (@fetch styleKey).done (text) =>
      template = Handlebars.compile text
      html = template cssVals
      @$previewSyle.html html

class app.HtmlUpdater extends app.AbstractUpdater

  constructor: ->
    @$holder = $('#htmlholder')

  update: (htmlKey) ->
    (@fetch htmlKey).done (text) =>
      @$holder.html text

msgReceiver = new app.MsgReceiver
styleUpdater = new app.StyleUpdater
htmlUpdater = new app.HtmlUpdater

msgReceiver.on 'receive', (data) ->
  console.log data
  styleUpdater.update data.style, data.cssvals
  htmlUpdater.update data.html

