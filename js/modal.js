$(function(){
  // 初期化
  var _global      = $(window);
  var _body        = $('body');
  var timer        = false;
  var scrollTop;         // スクロール位置 記録用
  var DELAY_RESIZE = 200; // ウィンドウリサイズに、光を表示する時差
  var FADEIN_TIME  = 200; // フェードイン時間
  var FADEOUT_TIME = 200; // フェードアウト時間
  var ADJUST_HIGHT = 20;  // モーダル縦幅調整

  // セレクタ
  var modalOverlay = ".modal-overlay";
  var modalInner   = ".modal-inner";
  var modalClose   = ".modal-close";
  var globalNav    = ".global-nav-wrapper";
  var thumItem     = ".section-txt__sample-thum-item";

  // モーダルオープン時、ウィンドウをリサイズしたらサイズを調整
  window.addEventListener("resize", resizeModal, false);

  // モーダルリサイズ
  function resizeModal(){
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      var _height = _global.height();
      $(modalOverlay).css('height', _height);
      $(modalInner).css('height', _height - ADJUST_HIGHT + "px");
    }, DELAY_RESIZE);
  }

  // サムネイル画像押下時、bodyのスクロール禁止
  $(document).on('click', thumItem, function() {
    $(_body).addClass('enabled_modal');
    $(globalNav).hide();
    scrollTop = _global.scrollTop();
    $(_body).css({
      'position': 'fixed',
      'width': '100%',
      'overflow': 'hidden'
    });
  });

  // 「xボタン」または、「閉じるボタン」押下時、bodyのスクロール禁止解除
  $(document).on('click', modalClose, function() {
    $(globalNav).fadeIn(FADEIN_TIME);
    $(_body).css({
      'position': 'relative',
      'width': '',
      'top': '',
      'overflow': ''
    });
    $(_body).removeClass('enabled_modal');
    _global.scrollTop(scrollTop);
  });

  // サムネイル画像押下時、モーダルを表示
  $(document).on('click', '[data-openmodal]', function(e) {
    var _height = _global.height();
    $(modalOverlay).fadeOut(FADEOUT_TIME);
    var targetOpenModalId = $(this).attr('data-openmodal');
    var $targetOpenOverlay = $('#' + targetOpenModalId);
    var $targetOpenInner = $('#' + targetOpenModalId + ' ' + modalInner);
    $targetOpenOverlay.addClass('active-modal');
    $targetOpenOverlay.css({ 'height': _height + 'px' });
    $targetOpenInner.css({ 'height': (_height - ADJUST_HIGHT) + 'px' });
    $targetOpenOverlay.fadeIn(FADEIN_TIME);
    $targetOpenInner.scrollTop(-1);
  });

  //「xボタン」または、「閉じるボタン」押下時、モーダルを非表示
  $(document).on('click', '[data-closemodal]', function(e) {
    var targetCloseModalId = $(this).attr('data-closemodal');
    var $targetCloseOverlay = $('#' + targetCloseModalId);
    var $targetCloseInner = $('#' + targetCloseModalId + ' ' + modalInner);
    $targetCloseOverlay.removeClass('active-modal');
    $targetCloseInner.scrollTop(-1);
    $targetCloseOverlay.fadeOut(FADEOUT_TIME);
  });
});
