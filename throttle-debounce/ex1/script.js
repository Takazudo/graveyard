$(function() {

  var $window = $(window);
  var $count = $('#count');
  var $box = $('#box');

  // ボックスのサイズを更新

  var update = function() {
    var w = $window.width() - 20;
    var h = $window.height() - 20;
    $box.width(w);
    $box.height(h);
    $count.html($count.html()*1+1); // 1増やす
  };

  // イベント設定

  $window.on('resize', update);

  // 初回実行

  update();

});
