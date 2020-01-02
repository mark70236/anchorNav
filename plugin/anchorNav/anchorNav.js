/*! anchorNav - v1.0.1 - 2019-12-12
* Includes: anchorNav.js,anchor.css
* Licensed MIT */
const $ = jQuery;
const $wkBody = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');

$.anchorNavPrev = function(duration,curve,pageNum){
	var thisTargetNum = Number($(".anchor-nav li.active").attr('data-target'));
	if (thisTargetNum!=1) {
		var resultNum = thisTargetNum-1;
		$wkBody.animate({
			scrollTop: $("section[data-target="+resultNum+"]").offset().top
		}, duration,curve);
	}
	pageNum(resultNum);
}
$.anchorNavNext = function(duration,curve,pageNum){
	var thisTargetNum = Number($(".anchor-nav li.active").attr('data-target'));
	var lastNum = $(".anchor-nav li[data-target]").length;
	if (thisTargetNum!=lastNum) {
		var resultNum = thisTargetNum+1;
		$wkBody.animate({
			scrollTop: $("section[data-target="+resultNum+"]").offset().top
		}, duration,curve);
	}
	pageNum(resultNum);
}
anchorNavMoveTo = function(thisAnchorNum,duration,curve,pageNum){
	thisAnchorNum = Number(thisAnchorNum);
	if (!duration) {
		duration = 1000;
	}
	if (!curve) {
		curve = 'linear';
	}
	$wkBody.animate({
		scrollTop: $("section[data-target="+thisAnchorNum+"]").offset().top
	}, duration, curve);
	pageNum(thisAnchorNum);
}
$.anchorNavInit = function(options){
	let thisScrollTop = 0;
	let anchorSectionNum = $(".anchor-section").length;
	let setting = $.extend({
		toleranceScope: 100,
		toleranceScopeMobile: 50,
		prev: '▲ ',
		next: '▼',
		duration: 1000,
		curve: 'linear',
		pageNum:'',
		sensitivity: true,
      }, options);


	if ($(window).width()<800) {
		setting.toleranceScope = setting.toleranceScopeMobile;
	}
	var anchorLength = $(".anchor-section").length+1
	for (var i = 1; i <anchorLength ; i++) {
		$(".anchor-section").eq(i-1).addClass('anchor-section'+i).attr('data-target', i);
	}

	//建立面板結構
	$("body").append(`
		<ul class="anchor-nav init">
			<li class="prev">${setting.prev}</li>
			<li class="next">${setting.next}</li>
		</ul>
	`)

	//加上data-section並創建<li>
	$(".anchor-section").each(function(index, el) {
		var dataTargetNum = (Number(index)+1);
		//console.log("index="+(Number(index)+1)+", el="+el)
		$(this).attr('data-section',dataTargetNum);
		$(".anchor-nav .next").before(`
			<li data-target="${dataTargetNum}"><span></span></li>
		`)
	});


	//指定目標
	let target = [];
	let targetScrollTop = [];
	let targetNum = [];
	let section;

	for (let i = 1; i < anchorSectionNum+1; i++) {
		section = ".anchor-section" + i;
		target[i] = $(section);
		targetScrollTop[i] = target[i].offset().top;
		targetNum[i] = target[i].attr('data-target');
	}

	checkTarget()

	//靈敏度
	if (!setting.sensitivity) {
		var resizeTimer = false;
		//滾動觸發
		$(window).scroll(function(event) {
			if (resizeTimer) {
				clearTimeout(resizeTimer);
			}
			resizeTimer = setTimeout(doResize, 100);
		});
		doResize()

		function doResize() {
			checkTarget()
		}
	}else {
		$(window).scroll(function(event) {
			checkTarget()
		});
	}

	//點擊錨點按鈕
	$(".anchor-nav li[data-target]").click(function(event) {
		var thisAnchorNum = $(this).attr('data-target');
		anchorNavMoveTo(thisAnchorNum,setting.duration,setting.curve,setting.pageNum);
	});

	//Prev按鈕
	$(".anchor-nav li.prev").click(function(event) {
		$.anchorNavPrev(setting.duration,setting.curve,setting.pageNum);
	});

	//Next按鈕
	$(".anchor-nav li.next").click(function(event) {
		$.anchorNavNext(setting.duration,setting.curve,setting.pageNum);
	});

	function checkTarget() {
		for (let i = 1; i < anchorSectionNum+1; i++) {
			if ($(window).scrollTop()>targetScrollTop[i]-setting.toleranceScope && $(window).scrollTop()<targetScrollTop[i]+target[i].height()-setting.toleranceScope) {
				if (!target[i].hasClass('active')) {
					target[i].addClass('active');
				}
				if (!$(".anchor-nav li[data-target="+targetNum[i]+"]").hasClass('active')) {$(".anchor-nav li[data-target="+targetNum[i]+"]").addClass('active');}
			}else {
				target[i].removeClass('active');
				$(".anchor-nav li[data-target="+targetNum[i]+"]").removeClass('active');
			}
		}
	}
}

