$(window).on('load', function(){
  // 初期化
  var timer = false;
  var windowHeight;
  var windowHeightHalf;
  var windowWidth;
  var windowWidthHalf;

  function getWindowHeight(){
    windowHeight = $(window).height();
    windowHeightHalf = $(window).height() / 2;
    windowWidth = $(window).height();
    windowWidthHalf = $(window).height() / 2;
  }

  getWindowHeight();
  headerLights();

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
  //スクロールすると、光を非表示
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
