$(function(){

  // 初期化
  var _global = $(window);
  var GLOBALMENUHEIGHT  = 61;  // グローバルメニューの縦幅
  var LIGHTCOUNT        = 12;  // 光の数
  var DELAYWINDOWRESIZE = 200; // ウィンドウリサイズに、光を表示する時差

  // セレクタ
  var _headerLights     = ".header-lights";
  var _headerLightsArea = ".header-lights-area";
  var _particle         = ".particle";

  // ページ読み込み時、光が振ってくるアニメーションを開始
  window.addEventListener("load", headerLights, false);

  // 一定量スクロールすると、光を削除したり、再描画する
  window.addEventListener("scroll", lightsHiedden, false);

  // ウィンドウリサイズ時、光を再描画
  window.addEventListener("resize", resizeWindow, false);

  // 光の表示位置、種類、タイミングをランダムで生成
  function headerLights() {
    // ウィンドウ幅を取得
    var windowHeight     = _global.height();
    var windowHeightHalf = _global.height() / 2;
    var windowWidth      = _global.height();
    var windowWidthHalf  = _global.height() / 2;

    $.each($(_headerLights), function(){
      for(var i = 0; i <= LIGHTCOUNT; i++) {
        //光が出現するタイミング
        var animationDelay   = Math.random()*10;
        //X座標、Y座標
        var defaultPositionX = (function(){
          return Math.floor(Math.ceil(Math.random()*windowWidth)-windowWidthHalf);
        })();
        var defaultPositionY = (function(){
          return Math.floor(Math.ceil(Math.random()*windowHeight)-windowHeightHalf);
        })();
        //スピード
        var lightType  = Math.floor(Math.random()*2);
        var lightSpeed = Math.floor(Math.random()*2);

        var rorateWay  = (lightSpeed) ? "rorate-way-fast" : "rorate-way-low";

        //光のオブジェクトを生成
        $(this).append('<span class="particle ' + rorateWay +
        '" style="top:' + defaultPositionY +
        'px; left:' + defaultPositionX +
        'px;-webkit-animation-delay: ' + animationDelay +
        's;animation-delay: ' + animationDelay +
        's;"><img src="./img/light_' + lightType +
        '.png" width="15" height="15" alt=""></span>');
      }
    });
  }

  // ウィンドウサイズを変更時、時差をつけてウィンドウ幅を取得
  function resizeWindow(){
    // 時差用
    var timer = false;
    $(_particle).remove();
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      headerLights();
    }, DELAYWINDOWRESIZE);
  }

  // 光を表示・非表示切り替え
  function lightsHiedden(){
    // 光を非表示にするスクロール量
    var distanceTop = windowHeight = _global.height();
    // スクロール位置に達しているかどうかを判別して、表示切り替え
    var css = (_global.scrollTop() > distanceTop - GLOBALMENUHEIGHT) ? 'block' : 'none';
    // 光を非表示
    $(_headerLightsArea).css('display', css);
  }

});
