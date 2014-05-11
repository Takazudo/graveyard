// ====== 通常版 ======
$(function() {
  
  var $form = $('#form_normal');
  var $result = $('.result', $form);

  // メッセージを出す処理

  var notify = function() {
    $result.empty();
    var $msg = $('<div>submit!!</div>');
    $msg.css({ opacity: 0 });
    $result.append($msg);
    $msg.animate({ opacity: 1 }, 300);
  };

  // サブミットハンドラ

  var onSubmit = function(e) {
    e.preventDefault();
    notify();
  };

  // イベント設定

  $form.on('submit', onSubmit);

});

// ====== debounce版 ======
$(function() {
  
  var $form = $('#form_debounce');
  var $result = $('.result', $form);

  // メッセージを出す処理

  var notify = function() {
    $result.empty();
    var $msg = $('<div>submit!!</div>');
    $msg.css({ opacity: 0 });
    $result.append($msg);
    $msg.animate({ opacity: 1 }, 300);
  };

  // debounce版を作成

  var debounced_notify = $.debounce(500, notify);

  // サブミットハンドラ

  var onSubmit = function(e) {
    e.preventDefault();
    debounced_notify(); // debounce版notifyを実行
  };

  // イベント設定
  
  $form.on('submit', onSubmit);

});
