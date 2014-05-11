// スムーズスクロールを有効に
// https://github.com/Takazudo/jQuery.EaseScroller

(new $.EaseScroller({
  easing: 'easeInOutExpo',
  changehash: false
})).live();

$(function() {

  var currentMenuId; // 現在のメニューIDを保存しておく変数

  var $window = $(window);
  var $count = $('#count');

  // 各メニューを取得

  var $menuItems = $('#menu li');

  // 各sectionを取得

  var $sectionA = $('#sectionA');
  var $sectionB = $('#sectionB');
  var $sectionC = $('#sectionC');
  var $sectionD = $('#sectionD');
  var $sections = $()
    .add($sectionA)
    .add($sectionB)
    .add($sectionC)
    .add($sectionD);

  // 各ボタンの要素を取得
  
  var $switcher_direct = $('#switcher-direct');
  var $switcher_throttle = $('#switcher-throttle');
  var $switcher_debounce = $('#switcher-debounce');
  var $switchers = $()
    .add($switcher_direct)
    .add($switcher_throttle)
    .add($switcher_debounce);

  // 渡された要素が表示領域よりも上にあるかを判別

  var isElAboveTop = function($el) {
    var st = $window.scrollTop();
    var top = $el.offset().top;
    if(st >= top) {
      return true;
    }
    return false;
  };

  // 渡されたIDに相当するメニューをハイライト

  var switchMenu = function(menuId) {
    $menuItems.removeClass('current');
    $('#' + menuId).addClass('current');
    $count.html($count.html()*1+1);
  };

  // メニューIDを確認。
  // 後ろのセクションから、そのセクションが
  // 表示領域よりも上にあるかを確認する。
  // もしそうであったばあい、現在、そのセクションよりも下まで
  // スクロールしているということになる。

  var detectMenuId = function() {
    if(isElAboveTop($sectionD)) { return 'menuD'; }
    if(isElAboveTop($sectionC)) { return 'menuC'; }
    if(isElAboveTop($sectionB)) { return 'menuB'; }
    return 'menuA';
  };

  // メニューのハイライトを更新

  var update = function() {
    var menuId = detectMenuId();
    if(currentMenuId === menuId) {
      return;
    }
    switchMenu(menuId);
  };

  // 現在のイベントハンドラを保存しておく

  var currentHandler = update;

  // throttle, debounce版のupdateを作成
  
  var update_throttled = $.throttle(100, update);
  var update_debounced = $.debounce(100, update);

  // イベント設定

  $window.on('resize scroll', update);

  // イベントハンドラを渡されたfunctionに切り替える

  var swapEventHandlerTo = function(fn) {
    if(currentHandler === fn) {
      return;
    }
    $switchers.removeClass('current');
    $window
      .off('resize scroll', currentHandler)
      .on('resize scroll', fn);
    currentHandler = fn;
  };

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
