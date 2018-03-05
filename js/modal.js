$(function(){
  // 初期化
  var _global      = $(window);
  var _body        = $('body');
  var timer        = false;
  var scrollTop;          // スクロール位置 記録用
  var DELAY_RESIZE = 200; // ウィンドウリサイズに、光を表示する時差
  var FADEIN_TIME  = 200; // フェードイン時間
  var FADEOUT_TIME = 200; // フェードアウト時間
  var ADJUST_HIGHT = 20;  // モーダル縦幅調整

  // セレクタ
  var modalOverlay = ".modal-overlay";
  var modalInner   = ".modal-inner";
  var modalClose   = ".modal-close";
  var globalNav    = ".global-nav-wrapper";

  // モーダルオープン時、ウィンドウをリサイズしたらサイズを調整
  $(window).on('resize', function(){
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      var _height = _global.height();
      $(modalOverlay).css('height', _height);
      $(modalInner).css(  'height', _height - ADJUST_HIGHT + "px");
    }, DELAY_RESIZE);
  });

  // サムネイル画像押下時、モーダルを表示。または アローを押下時、モーダル内容を変更
  $(document).on('click', '[data-openmodal]', function(e) {
    // モーダルをarrowで開いたか、サムネイル画像で開いたかで出し分け
    if ($(this).data('openmodal-type') === "arrow") {
      // すでに表示しているモーダルを隠す
      $(modalOverlay).fadeOut(FADEOUT_TIME);
    } else {
      // グローバルナビを隠す
      $(globalNav).hide();
      //スクロール位置を記録
      scrollTop = _global.scrollTop();
      // bodyのスクロール禁止
      $(_body).css({
        'position': 'fixed',
        'width'   : '100%',
        'overflow': 'hidden'
      });
    }
    // モーダル表示
    var _height = _global.height();
    var targetOpenModalId  = $(this).data('openmodal');
    var $targetOpenOverlay = $('#' + targetOpenModalId);
    var $targetOpenInner   = $('#' + targetOpenModalId + ' ' + modalInner);
    $targetOpenOverlay.addClass('active-modal');
    $targetOpenOverlay.css({'height': _height + 'px'});
    $targetOpenInner.css({  'height': (_height - ADJUST_HIGHT) + 'px'});
    $targetOpenOverlay.fadeIn(FADEIN_TIME);
  });

  //「xボタン」または、「閉じるボタン」押下時、モーダルを非表示
  $(document).on('click', '[data-closemodal]', function(e) {
    // グローバルナビを表示
    $(globalNav).fadeIn(FADEIN_TIME);
    // bodyのスクロール禁止解除
    $(_body).css({
      'position': 'relative',
      'width'   : '',
      'overflow': ''
    });
    // スクロール位置を元に戻す
    _global.scrollTop(scrollTop);
    // モーダルを隠す
    var targetCloseModalId  = $(this).data('closemodal');
    var $targetCloseOverlay = $('#' + targetCloseModalId);
    var $targetCloseInner   = $('#' + targetCloseModalId + ' ' + modalInner);
    $targetCloseOverlay.removeClass('active-modal');
    $targetCloseOverlay.fadeOut(FADEOUT_TIME);
  });
});
