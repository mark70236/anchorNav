$(function() {
	$.anchorNavInit({
		toleranceScope: 100,
		toleranceScopeMobile: 50,
		duration: 1000,
		curve: 'easeInOutCubic',
		prev: '<span><i class="fas fa-arrow-up"></i></span>',
		next: '<span><i class="fas fa-arrow-down"></i></span>',
		sensitivity: true,
		pageNum: function(index){
			//console.log(index)
			//客製化-第一跟最後一區要隱藏
			if (index==1 || index==$(".anchor-section").length) {
				$(".anchor-nav").addClass('not-show');
			}else {
				$(".anchor-nav").removeClass('not-show');
			}
		}
	})

	let headerHeight = $("header").offset().top;
	$(window).scroll(function(event) {
		//console.log($(window).scrollTop());
		$(".anchor-nav").removeClass('init');
		thisScrollTop = $(window).scrollTop();
		//控制錨點nav顯示時機
		if (thisScrollTop<$(".anchor-section1").height() || thisScrollTop>$(".anchor-section"+$(".anchor-section").length).offset().top-150) {
			$(".anchor-nav").addClass('not-show');
		}else {
			$(".anchor-nav").removeClass('not-show');
		}
	});

})
