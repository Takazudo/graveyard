$(function() {

  // 要素群を準備

  var $window = $(window);
  var $count = $('#count');
  var $box = $('#box');
  var $switcher_direct = $('#switcher-direct');
  var $switcher_throttle = $('#switcher-throttle');
  var $switcher_debounce = $('#switcher-debounce');
  var $switchers = $()
    .add($switcher_direct)
    .add($switcher_throttle)
    .add($switcher_debounce);

  // ボックスの大きさを調整する関数

  var update = function() {
    var w = $window.width() - 20;
    var h = $window.height() - 20;
    $box.width(w);
    $box.height(h);
    $count.html($count.html()*1+1);
  };

  // throttle, debounceバージョンを作成
  
  var update_throttled = $.throttle(500, update);
  var update_debounced = $.debounce(500, update);

  // 現在使用しているイベントハンドラを格納しておく変数

  var currentFn = update;

  // イベントハンドラの切り替え

  var swapEventHandlerTo = function(fn) {
    if(currentFn === fn) { return; }
    $window
      .off('resize', currentFn)
      .on('resize', fn);
    currentFn = fn;
  };

  // とりあえず初めは全てのresizeでupdateを呼ぶ
  
  $window.on('resize', update);

  // 渡されたボタンをハイライト

  var enableSwitcher = function($switcher) {
    $switchers.removeClass('current');
    $switcher.addClass('current');
  };

  // ボタンのクリックに切り替えを割り当て

  $switcher_direct.on('click', function() {
    swapEventHandlerTo(update);
    enableSwitcher($switcher_direct);
  });
  $switcher_throttle.on('click', function() {
    swapEventHandlerTo(update_throttled);
    enableSwitcher($switcher_throttle);
  });
  $switcher_debounce.on('click', function() {
    swapEventHandlerTo(update_debounced);
    enableSwitcher($switcher_debounce);
  });

  // 初回実行

  update();

});
