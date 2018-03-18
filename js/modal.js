$(function(){
  // 初期化
  var currentScrollTop,   // スクロール位置 記録用
      timer        = false,
      DELAY_RESIZE = 200, // ウィンドウリサイズ時に、光を表示する時差
      FADEIN_TIME  = 200, // フェードイン時間
      FADEOUT_TIME = 200, // フェードアウト時間
      ADJUST_HIGHT = 20;  // モーダル縦幅調整

  // セレクタ
  var modalOverlay = ".modal-overlay",
      modalInner   = ".modal-inner",
      modalClose   = ".modal-close",
      globalNav    = ".global-nav-wrapper",
      modalArrow   = ".modal-arrow";

  // DOM
  var $_global      = $(window),
      $_body        = $('body'),
      $modalOverlay = $(modalOverlay),
      $modalInner   = $(modalInner),
      $modalClose   = $(modalClose),
      $globalNav    = $(globalNav),
      $modalArrow   = $(modalArrow);

  // ウィンドウリサイズ時、モーダルもリサイズ
  $_global.on('resize', function(){
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      var _height = $_global.height();
      $modalOverlay.css('height', _height);
      $modalInner.css(  'height', _height - ADJUST_HIGHT + "px");
    }, DELAY_RESIZE);
  });

  // arrowにカーソルが重なったら、arrowの色を変更
  $(modalArrow).hover(function(){
    $(this).addClass('hover');
  },function(){
    $(this).removeClass('hover');
  });

  // サムネイル画像押下時、モーダルを表示。または アローを押下時、モーダル内容を変更
  $(document).on('click', '[data-openmodal]', function(e) {
    if ($(this).data('openmodal-type') === "arrow") {
      // モーダルをarrowで開いた場合
      // 動画再生を止める
      var $video = $('video');
      for(var i = 0; i < video.length; i++){
        $video[i].pause();
      }
      // すでに表示しているモーダルを隠す
      $modalOverlay.fadeOut(FADEOUT_TIME);
    } else {
      // モーダルをサムネイル画像で開いた場合
      // グローバルナビを隠す
      $globalNav.hide();
      //スクロール位置を記録
      currentScrollTop = $_global.scrollTop();
      // bodyのスクロール禁止
      $($_body).css({
        'position': 'fixed',
        'width'   : '100%',
        'overflow': 'hidden'
      });
    }
    // モーダル表示
    var _height = $_global.height();
    var targetOpenModalId  = $(this).data('openmodal');
    var $targetOpenOverlay = $('#' + targetOpenModalId);
    var $targetOpenInner   = $('#' + targetOpenModalId + ' ' + modalInner);
    $targetOpenOverlay.addClass('active-modal');
    $targetOpenOverlay.css({'height': _height + 'px'});
    $targetOpenInner.css({  'height': (_height - ADJUST_HIGHT) + 'px'});
    $targetOpenOverlay.fadeIn(FADEIN_TIME);
    // モーダルウィンドウのスクロール位置をリセット
    $targetOpenInner.scrollTop(0);
  });

  //「xボタン」または、「閉じるボタン」押下時、モーダルを隠す
  $(document).on('click', '[data-closemodal]', function(e) {
    // グローバルナビを表示
    $globalNav.fadeIn(FADEIN_TIME);
    // bodyのスクロール禁止解除
    $($_body).css({
      'position': 'relative',
      'width'   : '',
      'overflow': ''
    });
    // スクロール位置を元に戻す
    $_global.scrollTop(currentScrollTop);
    // モーダルを隠す
    var targetCloseModalId  = $(this).data('closemodal');
    var $targetCloseOverlay = $('#' + targetCloseModalId);
    var $targetCloseInner   = $('#' + targetCloseModalId + ' ' + modalInner);
    $targetCloseOverlay.removeClass('active-modal');
    $targetCloseOverlay.fadeOut(FADEOUT_TIME);
    // モーダルウィンドウのスクロール位置をリセット
    $targetCloseInner.scrollTop(0);
  });
});
