$(function(){
	// 初期化
	var timer = false;
  var modalwindowHeight;
	var scroll_top;

	function getWindowHeight() {
		modalwindowHeight = $(window).height();
	}

	// ウィンドウリサイズ
	$(window).on('resize', function(){
		if (timer !== false) {
				clearTimeout(timer);
		}
		timer = setTimeout(function() {
			getWindowHeight();
			$('.modal-overlay').css('max-height', modalwindowHeight);
			$('.modal-inner').css('max-height', modalwindowHeight + 80 + "px");
		}, 200);
	});

	// モーダルオープン時、スクロール禁止
	var width = window.innerWidth - document.body.clientWidth;
	var newStyle = document.createElement('style');
	document.head.appendChild(newStyle);
	newStyle.sheet.insertRule('body.enabled_modal { overflow: hidden; }', 0);

	// モーダルオープン時、スクロール禁止解除
	$(document).on('click', '.section-txt__sample-thum-item', function() {
		$('body').addClass('enabled_modal');
		$('.global-nav-wrapper').hide();
		scroll_top = $(window).scrollTop();
		$('body').css({
			'position': 'fixed',
			'width': '100%',
			'top': -scroll_top
		});
	});

	// モーダルクローズ時、windowなどの処理
	$(document).on('click', '.modal-close', function() {
		$('.global-nav-wrapper').fadeIn(200);
		$('body').css({
			'position': 'relative',
			'width': '',
			'top': ''
		});
		$('body').removeClass('enabled_modal');
		$(window).scrollTop(scroll_top);
	});

	// モーダルオープン時、内容を表示
  $(document).on('click', '[data-openmodal]', function(e) {
		getWindowHeight();
		$('.modal-overlay').fadeOut(200);
	  var targetOpenModalId = $(this).attr('data-openmodal');
	  var $targetOpenOverlay = $('#' + targetOpenModalId);
	  var $targetOpenInner = $('#' + targetOpenModalId + ' .modal-inner');
		$targetOpenOverlay.addClass('active-modal');
	  $targetOpenOverlay.css({ height: modalwindowHeight + 'px' });
	  $targetOpenInner.css({ height: (modalwindowHeight + 80) + 'px' });
	  $targetOpenOverlay.fadeIn(200);
		$targetOpenInner.scrollTop(-1);
  });

  // モーダルクローズ時、内容を非表示
  $(document).on('click', '[data-closemodal]', function(e) {
	  var targetCloseModalId = $(this).attr('data-closemodal');
	  var $targetCloseOverlay = $('#' + targetCloseModalId);
	  var $targetCloseInner = $('#' + targetCloseModalId + ' .modal-inner');
		$targetCloseOverlay.removeClass('active-modal');
		$targetCloseInner.scrollTop(-1);
	  $targetCloseOverlay.fadeOut(200);
  });
});
