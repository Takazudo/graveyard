// ====== 通常版 ======
$(function() {

  var $form = $('#form_normal');
  var $textarea = $('textarea', $form);
  var $count = $('.currentCharCount', $form);

  // 文字数をカウント

  var countChars = function() {
    var count = $textarea.val().length;
    $count.text(count);
    // 50文字を超えたらエラー
    if(count > 50) {
      $textarea.addClass('error');
    } else {
      $textarea.removeClass('error');
    }
  };

  // イベントハンドラ

  var onKeyup = function() {
    countChars();
  };

  // イベントを設定

  $textarea.on('keyup', onKeyup);

});

// ====== throttle版 ======
$(function() {

  var $form = $('#form_throttle');
  var $textarea = $('textarea', $form);
  var $count = $('.currentCharCount', $form);

  // 文字数をカウント

  var countChars = function() {
    var count = $textarea.val().length;
    $count.text(count);
    if(count > 50) {
      $textarea.addClass('error');
    } else {
      $textarea.removeClass('error');
    }
  };

  // イベントハンドラ

  var onKeyup = $.throttle(250, countChars);

  // イベントを設定

  $textarea.on('keyup', onKeyup);

});

// ====== debounce版 ======
$(function() {

  var $form = $('#form_debounce');
  var $textarea = $('textarea', $form);
  var $count = $('.currentCharCount', $form);

  // 文字数をカウント

  var countChars = function() {
    var count = $textarea.val().length;
    $count.text(count);
    if(count > 50) {
      $textarea.addClass('error');
    } else {
      $textarea.removeClass('error');
    }
  };

  // イベントハンドラ

  var onKeyup = $.debounce(250, countChars);

  // イベントを設定

  $textarea.on('keyup', onKeyup);

});
