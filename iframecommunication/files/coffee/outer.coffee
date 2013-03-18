$document = $(document)

app.attachPframe = ->
  src = '<iframe src="2.html" id="previewframe"></iframe>'
  $('#previewframewrap').html src

app.attachPframe()
app.pframe = window.previewframe
app.$pframe = $('#previewframe')
app.pframeOriginalSrc = app.$pframe.attr 'src'

app.pframeReady = $.Deferred (defer) ->
  app.pframe.onload = ->
    defer.resolve()
.promise()

class app.PframeResizer extends app.Event
  
  constructor: ->
    @width = 80

  narrower: ->
    width = @width - 20
    if width <= 0
      return
    app.$pframe.css
      width: "#{width}%"
    @width = width
    return this

  wider: ->
    width = @width + 20
    if width >= 100
      return this
    app.$pframe.css
      width: "#{width}%"
    @width = width
    return this

class app.MsgSender extends app.Event

  send: (data) ->
    decodedParams = $.param data
    src = "#{app.pframeOriginalSrc}##{decodedParams}"
    app.$pframe.attr 'src', src
    @_lastData = data
    return this

  partialSend: (data) ->
    data = $.extend {}, @_lastData, data
    @send data
    return this

msgSender = new app.MsgSender
pframeresizer = new app.PframeResizer

app.pframeReady.done ->

  $foowidth = $('#foowidth')
  $foowidth.on 'change', ->
    msgSender.partialSend
      cssvals:
        foowidth: $foowidth.val()

  send = (data) ->
    $('.borderwidth').show()
    unless data.cssvals?
      data.cssvals = {}
    unless data.cssvals.foowidth?
      data.cssvals.foowidth = $foowidth.val()
    msgSender.send data

  $document.on 'click', '#button1', ->
    send
      style: 'style1'
      html: 'html1'
    
  $document.on 'click', '#button2', ->
    send
      style: 'style2'
      html: 'html2'

  $document.on 'click', '#morenarrow', ->
    pframeresizer.narrower()

  $document.on 'click', '#morewide', ->
    pframeresizer.wider()

