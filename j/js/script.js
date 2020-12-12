


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
