

(function ($) {
	'use strict';

    
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
				 tl_transitIn.to("#main__container", { y: -80, autoAlpha: 0 }, 0);
				 tl_transitIn.to(".ptr-preloader", { autoAlpha: 1 }, 0.4);
		}

		// Transitions Out (when "ptr-overlay" slides out)
		// ================
		function HideLoad() {
			var tl_transitOut = gsap.timeline();
				 tl_transitOut.to(".ptr-preloader", { duration: 1, autoAlpha: 0, ease: Expo.easeInOut });
				 tl_transitOut.to(".ptr-overlay", { duration: 1, scaleY: 0, transformOrigin: "center top", ease: Expo.easeInOut }, 0.3);
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


   
    //=============================
    //SCROLL REVEAL
    //===============================
    ScrollReveal().reveal('.work__tbh', { distance: '50px' });


    $(document).ready(function() {

    // Add class to mailto link
    // Needed to separate the disabling of the default action AND copy email to clipboard
    $('a[href^=mailto]').addClass('mailto-link');

    var mailto = $('.mailto-link');
    var messageCopy = 'antoinecorniere.pro@gmail.com';
    var messageSuccess = 'Email address copied to clipboard';

    mailto.append('<span class="mailto-message"></span>');
    $('.mailto-message').append(messageCopy);

    // Disable opening your email client. yuk.
    $('a[href^=mailto]').click(function() {
        return false; 
    })

    // On click, get href and remove 'mailto:' from value
    // Store email address in a variable.
    mailto.click(function() {
        var href = $(this).attr('href');
        var email = href.replace('mailto:', '');
        copyToClipboard(email);
        $('.mailto-message').empty().append(messageSuccess);
        setTimeout(function() {
            $('.mailto-message').empty().append(messageCopy);}, 2000); 
    });

    });

    // Grabbed this from Stack Overflow.
    // Copies the email variable to clipboard
    function copyToClipboard(text) {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    }


})(jQuery);