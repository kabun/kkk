$(window).on('load', function(){
  // 初期化
  var timer = false;
  var windowHeight;
  var windowHeightHalf;
  var windowWidth;
  var windowWidthHalf;

  // ウィンドウ幅を取得
  function getWindowHeight(){
    windowHeight = $(window).height();
    windowHeightHalf = $(window).height() / 2;
    windowWidth = $(window).height();
    windowWidthHalf = $(window).height() / 2;
  }

  // ウィンドウ幅の初期値を取得
  getWindowHeight();
  headerLights();

  // ウィンドウサイズを変更時、時差をつけてウィンドウ幅を取得
  $(window).on('resize', function(){
    $(".particle").remove();
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      getWindowHeight();
      headerLights();
    }, 200);
  });

  // 光の表示位置、種類、タイミングをランダムで生成
  function headerLights() {
    $.each($(".header-lights"), function(){
      //光の数
      var LIGHTCOUNT = 12;
      for(var i = 0; i <= LIGHTCOUNT; i++) {
        //光が出現するタイミング
        var animationDelay = Math.random()*10;
        //X座標、Y座標
        var defaultPositionX = (function(){
          return Math.floor(Math.ceil(Math.random()*windowWidth)-windowWidthHalf);
        })();
        var defaultPositionY = (function(){
          return Math.floor(Math.ceil(Math.random()*windowHeight)-windowHeightHalf);
        })();
        //スピード
        var lightType = Math.floor(Math.random()*2);
        var lightSpeed = Math.floor(Math.random()*2);
        if (lightSpeed) {
          rorateWay = "rorate-way-fast";
        } else {
          rorateWay = "rorate-way-low";
        }
        //光のオブジェクトを生成
        $(this).append('<span class="particle ' + rorateWay +'" style="top:' + defaultPositionY + 'px; left:' + defaultPositionX + 'px;-webkit-animation-delay: ' + animationDelay + 's;animation-delay: ' + animationDelay + 's;"><img src="./img/light_' + lightType + '.png" width="15" height="15" alt=""></span>');
      }
    });
  }
  //一定量スクロールすると、光を非表示
  $(window).scroll(function(){
    // 光を非表示にするスクロール量
    var distanceTop = windowHeight;
    // スクロール位置に達しているかどうかを判別
    if ($(window).scrollTop() > distanceTop - 61) {
      // 光を非表示
      $('.header-lights-area').css('display', 'none');
    } else {
      // 光を表示
      $('.header-lights-area').css('display', 'block');
    }
  });
});
