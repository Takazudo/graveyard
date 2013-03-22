// 対応するイベント名取得

var getRelatedEventNameSet = function(startEvent) {
  if(startEvent === 'touchstart') {
    return {
      move: 'touchmove',
      end: 'touchend'
    };
  }
  if(startEvent === 'mousedown') {
    return {
      move: 'mousemove',
      end: 'mouseup'
    };
  }
  if(startEvent === 'MSPointerDown') {
    return {
      move: 'MSPointerMove',
      end: 'MSPointerUp'
    };
  }
};

// タッチの座標取得

var normalizeX = function(event) {
  var orig = event.originalEvent;
  if (orig.changedTouches) {
    var touch = orig.changedTouches[0];
    return touch.pageX;
  }
  return event.pageX || orig.pageX;
};

// イベント設定とか

var $document = $(document);
var $hitarea = $('#hitarea');
var $result = $('#result');

var startX,
    currentEventNameSet,
    swipeFired = false,
    handleStart,
    handleMove,
    handleEnd;

handleStart = function(event) {
  event.preventDefault(); // 以降のイベントを止める touch→clickと発火
  currentEventNameSet = getRelatedEventNameSet(event.type);
  startX = normalizeX(event);
  $document.on(currentEventNameSet.move, handleMove);
  $document.on(currentEventNameSet.end, handleEnd);
  $result.text('touch started');
};

handleMove = function(event) {
  if(swipeFired) {
    return;
  }
  var currentX = normalizeX(event);
  var diff = currentX - startX;
  var rightSwiped = diff > 30;
  var leftSwiped = diff < -30;
  if(rightSwiped || leftSwiped) {
    swipeFired = true;
    $hitarea.css('background', 'red');
    if(rightSwiped) {
      $result.text('swiped to right');
    }
    if(leftSwiped) {
      $result.text('swiped to left');
    }
  }
};

handleEnd = function(event) {
  $document.off(currentEventNameSet.move, handleMove);
  $document.off(currentEventNameSet.end, handleEnd);
  currentEventNameSet = null;
  startX = null;
  swipeFired = false;
  $hitarea.css('background', 'blue');
  $result.text('result here');
};

$hitarea.on('touchstart mousedown MSPointerDown', handleStart);

