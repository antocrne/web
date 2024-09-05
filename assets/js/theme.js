

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
				 tl_transitIn.to("#content-wrap", { y: -80, autoAlpha: 0 }, 0);
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

				 // Page header image appear
				 if ($(".ph-image").length) {
				 	if ($("#page-header").hasClass("ph-bg-image")) {
				 		tl_transitOut.from(".ph-image img, .ph-video", { duration: 1.5, y: 80, autoAlpha: 0, stagger: 0.3, ease: Expo.easeOut, clearProps:"all" }, 0.8);
				 	} else {
				 		tl_transitOut.from(".ph-image", { duration: 1.5, y: 80, autoAlpha: 0, stagger: 0.3, ease: Expo.easeOut, clearProps:"all" }, 1.2);
				 	}
				 }

				 // Page header elements appear (elements with class "ph-appear")
				 if ($(".ph-appear").length) {
				 	tl_transitOut.from(".ph-appear", { duration: 1.5, y: 60, autoAlpha: 0, stagger: 0.3, ease: Expo.easeOut, clearProps:"all" }, 1.5);
				 }

				 // Page header elements appear (project info list)
				 if ($("#page-header .project-info-list").length) {
				 	if ($("#page-header").hasClass("ph-inline")) {
				 		tl_transitOut.from("#page-header .project-info-list > ul > li", { duration: 1.5, y: 80, autoAlpha: 0, stagger: 0.15, ease: Expo.easeOut, clearProps:"all" }, 2.2);
				 	} else {
				 		tl_transitOut.from("#page-header .project-info-list > ul", { duration: 1.5, y: 80, autoAlpha: 0, ease: Expo.easeOut, clearProps:"all" }, 2.2);
				 	}
				 }

				 // Portfolio slider elements appear (full heigth slider)
				 if ($(".tt-psc-elem").length) {
				 	$(".tt-psc-elem").wrap('<div class="tt-ps-appear"></div>');
				 	tl_transitOut.from(".tt-ps-appear", { duration: 1.5, y: 80, autoAlpha: 0, stagger: 0.3, ease: Expo.easeOut, clearProps:"all" }, 1.4);
				 }

				 // Portfolio carousel elements appear
				 if ($(".tt-pci-title").length) {
				 	tl_transitOut.from(".tt-pci-title", { duration: 1.5, x: 80, autoAlpha: 0, skewX: "-10deg", ease: Expo.easeOut, clearProps:"all" }, 1.4);
				 }
				 if ($(".tt-pci-category").length) {
				 	tl_transitOut.from(".tt-pci-category", { duration: 1.5, x: 80, autoAlpha: 0, ease: Expo.easeOut, clearProps:"all" }, 1.5);
				 }

				 // Page other elements appear
				 tl_transitOut.from("#page-content", { duration: 1.5, autoAlpha: 0, y: 80, ease: Expo.easeOut, clearProps:"all" }, 0.8);
				 tl_transitOut.set("#page-transition", { duration: 1, autoAlpha: 0, ease: Expo.easeInOut });
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
			.on('click', function(e) {
				e.preventDefault();

				setTimeout(function (url) {
					window.location = url
				}, 1000, this.href);

				RevealLoad(); // call in animations.
		});

	}



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
				damping: 0.06,
				renderByPixel: true,
				continuousScrolling: true,
				alwaysShowTracks: true
			});


			// 3rd party library setup
			// More info: https://greensock.com/docs/v3/Plugins/ScrollTrigger/static.scrollerProxy()
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



	// =======================================================================================
	// Magic cursor (no effect on small screens!)
	// https://codepen.io/Sahil89/pen/MQbdNR
	// https://greensock.com/forums/topic/17490-follow-button-effect/?tab=comments#comment-81107
	// =======================================================================================

	if ($("body").not(".is-mobile").hasClass("tt-magic-cursor")) {
		if ($(window).width() > 1024) {
			$(".magnetic-item").wrap('<div class="magnetic-wrap"></div>');

			if ($("a.magnetic-item").length) {
				$("a.magnetic-item").addClass("not-hide-cursor");
			}

			var $mouse = { x: 0, y: 0 }; // Cursor position
			var $pos = { x: 0, y: 0 }; // Cursor position
			var $ratio = 0.15; // delay follow cursor
			var $active = false;
			var $ball = $("#ball");

			var $ballWidth = 34; // Ball default width
			var $ballHeight = 34; // Ball default height
			var $ballScale = 1; // Ball default scale
			var $ballOpacity = 0.5; // Ball default opacity
			var $ballBorderWidth = 2; // Ball default border width

			gsap.set($ball, {  // scale from middle and style ball
				xPercent: -50,
				yPercent: -50,
				width: $ballWidth,
				height: $ballHeight,
				borderWidth: $ballBorderWidth,
				opacity: $ballOpacity
			});

			document.addEventListener("mousemove", mouseMove);

			function mouseMove(e) {
				$mouse.x = e.clientX;
				$mouse.y = e.clientY;
			}

			gsap.ticker.add(updatePosition);

			function updatePosition() {
				if (!$active) {
					$pos.x += ($mouse.x - $pos.x) * $ratio;
					$pos.y += ($mouse.y - $pos.y) * $ratio;

					gsap.set($ball, { x: $pos.x, y: $pos.y });
				}
			}

			$(".magnetic-wrap").mousemove(function(e) {
				parallaxCursor(e, this, 2); // magnetic ball = low number is more attractive
				callParallax(e, this);
			});

			function callParallax(e, parent) {
				parallaxIt(e, parent, parent.querySelector(".magnetic-item"), 25); // magnetic area = higher number is more attractive
			}

			function parallaxIt(e, parent, target, movement) {
				var boundingRect = parent.getBoundingClientRect();
				var relX = e.clientX - boundingRect.left;
				var relY = e.clientY - boundingRect.top;

				gsap.to(target, {
					duration: 0.3,
					x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
					y: ((relY - boundingRect.height / 2) / boundingRect.height) * movement,
					ease: Power2.easeOut
				});
			}

			function parallaxCursor(e, parent, movement) {
				var rect = parent.getBoundingClientRect();
				var relX = e.clientX - rect.left;
				var relY = e.clientY - rect.top;
				$pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
				$pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
				gsap.to($ball, {duration: 0.3, x: $pos.x, y: $pos.y });
			}


			// Magic cursor behavior
			// ======================

			// Magnetic item hover.
			$(".magnetic-wrap").on("mouseenter", function(e) {
				gsap.to($ball, { duration: 0.3, scale: 2, borderWidth: 1, opacity: $ballOpacity });
				$active = true;
			}).on("mouseleave", function(e) {
				gsap.to($ball, { duration: 0.3, scale: $ballScale, borderWidth: $ballBorderWidth, opacity: $ballOpacity });
				gsap.to(this.querySelector(".magnetic-item"), { duration: 0.3, x: 0, y: 0, clearProps:"all" });
				$active = false;
			});

			// Alternative cursor style on hover.
			$(".cursor-alter, .tt-main-menu-list > li > a, .tt-main-menu-list > li > .tt-submenu-trigger > a")
			.not(".magnetic-item") // omit from selection.
			.on("mouseenter", function() {
				gsap.to($ball, {
					duration: 0.3,
					borderWidth: 0,
					opacity: 0.2,
					backgroundColor: "#CCC",
					width: "100px",
					height: "100px",
				});
			}).on("mouseleave", function() {
				gsap.to($ball, {
					duration: 0.3,
					borderWidth: $ballBorderWidth,
					opacity: $ballOpacity,
					backgroundColor: "transparent",
					width: $ballWidth,
					height: $ballHeight,
					clearProps:"backgroundColor"
				});
			});


			// Cursor view on hover (data attribute "data-cursor="...").
			$("[data-cursor]").each(function() {
				$(this).on("mouseenter", function() {
					$ball.append('<div class="ball-view"></div>');
					$(".ball-view").append($(this).attr("data-cursor"));
					gsap.to(ball, { duration: 0.3, yPercent: -75, width: 95, height: 95, opacity: 1, borderWidth: 0, backgroundColor: "#FFF" });
					gsap.to(".ball-view", { duration: 0.3, scale: 1, autoAlpha: 1 });
				}).on("mouseleave", function() {
					gsap.to(ball, { duration: 0.3, yPercent: -50, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity, borderWidth: $ballBorderWidth, backgroundColor: "transparent" });
					gsap.to(".ball-view", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps:"all" });
					$ball.find(".ball-view").remove();
				});
				$(this).addClass("not-hide-cursor");
			});

			// Cursor close on hover.
			$(".cursor-close").each(function() {
				$(this).on("mouseenter", function() {
					$ball.addClass("ball-close-enabled");
					$ball.append('<div class="ball-close">Close</div>');
					gsap.to($ball, { duration: 0.3, yPercent: -75, width: 80, height: 80, opacity: 1 });
					gsap.from(".ball-close", { duration: 0.3, scale: 0, autoAlpha: 0 });
				}).on("mouseleave click", function() {
					$ball.removeClass("ball-close-enabled");
					gsap.to($ball, { duration: 0.3, yPercent: -50, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity });
					$ball.find(".ball-close").remove();
				});

				// Hover on "cursor-close" inner elements.
				$(".cursor-close a, .cursor-close button, .cursor-close .tt-btn, .cursor-close .hide-cursor")
				.not(".not-hide-cursor") // omit from selection (class "not-hide-cursor" is for global use).
				.on("mouseenter", function() {
					$ball.removeClass("ball-close-enabled");
				}).on("mouseleave", function() {
					$ball.addClass("ball-close-enabled");
				});
			});

			//  interactive title link hover.
			$(".interactive-list-item").each(function() {
				var $piItem = $(this);
				if ($(this).find(".il-item-image").length) {
					$piItem.find(".il-item-title-link").on("mouseenter mouseover", function() {
						$("#magic-cursor").addClass("interactive-list-hover-on");
						$piItem.find(".il-item-image").appendTo($ball);
						gsap.to($ball, { duration: 0.3, width: "20vw", height: "20vw", opacity: 1 });
						$ball.find(".il-item-image video").each(function() {
							$(this).get(0).play();
						});
					}).on("mouseleave", function() {
						$("#magic-cursor").removeClass("interactive-list-hover-on");
						$ball.find(".il-item-image").appendTo($piItem);
						gsap.to($ball, { duration: 0.3, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity });
						$piItem.find('.il-item-image video').each(function() {
							$(this).get(0).pause();
						});
					});
					$(this).find(".il-item-title-link").addClass("not-hide-cursor");
				}
			});

			// Page nav hover.
			$(".tt-page-nav").each(function() {
				var $pnImg = $(this);
				if ($(this).find(".tt-pn-image").length) {
					$pnImg.find(".tt-pn-link").on("mouseenter mouseover", function() {
						$("#magic-cursor").addClass("tt-pn-hover-on");
						$pnImg.parent().find(".tt-pn-image").appendTo($ball);
						gsap.to($ball, { duration: 0.3, width: "20vw", height: "20vw", opacity: 1 });
						$ball.find(".tt-pn-image video").each(function() {
							$(this).get(0).play();
						}); 
					}).on("mouseleave", function() {
						$("#magic-cursor").removeClass("tt-pn-hover-on");
						$ball.find(".tt-pn-image").appendTo($pnImg);
						gsap.to($ball, { duration: 0.3, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity });
						
						$pnImg.parent().find('.tt-pn-image video').each(function() {
							$(this).get(0).pause();
						}); 
					});
					$(this).find(".tt-pn-link").addClass("not-hide-cursor");
				} else {
					$(this).find(".tt-pn-link").removeClass("not-hide-cursor");
				}
			});




			// Show/hide magic cursor
			// =======================

			// Hide on hover.
			$("a, button, .tt-btn, .tt-form-control, .tt-form-radio, .tt-form-check, .hide-cursor") // class "hide-cursor" is for global use.
			.not(".not-hide-cursor") // omit from selection (class "not-hide-cursor" is for global use).
			.not(".cursor-alter") // omit from selection
			.not(".tt-main-menu-list > li > a") // omit from selection
			.not(".tt-main-menu-list > li > .tt-submenu-trigger > a") // omit from selection
			.on("mouseenter", function() {
				gsap.to($ball, { duration: 0.3, scale: 0, opacity: 0 });
			}).on("mouseleave", function() {
				gsap.to($ball, { duration: 0.3, scale: $ballScale, opacity: $ballOpacity });
			});

			// Hide on click.
			$("a")
				.not('[target="_blank"]') // omit from selection.
				.not('[href^="#"]') // omit from selection.
				.not('[href^="mailto"]') // omit from selection.
				.not('[href^="tel"]') // omit from selection.
				.not(".lg-trigger") // omit from selection.
				.not(".tt-btn-disabled a") // omit from selection.
				.on('click', function() {
					gsap.to($ball, { duration: 0.3, scale: 1.3, autoAlpha: 0 });
			});

			// Show/hide on document leave/enter.
			$(document).on("mouseleave", function() {
				gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 0 });
			}).on("mouseenter", function() {
				gsap.to("#magic-cursor", {duration: 0.3, autoAlpha: 1 });
			});

			// Show as the mouse moves.
			$(document).mousemove(function() {
				gsap.to("#magic-cursor", {duration: 0.3, autoAlpha: 1 });
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






	// ==================================================
	// Overlay menu
	// ==================================================

	// Add class "tt-header-fixed-on" to <body> if "tt-header-fixed" enabled.
	if ($("#tt-header").hasClass("tt-header-fixed")) {
		$("body").addClass("tt-header-fixed-on");
	}

	// On menu toggle button click
	// ============================
	var $olMenuToggleBtn = $(".tt-ol-menu-toggle-btn-text, .tt-ol-menu-toggle-btn");

	$olMenuToggleBtn.on("click", function() {
		$("html").toggleClass("tt-no-scroll");
		$("body").toggleClass("tt-ol-menu-open");
		if ($("body").hasClass("tt-ol-menu-open")) {

			// Menu step in animations
			// ========================
			$("body").addClass("olm-toggle-no-click"); // Disable toggle button click until the animations last.

			var tl_olMenuIn = gsap.timeline({
				onComplete: function() {
					$("body").removeClass("olm-toggle-no-click");
				}
			});

				 tl_olMenuIn.to(".tt-overlay-menu", { duration: 0.4, autoAlpha: 1 });
				 //tl_olMenuIn.from(".bg-menu", { duration: 0.3, x: -80, autoAlpha: 0, ease: Power2.easeOut, clearProps:"all" });
				 tl_olMenuIn.from(".nav-link", { duration: 0.2, y: 80, autoAlpha: 0, ease: Power3.easeInOut, clearProps:"all" });


			// On menu link click
			$(".tt-overlay-menu a, .tt-logo a")
			.not('[target="_blank"]') // omit from selection
			.not('[href^="#"]') // omit from selection
			.not('[href^="mailto"]') // omit from selection
			.not('[href^="tel"]') // omit from selection
			.on('click', function() {
				gsap.set("#content-wrap, .ttgr-cat-nav", { autoAlpha: 0 }); // Hide before timeline
				var tl_olMenuClick = gsap.timeline();
					 //tl_olMenuClick.to(".bg-menu", { duration: 0.4, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn });
			});

			// Hide sliding sidebar
			if ($(".tt-sliding-sidebar-wrap").length) {
				gsap.to(".tt-sliding-sidebar-trigger", { duration: 1, autoAlpha: 0, ease: Expo.easeOut });
			}

		} else {

			// Menu step out animations
			// =========================
			$("body").addClass("olm-toggle-no-click"); // Disable toggle button click until the animations last.

			var tl_olMenuOut = gsap.timeline({
				onComplete: function() {
					$("body").removeClass("olm-toggle-no-click");
				}
			});
				 tl_olMenuOut.to(".tt-overlay-menu", { duration: 0.4, autoAlpha: 0, clearProps:"all" }, "+=0.2");




		}

		return false;
	});




	// =====================================================
	// lightGallery (lightbox plugin)
	// Source: http://sachinchoolur.github.io/lightGallery
	// Mousewheel plugin: https://github.com/jquery/jquery-mousewheel
	// =====================================================

	$(".lightgallery").lightGallery({

		// Please read about gallery options here: http://sachinchoolur.github.io/lightGallery/docs/api.html

		// lightGallery core
		selector: '.lg-trigger',
		mode: 'lg-fade', // Type of transition between images ('lg-fade' or 'lg-slide').
		height: '100%', // Height of the gallery (ex: '100%' or '300px').
		width: '100%', // Width of the gallery (ex: '100%' or '300px').
		iframeMaxWidth: '100%', // Set maximum width for iframe.
		loop: true, // If false, will disable the ability to loop back to the beginning of the gallery when on the last element.
		speed: 600, // Transition duration (in ms).
		closable: true, // Allows clicks on dimmer to close gallery.
		escKey: true, // Whether the LightGallery could be closed by pressing the "Esc" key.
		keyPress: true, // Enable keyboard navigation.
		hideBarsDelay: 3000, // Delay for hiding gallery controls (in ms).
		controls: true, // If false, prev/next buttons will not be displayed.
		mousewheel: true, // Chane slide on mousewheel.
		download: false, // Enable download button. By default download url will be taken from data-src/href attribute but it supports only for modern browsers. If you want you can provide another url for download via data-download-url.
		counter: true, // Whether to show total number of images and index number of currently displayed image.
		swipeThreshold: 50, // By setting the swipeThreshold (in px) you can set how far the user must swipe for the next/prev image.
		enableDrag: true, // Enables desktop mouse drag support.
		enableTouch: true, // Enables touch support.
		getCaptionFromTitleOrAlt: false, // Option to get captions from alt or title tags.

		// Thumbnail plugin
		thumbnail: false, // Enable thumbnails for the gallery.
		showThumbByDefault: false, // Show/hide thumbnails by default.
		thumbMargin: 5, // Spacing between each thumbnails.
		toogleThumb: true, // Whether to display thumbnail toggle button.
		enableThumbSwipe: true, // Enables thumbnail touch/swipe support for touch devices.
		exThumbImage: 'data-exthumbnail', // If you want to use external image for thumbnail, add the path of that image inside "data-" attribute and set value of this option to the name of your custom attribute.

		// Autoplay plugin
		autoplay: false, // Enable gallery autoplay.
		autoplayControls: true, // Show/hide autoplay controls.
		pause: 6000, // The time (in ms) between each auto transition.
		progressBar: true, // Enable autoplay progress bar.
		fourceAutoplay: false, // If false autoplay will be stopped after first user action

		// Full Screen plugin
		fullScreen: true, // Enable/Disable fullscreen mode.

		// Zoom plugin
		zoom: false, // Enable/Disable zoom option.
		scale: 0.5, // Value of zoom should be incremented/decremented.
		enableZoomAfter: 50, // Some css styles will be added to the images if zoom is enabled. So it might conflict if you add some custom styles to the images such as the initial transition while opening the gallery. So you can delay adding zoom related styles to the images by changing the value of enableZoomAfter.

		// Video options
		videoMaxWidth: '1400px', // Set limit for video maximal width.

		// Youtube video options
		loadYoutubeThumbnail: true, // You can automatically load thumbnails for youtube videos from youtube by setting loadYoutubeThumbnail true.
		youtubeThumbSize: 'default', // You can specify the thumbnail size by setting respective number: 0, 1, 2, 3, 'hqdefault', 'mqdefault', 'default', 'sddefault', 'maxresdefault'.
		youtubePlayerParams: { // Change youtube player parameters: https://developers.google.com/youtube/player_parameters
			modestbranding: 0,
			showinfo: 1,
			controls: 1
		},

		// Vimeo video options
		loadVimeoThumbnail: true, // You can automatically load thumbnails for vimeo videos from vimeo by setting loadYoutubeThumbnail true.
		vimeoThumbSize: 'thumbnail_medium', // Thumbnail size for vimeo videos: 'thumbnail_large' or 'thumbnail_medium' or 'thumbnail_small'.
		vimeoPlayerParams: { // Change vimeo player parameters: https://developer.vimeo.com/player/embedding#universal-parameters
			byline : 1,
			portrait : 1,
			title: 1,
			color : 'CCCCCC',
			autopause: 1
		},

		// Hash plugin (unique url for each slides)
		hash: false, // Enable/Disable hash plugin.
		hgalleryId: 1, // Unique id for each gallery. It is mandatory when you use hash plugin for multiple galleries on the same page.

		// Rotate plugin
		rotate: false,

	});




	// ================================================================
	// GSAP ScrollTrigger plugin
	// More info: https://greensock.com/docs/v3/Plugins/ScrollTrigger/
	// ================================================================

	// Page header elements scrolling effects:
	// =======================================
	if ($("#page-header").hasClass("ph-content-parallax")) {
		let tlPhParallax = gsap.timeline({
			scrollTrigger: {
				trigger: "#page-header",
				start: 'top top',
				end: 'bottom top',
				scrub: true,
				markers: false
			}
		});

		// Page header caption elements scrolling effect

		}
		if ($(".ph-caption-title").length) {
			$(".ph-caption-title").wrapInner('<div class="ph-title-parallax"></div>');
			tlPhParallax.to(".ph-title-parallax", { y: -40 }, 0);
		}

		if ($(".ph-caption-title-ghost").length) {
			$(".ph-caption-title-ghost").wrapInner('<div class="ph-ghost-parallax"></div>');
			tlPhParallax.to(".ph-ghost-parallax", { y: 40 }, 0);
		}

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


	// Appear on scroll
	// =================

	// zoom in
	$(".anim-zoomin").each(function() {

		// Add wrap <div>.
		$(this).wrap('<div class="anim-zoomin-wrap"></div>');

		// Add overflow hidden.
		$(".anim-zoomin-wrap").css({ "overflow": "hidden" })

		var $this = $(this);
		var $asiWrap = $this.parents(".anim-zoomin-wrap");

		let tl_ZoomIn = gsap.timeline({
			scrollTrigger: {
				trigger: $asiWrap,
				start: "top 90%",
				markers: false,
				onEnter: () => animZoomInRefresh(),
			}
		});
		tl_ZoomIn.from($this, { duration: 1.5, autoAlpha: 0, scale: 1.2, ease: Power2.easeOut, clearProps:"all" });

		// Refresh start/end positions on enter.
		function animZoomInRefresh() {
			ScrollTrigger.refresh();
		};
	});


	// fade in-up
	$(".anim-fadeinup").each(function() {
		let tl_FadeInUp = gsap.timeline({
			scrollTrigger: {
				trigger: this,
				start: "top bottom",
				markers: false
			}
		});

		tl_FadeInUp.from(this, { duration: 2.5, autoAlpha: 0, y: 100, ease: Expo.easeOut, clearProps:"all" }, "+=0.3");
	});


	// skew in-up
	$(".anim-skewinup").each(function() {
		let tl_SkewInUp = gsap.timeline({
			scrollTrigger: {
				trigger: this,
				start: "top bottom",
				markers: false
			}
		});

		tl_SkewInUp.from(this, { duration: 2, skewY: 5, transformOrigin: "left top", autoAlpha: 0, y: 100, ease: Expo.easeOut, clearProps:"all" }, "+=0.3");
	});


	// stretch in-up
	$(".anim-stretchinup").each(function() {
		let tl_StretchInUp = gsap.timeline({
			scrollTrigger: {
				trigger: this,
				start: "top bottom",
				markers: false
			}
		});

		tl_StretchInUp.from(this, { duration: 2, autoAlpha: 0, y: 100, scaleY: 1.4, transformOrigin: "top", ease: Expo.easeOut, clearProps:"all" }, "+=0.2");
	});




	// ================================================================
	// interactive
	// ================================================================

	if(!isMobile) { // No effect on mobile devices!

		if ($(".interactive-list").hasClass("pi-force-scroll")) {

			// Clone hover title (no effect on mobile devices!).
			$(".il-item-hover-title").each(function() {
				var $this = $(this);
				$this.wrapInner('<span></span>');

				// Clone hover title
				var $piHoverTitle = $($this).find("span");
				for (var i = 0; i < 5; i++) {
					$piHoverTitle.clone().insertAfter($piHoverTitle);
				}
			});

		} else {

			// If the hover title is wider than the parent element.
			$(".il-item-hover-title").each(function() {
				var $this = $(this);
				if ($this.width() > $this.parent().width()) {
					$this.wrapInner('<span></span>');

					// Clone hover title
					var $pnHoverTitle = $($this).find("span");
					for (var i = 0; i < 1; i++) {
						$pnHoverTitle.clone().insertAfter($pnHoverTitle);
					}
				}
			});
		}

		// Title on link hover.
		$(".interactive-list-item").each(function() {
			$(this).find(".il-item-title-link").on("mouseenter", function() {
				$(this).parent().addClass("il-item-hover");
			}).on("mouseleave", function() {
				$(this).parent().removeClass("il-item-hover");
			});
		});

		// Hover scrolling speed.
		$(".interactive-list-item").each(function() {
			var $piHoverSpeed = $(this).data("scroll-speed");
			$(this).find(".il-item-hover-title span").css({
				"animation-duration": $piHoverSpeed + "s",
			});
		});

	}





	// ==================================
	// Scrolling text
	// ==================================

	// Hover scrolling speed.
	$(".tt-scrolling-text").each(function() {
		var $tt_stSpeed = $(this).data("scroll-speed");
		$(this).find(".tt-scrolling-text-inner").css({
			"animation-duration": $tt_stSpeed + "s",
		});
	});



	// ================================================================
	// Page nav
	// ================================================================

	if(!isMobile) { // No effect on mobile devices!

		if ($(".tt-page-nav").hasClass("tt-pn-scroll")) {

			$(".tt-page-nav").find(".tt-pn-hover-title").each(function() {
				var $this = $(this);
				$this.wrapInner('<span></span>');

				// Clone hover title
				var $pnHoverTitle = $($this).find("span");
				for (var i = 0; i < 7; i++) {
					$pnHoverTitle.clone().insertAfter($pnHoverTitle);
				}
			});

		} else {

			// If the hover title is wider than the parent element.
			$(".tt-page-nav").find(".tt-pn-hover-title").each(function() {
				var $this = $(this);
				if ($this.width() > $this.parent().width()) {
					$this.wrapInner('<span></span>');
					
					// Clone hover title
					var $pnHoverTitle = $($this).find("span");
					for (var i = 0; i < 7; i++) {
						$pnHoverTitle.clone().insertAfter($pnHoverTitle);
					}
				}
			});
		}
		
	}




	// ================================================================
	// Scroll between anchors
	// Requires "Smooth Scrollbar" (https://github.com/idiotWu/smooth-scrollbar/blob/develop/docs/api.md#scrollbarscrollintoview)
	// ================================================================

	$('a[href^="#"]')
		.not('[href$="#"]') // omit from selection
		.not('[href$="#0"]') // omit from selection
		.on("click", function() {

		var target = this.hash;

		// If fixed header position enabled.
		if ($("#tt-header").hasClass("tt-header-fixed")) {
			var $offset = $("#tt-header").height();
		} else {
			var $offset = 0;
		}

		// You can use data attribute (for example: data-offset="100") to set top offset in HTML markup if needed.
		if ($(this).data("offset") != undefined) $offset = $(this).data("offset");

		if(!isMobile) { // Not for mobile devices!
			if ($("body").hasClass("tt-smooth-scroll")) {
				var topY = $(target).offset().top - $("#scroll-container > .scroll-content").offset().top - $offset;
				var $scrollbar = Scrollbar.init(document.getElementById("scroll-container"));
				gsap.to($scrollbar, { duration: 1.5, scrollTo: { y: topY, autoKill: true }, ease: Expo.easeInOut });

			} else {
				var topY = $(target).offset().top - $("body").offset().top - $offset;
				$("html,body").animate({scrollTop: topY}, 800);
			}
		} else {
			var topY = $(target).offset().top - $("body").offset().top - $offset;
			$("html,body").animate({scrollTop: topY}, 800);
		}
		return false;
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



	// =======================================================================================
	// Defer videos (Youtube, Vimeo)
	// Note: When you have embed videos in your webpages it causes your page to load slower.
	// Deffering will allow your page to load quickly.
	// Source: https://www.feedthebot.com/pagespeed/defer-videos.html
	// =======================================================================================

	function init() {
	var vidDefer = document.getElementsByTagName("iframe");
	for (var i=0; i<vidDefer.length; i++) {
	if(vidDefer[i].getAttribute("data-src")) {
	vidDefer[i].setAttribute("src",vidDefer[i].getAttribute("data-src"));
	} } }
	window.onload = init;


	// ================================================================
	// Miscellaneous
	// ================================================================

	// tt-Button disabled (prevent click)
	// ===================
	$(".tt-btn-disabled").find("a").on("click", function() {
		return false;
	});


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


	// Mail Copy to clipboard
	// ==================
	
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
			document.getElementById("email").innerHTML = "antoinecorniere.pro@gmail.com";
		}, 1200);
	});
	



})(jQuery);
