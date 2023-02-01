


(function ($) {
	'use strict';



	// ========================================
	// Detect browser and add class to </body>
	// ========================================

	// Detect Firefox
	let firefoxAgent = navigator.userAgent.indexOf("Firefox") > -1;

	// Add class "is-firefox" to </body>
	if(firefoxAgent) {
		$("body").addClass("is-firefox");
	}



	// ==========================================================
	// Detect mobile device and add class "is-mobile" to </body>
	// ==========================================================

	// Detect mobile device (Do not remove!!!)
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(navigator.userAgent) ? true : false;

	// Add class "is-mobile" to </body>
	if(isMobile) {
		$("body").addClass("is-mobile");
	}



	// =================
	// Page transitions
	// =================

	if ($("body").hasClass("tt-transition")) {

		// Wait until the whole page is loaded.
		$(window).on("load", function () {
			setTimeout(function(){
				HideLoad(); // call out animations.
			}, 0);
		});

		// Transitions In (when "ptr-overlay" slides in).
		// =================
		function RevealLoad() {
			var tl_transitIn = gsap.timeline({ defaults: { duration: 1, ease: Expo.easeInOut }});
				 tl_transitIn.set("#page-transition", { autoAlpha: 1 });
				 tl_transitIn.to(".ptr-overlay", { scaleY: 1, transformOrigin: "center bottom" }, 0);
				 tl_transitIn.to("#tt-header", { y: -20, autoAlpha: 0 }, 0);
				 tl_transitIn.to(".ptr-preloader", { autoAlpha: 1 }, 0.4);
		}

		// Transitions Out (when "ptr-overlay" slides out)
		// ================
		function HideLoad() {
			var tl_transitOut = gsap.timeline();
				 tl_transitOut.to(".ptr-preloader", { duration: 1, autoAlpha: 0, ease: Expo.easeInOut });
				 tl_transitOut.to(".ptr-overlay", { duration: 1, scaleY: 0, transformOrigin: "center top", ease: Expo.easeInOut }, 0.3);

				 // tt-Header appear
				 tl_transitOut.from("#tt-header", { duration: 1, y: 20, autoAlpha: 0, ease: Expo.easeInOut, clearProps:"all" }, 0.6);


				 // Page header elements appear (elements with class "ph-appear")
				 if ($(".ph-appear").length) {
				 	tl_transitOut.from(".ph-appear", { duration: 1.5, y: 60, autoAlpha: 0, stagger: 0.3, ease: Expo.easeOut, clearProps:"all" }, 1.5);
				 }


}

		// Force page a reload when browser "Back" button click.
		// =====================================================
		window.onpageshow = function (event) {
			if (event.persisted) {
				window.location.reload();
			}
		}


		// On link click
		// ==============
		$("a")
			.not('[target="_blank"]') // omit from selection
			.not('[href^="#"]') // omit from selection
			.not('[href^="mailto"]') // omit from selection
			.not('[href^="tel"]') // omit from selection
			.not(".lg-trigger") // omit from selection
			.not(".tt-btn-disabled a") // omit from selection
			.not(".no-transition") // omit from selection
			.not(".video-frame")
			.not(".shorts-frame")
			.on('click', function(e) {
				e.preventDefault();

				setTimeout(function (url) {
					window.location = url
				}, 1000, this.href);

				RevealLoad(); // call in animations.
		});

	}


		// ==================================
		// OVERLAY MENU
		// ==================================

		$(".navbar").click(function(){
			$('.menu__span').toggleClass('is-active');
			$('.h__menu').toggleClass('is-none');
			$('.overlay__menu').toggleClass('is-visible');
			$('html').toggleClass('tt-no-scroll');
			$('body').toggleClass('tt-ol-menu-open');

			$('body').bind('touchmove', function(e){e.preventDefault()});

			var tl_MenuIn = gsap.timeline();
			tl_MenuIn.from(".nav__link__overlay", { duration: 0.4, delay:0.4, y: 100, autoAlpha: 0, stagger: 0.05, ease: Power2.easeOut, clearProps:"all" });
			tl_MenuIn.from(".no__menu", { duration: 0.4, delay:0.2, autoAlpha: 0, ease: Power2.easeOut, clearProps:"all" });

		});


		// ==================================
		// MODAL VIDEO
		// ==================================


			$(".video-frame").click(function(){
				$('.video-modal').addClass('is-visible');
				$('#tt-header').addClass('is-out');
				$('html').addClass('tt-no-scroll');
				$('body').addClass('tt-ol-menu-open');
				$('body').bind('touchmove', function(e){e.preventDefault()});

				var tl_IframeIn = gsap.timeline();
				tl_IframeIn.from(".video-frame-modal", { duration: 0.4, delay:0.4, y: 100, autoAlpha: 0, stagger: 0.05, ease: Power2.easeOut, clearProps:"all" });
			});

			$(".closeV").click(function(){
				$('.video-modal').removeClass('is-visible');
				$('#tt-header').removeClass('is-out');
				$("#mainVid").attr("src", "");
				$('html').removeClass('tt-no-scroll');
				$('body').removeClass('tt-ol-menu-open');

				$('body').unbind('touchmove', function(e){e.preventDefault()});
			});


			// ==================================
			// SHORTS VIDEO
			// ==================================

			/*


					$('.shorts-frame').click(function(){
						if ( $(this).hasClass('is-void') ) {
			        $(this).removeClass('is-void');
			    } else {
			        $('.shorts-frame').removeClass('is-void');
			        $(this).addClass('is-void');
			    }
					});

				*/


	// =======================================================================================
	// Smooth Scrollbar
	// Source: https://github.com/idiotWu/smooth-scrollbar/
	// =======================================================================================

	if ($("body").hasClass("tt-smooth-scroll")) {

		// Not for mobile devices!
		if(!isMobile) {

			// Init Smooth Scrollbar
			// ======================
			var Scrollbar = window.Scrollbar;
			Scrollbar.init(document.querySelector("#scroll-container"), {
				damping: 0.04,
				renderByPixel: true,
				continuousScrolling: true,
				alwaysShowTracks: true,

			});



			// 3rd party library setup
			// ========================
			let scrollPositionX = 0,
				scrollPositionY = 0,
				bodyScrollBar = Scrollbar.init(document.getElementById("scroll-container"));

			bodyScrollBar.addListener(({ offset }) => {
				scrollPositionX = offset.x;
				scrollPositionY = offset.y;
			});

			bodyScrollBar.setPosition(0, 0);
			bodyScrollBar.track.xAxis.element.remove();

			// tell ScrollTrigger to use these proxy getter/setter methods for the "body" element:
			ScrollTrigger.scrollerProxy("body", {
				scrollTop(value) {
					if (arguments.length) {
						bodyScrollBar.scrollTop = value;
					}
					return bodyScrollBar.scrollTop;
				}
			});

			// when smooth scroller updates, tell ScrollTrigger to update() too.
			bodyScrollBar.addListener(ScrollTrigger.update);


			// Move "tt-header" out of "scroll-container"
			// Expl: Since Smooth Scrollbar doesn't support element fixed position inside "scroll-container" move the "tt-header" out of it.
			// ==========================================
			if ($("#tt-header").hasClass("tt-header-fixed")) {
				$("#tt-header").prependTo( $("#body-inner"));
			}


			// Enable regular scrollbar inside a smooth scrollbar (#scroll-container). IMPORTANT: use class "tt-overflow" on inside scroll elements!
			// ===================================================
			if ($(".tt-overflow").length) {
				// Determine if an element is scrollable
				$.fn.ttIsScrollable = function () {
					return this[0].scrollWidth > this[0].clientWidth || this[0].scrollHeight > this[0].clientHeight;
				};

				$(".tt-overflow").each(function() {
					var $this = $(this);
					if ($this.ttIsScrollable()) {
						$this.on("wheel", function(e) {
							e.stopPropagation();
						});
					}
				});
			}


			// Prevent input[type=number] to scroll on focus
			// ==============================================
			$("input[type=number]").on("focus", function() {
				$(this).on("wheel", function(e) {
					e.stopPropagation();
				});
			});

		}

	}





	// ==================================================
	// Image lazy loading
	// ==================================================

	ScrollTrigger.config({ limitCallbacks: true });

	gsap.utils.toArray(".tt-lazy").forEach(image => {

		let newSRC = image.dataset.src,
			 newImage = document.createElement("img"),

		loadImage = () => {
			newImage.onload = () => {
				newImage.onload = null; // avoid recursion
				newImage.src = image.src; // swap the src
				image.src = newSRC;
				// place the low-res version on TOP and then fade it out.
				gsap.set(newImage, {
					position: "absolute",
					top: image.offsetTop,
					left: image.offsetLeft,
					width: image.offsetWidth,
					height: image.offsetHeight
				});
				image.parentNode.appendChild(newImage);
				gsap.to(newImage, {
					opacity: 0,
					onComplete: () => {
						newImage.parentNode.removeChild(newImage);
						image.removeAttribute("data-src"); // remove "data-src" attribute if image is loaded
					}
				});
				st && st.kill();
			}
			newImage.src = newSRC;

			ScrollTrigger.refresh(true);
		},

		st = ScrollTrigger.create({
			trigger: image,
			start: "-50% bottom",
			onEnter: loadImage,
			onEnterBack: loadImage // make sure it works in either direction
		});
	});







	// ================================================================
	// GSAP ScrollTrigger plugin
	// ================================================================

	// Page header elements scrolling effects:
	// =======================================


		// Page header scroll down circle
		if ($(".scroll-down-circle").length) {
			gsap.to(".scroll-down-circle", {
				x: -100,
				autoAlpha: 0,
				ease: "none",
				scrollTrigger: {
					trigger: "#page-header",
					start: "top top",
					end: "30% top",
					scrub: true,
					markers: false
				},
			});
		}


		// Project appear
		$(".p-img-element").each(function() {
			var $pImg = $(this).find(".p-img");

			let tl_pImg = gsap.timeline({
				scrollTrigger: {
					trigger: this,
					start: "top bottom",
					markers: false
				}
			});

			if ($($pImg).length) {
				tl_pImg.from($pImg, { duration: 2.5, autoAlpha: 0, ease: Expo.easeOut, clearProps:"all" }, "+=0.5");
			}


	});

		$(".p-info").each(function() {
			var $pTitle = $(this).find(".p-title");
			var $pCategory = $(this).find(".p-categories");


			let tl_pInfo = gsap.timeline({
				scrollTrigger: {
					trigger: this,
					start: "top bottom",
					markers: false
				}
			});

			if ($($pTitle).length) {
				tl_pInfo.from($pTitle, { duration: 2.5, autoAlpha: 0, y: 80, ease: Expo.easeOut, clearProps:"all" }, "+=0.5");
			}
			if ($($pCategory).length) {
				tl_pInfo.from($pCategory, { duration: 2.5, autoAlpha: 0, y: 60, ease: Expo.easeOut, clearProps:"all" }, "-=2.2");
			}

	});





	// ================================================================
	// Scroll to top
	// Requires "GSAP ScrollToPlugin" (https://greensock.com/docs/v2/Plugins/ScrollToPlugin)
	// ================================================================

	$(".scroll-to-top").on("click", function() {
		if(!isMobile) { // Not for mobile devices!
			if ($("body").hasClass("tt-smooth-scroll")) {
				var $scrollbar = Scrollbar.init(document.getElementById("scroll-container"));
				gsap.to($scrollbar, { duration: 1.5, scrollTo: { y: 0, autoKill: true }, ease: Expo.easeInOut });
			} else {
				$("html,body").animate({scrollTop: 0}, 800);
			}
		} else {
			$("html,body").animate({scrollTop: 0}, 800);
		}
		return false;
	});



//=======================================================================
// TILT.JS
//=======================================================================

$('.js-tilt').tilt({
    scale: 1.03,
		maxTilt: 12,
		perspective: 1000,
});

	// =======================================================================================
	// Defer videos (Youtube, Vimeo)
	// Note: When you have embed videos in your webpages it causes your page to load slower.
	// =======================================================================================

	function init() {
	var vidDefer = document.getElementsByTagName("iframe");
	for (var i=0; i<vidDefer.length; i++) {
	if(vidDefer[i].getAttribute("data-src")) {
	vidDefer[i].setAttribute("src",vidDefer[i].getAttribute("data-src"));
	} } }
	window.onload = init;



	// Force page scroll position to top on refresh (do not remove!)
	// =============================================
	$(window).on("pagehide", function(){
		$(window).scrollTop(0);
	});


	// Hover fix for iOS
	// ==================
	$("*").on("touchstart",function() {
		$(this).trigger("hover");
	}).on("touchend",function() {
		$(this).trigger("hover");
	});


	// Mail Script with jQuery
	//==================================
	$("#email").click(function() {

    if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById("email"));
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById("email"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
    document.execCommand("copy");

    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    }
    else if (document.selection) {
        document.selection.empty();
    }

    var posEmailX = $("#email").offset().left;
    var posEmailY = $("#email").offset().top;
    var emailHeight = $("#email").height();
    let emailContent = document.getElementById("email").innerHTML;

    document.getElementById("email").innerHTML = "Email copied to clipboard";

    setTimeout(function(){
        document.getElementById("email").innerHTML = "mail.professionnel@mail.com";
    }, 1200);
});






})(jQuery);
