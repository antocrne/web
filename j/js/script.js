Barba.Pjax.start();

var FadeTransition = Barba.BaseTransition.extend({
                    start: function() {
                    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */
                    // As soon the loading is finished and the old page is faded out, let's fade the new page
                    Promise
                    .all([this.newContainerLoading, this.fadeOut()])
                    .then(this.fadeIn.bind(this));
                    },
                    fadeOut: function() {
                    /**
     * this.oldContainer is the HTMLElement of the old Container
     */
                    return $(this.oldContainer).animate({ opacity: 0 }).promise();
                    },
                    fadeIn: function() {
                    /**
     * this.newContainer is the HTMLElement of the new Container
     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
     * Please note, newContainer is available just after newContainerLoading is resolved!
     */
                    var _this = this;
                    var $el = $(this.newContainer);
                    $(this.oldContainer).hide();
                    $el.css({
                    visibility : 'visible',
                    opacity : 0
                    });
                    $el.animate({ opacity: 1 }, 400, function() {
                    /**
       * Do not forget to call .done() as soon your transition is finished!
       * .done() will automatically remove from the DOM the old Container
       */
                    _this.done();
                    });
                    }
});
/**
 * Next step, you have to tell Barba to use the new Transition
 */
Barba.Pjax.getTransition = function() {
                    /**
   * Here you can use your own logic!
   * For example you can use different Transition based on the current page or link...
   */
                    return FadeTransition;
};


// smooth scroll
$(document).ready(function() {

  $("#topBtn").on('click', function(event) {


    if (this.hash !== "") {

      event.preventDefault();


      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 200, function() {


        window.location.hash = hash;
      });
    }
  });
});


// SMOOTH SCROLL CONTROL


// ABOUT Page



/*const options = {
root: null,
rootMargin: "0px",
threshold: 0.9
};

let revealCallback = (entries, self) => {
entries.forEach(entry => {
  let container = entry.target;
  let img = entry.target.querySelector("img");
  const easeInOut = "power3.out";
  const revealAnim = gsap.timeline({ ease: easeInOut });

  if (entry.isIntersecting) {
    revealAnim.set(container, {
      visibility: "visible"
    });
    revealAnim.fromTo(
      container,
      {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
        webkitClipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1,
        ease: easeInOut
      }
    );
    revealAnim.from(img, 4, {
      scale: 1.4,
      ease: easeInOut,
      delay: -1
    });
    self.unobserve(entry.target);
  }
});
};

let revealObserver = new IntersectionObserver(revealCallback, options);

document.querySelectorAll(".reveal").forEach(reveal => {
revealObserver.observe(reveal);
});

*/

// HOVER FOR PROJECT

$(".innerContainer").mouseover(function() {
  var src = $(this).find('img').attr('src');
  var t = $(this).find('h2').text();
  var h = $(this).find('a');
  $('.hover-bg__item').css('backgroundImage', 'url(' + src + ')');
  $('.hover-bg').addClass('is-hover');
  $('.section-bg').addClass('is-opacity');
  $('.section__bg-title').addClass('is-opacity');
  $('.section-item-title').addClass('is-hover');
  $('.section-item-title__item').addClass('is-hover');
  $('.section-item-title__item').text(t);
  $(h).addClass('is-hover');
  $('.project__hover').addClass('is-opacity');
});


$(".innerContainer").mouseleave(function() {
  var src = $(this).find('img').attr('src');
  var h = $(this).find('a');
  $('.hover-bg').removeClass('is-hover');
  $('.section-bg').removeClass('is-opacity');
  $('.section__bg-title').removeClass('is-opacity');
  $('.section-item-title').removeClass('is-hover');
  $('.section-item-title__item').removeClass('is-hover');
  $(h).removeClass('is-hover');
  $('.project__hover').removeClass('is-opacity');

});



// SCROLL POSITION IMAGE

const delSections = document.querySelectorAll(".delayed-section");

delSections.forEach(section => {
  const containerAnim = gsap.to(section.querySelector(".innerContainer"), {
    y: "50%",
    ease: "none"
  });

  const imageAnim = gsap.to(section.querySelector("img"), {
    y: "-50%",
    ease: "none",
    paused: true
  });

  const scrub = gsap.to(imageAnim, {
    progress: 1,
    paused: true,
    ease: "power3",
    duration: parseFloat(section.dataset.scrub) || 0.1,
    overwrite: true
  });

  ScrollTrigger.create({
    animation: containerAnim,
    scrub: true,
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    onUpdate: self => {
      scrub.vars.progress = self.progress;
      scrub.invalidate().restart();
    }
  });
});



// Parallax


var rellax = new Rellax('.js-rellax', {
  center: true
});

var rellax = new Rellax('.rellax-element', {
    breakpoints:[576, 768, 1201]
  });


// Reveal Animation ScrollMagic


var controller = new ScrollMagic.Controller();


new ScrollMagic.Scene({
    triggerElement: ".fade-in",
    triggerHook: 0.9,
    offset: 50
  })
  .setClassToggle(".fade-in", "visible")

  .addTo(controller);


new ScrollMagic.Scene({
    triggerElement: "#reveal1",
    triggerHook: 0.9,
    offset: 50
  })
  .setClassToggle("#reveal1", "visible")
  .addTo(controller);



new ScrollMagic.Scene({
    triggerElement: "#reveal3",
    triggerHook: 0.9,
    offset: 50
  })
  .setClassToggle("#reveal3", "visible")
  .addTo(controller);


new ScrollMagic.Scene({
    triggerElement: "#reveal4",
    triggerHook: 0.9,
    offset: 50
  })
  .setClassToggle("#reveal4", "visible")
  .addTo(controller);
