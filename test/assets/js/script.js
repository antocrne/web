

// =================
// GSAP & ScrollTrigger
// =================

gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector(".carousel");

if (container) {  
    const slides = document.querySelectorAll(".slide");
    const totalHeight = container.scrollHeight; 
    const totalWidth = container.scrollWidth;  
    const isMobile = window.innerWidth <= 768;

    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.display = 'none'; 
        });
    }

    if (isMobile) {
        gsap.to(container, {
            y: () => -totalHeight + window.innerHeight,
            ease: "none",
            scrollTrigger: {
                trigger: ".scroll-container",
                start: "top top",
                end: () => `+=${totalHeight}`,
                scrub: 1,
                pin: true,
            },
        });
    } else {
        gsap.to(container, {
            x: () => -totalWidth + window.innerWidth, 
            ease: "none",
            scrollTrigger: {
                trigger: ".scroll-container",
                start: "center center",
                end: () => `+=${totalWidth}`,
                scrub: 1,
                pin: true,
            },
        });
    }

    slides.forEach((slide) => {
        gsap.to(slide.querySelector("img"), {
            y: 30,
            scale: 1.1,
            scrollTrigger: {
                trigger: slide,
                start: isMobile ? "top bottom" : "left center",
                end: isMobile ? "bottom top" : "right center",
                scrub: 1.05,
            },
        });

        gsap.to(slide.querySelector(".project-title-hidden"), {
            y: 30,
            opacity: 1,
            scrollTrigger: {
                trigger: slide,
                start: isMobile ? "top bottom" : "left center",
                end: isMobile ? "bottom top" : "right center",
                scrub: 1.05,
            },
        });
    });

    slides.forEach((slide) => {
        const imageWrapper = slide.querySelector(".image-wrapper");
        if (!imageWrapper) return;

        imageWrapper.addEventListener("mouseenter", () => {
            gsap.to(imageWrapper, {
                y: -50,
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto",
            });
        });

        imageWrapper.addEventListener("mouseleave", () => {
            gsap.to(imageWrapper, {
                y: 0,
                duration: 0.3,
                ease: "power2.in",
                overwrite: "auto",
            });
        });
    });

    const titleDisplay = document.querySelector('.project-title-display');

    slides.forEach(slide => {
        const imageWrapper = slide.querySelector('.image-wrapper');
        const titleHidden = slide.querySelector('.project-title-hidden');

        if (!imageWrapper || !titleHidden) return;

        imageWrapper.addEventListener('mouseenter', () => {
            const title = titleHidden.textContent;
            titleDisplay.textContent = title;
            titleDisplay.classList.add('show');
        });

        imageWrapper.addEventListener('mouseleave', () => {
            titleDisplay.classList.remove('show');
        });
    });

      const mainTitle = document.querySelector('.main-title');
      const scrollContainer = document.querySelector('.scroll-container');
      
      // Lorsque la souris entre dans la zone scroll-container
      scrollContainer.addEventListener('mouseenter', () => {
        mainTitle.classList.add('hide'); // Cache le titre
      });
      
      // Lorsque la souris quitte la zone scroll-container
      scrollContainer.addEventListener('mouseleave', () => {
        mainTitle.classList.remove('hide'); // Réaffiche le titre
      });
    
    
      if (isMobile) {
        const mainTitle = document.querySelector(".main-title");
        const scrollDownInfo = document.querySelector(".scrolldown_info");
      
        window.addEventListener("scroll", () => {
          // Récupérer la position actuelle du scroll
          const scrollY = window.scrollY;
          
          // Définir l'opacité du titre en fonction de la position du scroll
          const opacityTitle = 1 - (scrollY / 500); // Ajuster 500 pour contrôler la vitesse de disparition du titre
          mainTitle.style.opacity = opacityTitle > 0 ? opacityTitle : 0; // Empêche l'opacité d'aller en dessous de 0
          
          // Définir l'opacité du scrolldown_info en fonction de la position du scroll
          const opacityScrollDown = 1 - (scrollY / 600); // Ajuster 600 pour contrôler la vitesse de disparition de l'icône scroll
          scrollDownInfo.style.opacity = opacityScrollDown > 0 ? opacityScrollDown : 0; // Empêche l'opacité d'aller en dessous de 0
        });
      }
    
      // Sélectionne la barre de progression
      const progressBar = document.querySelector(".progress-bar");
      
      // Fonction pour calculer la progression du scroll
      const updateProgressBar = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight; // Hauteur totale du document
        const scrollPosition = window.scrollY; // Position actuelle du scroll
      
        // Calcule le pourcentage de scroll
        const progressPercentage = (scrollPosition / totalHeight) * 100;
      
        // Met à jour la largeur de la barre de progression
        progressBar.style.width = `${progressPercentage}%`;
      };
      
      // Ajoute un écouteur d'événements pour le scroll
      window.addEventListener("scroll", updateProgressBar);
}

// =================
// Page Transitions
// =================

if (document.body.classList.contains("tt-transition")) {

    // Attendre que la page soit complètement chargée
    window.addEventListener("load", function () {
        setTimeout(HideLoad, 500); // Appel de l'animation de sortie après chargement
    });

    // Animation d'entrée (l'overlay apparaît)
    function RevealLoad() {
      var tl_transitIn = gsap.timeline({ defaults: { duration: 1, ease: "Expo.easeInOut" }});
      tl_transitIn.set("#page-transition", { autoAlpha: 1 });
      tl_transitIn.fromTo(".ptr-overlay", 
          { y: "100%" },  // Départ en bas
          { y: "0%", opacity: 1 }, // Monte vers le haut et devient visible
          0
      );
      tl_transitIn.to(".ptr-preloader", { autoAlpha: 1 }, 0.4);
      
  }

    // Animation de sortie (l'overlay monte et disparaît)
    function HideLoad() {
        var tl_transitOut = gsap.timeline();
        tl_transitOut.to(".ptr-preloader", { duration: 0.5, autoAlpha: 0, ease: "Expo.easeInOut" });
        tl_transitOut.to(".ptr-overlay", { 
            duration: 1, 
            y: "-100%", // Monte l'overlay vers le haut
            opacity: 1, 
            ease: "Expo.easeInOut" 
        }, 0.3);
        tl_transitOut.set("#page-transition", { autoAlpha: 0 });

        // Animation du titre après la transition
          tl_transitOut.fromTo(".main-title", 
            {
                y: 50,         // Départ légèrement en bas
                opacity: 0     // Commence invisible
            },
            {
                y: 0,          // Arrive à sa position originale
                opacity: 1,    // Devient visible
                duration: 1,   // Durée de l'animation
                ease: "power3.out"
            }, 1);  // Démarre avant la fin de l'overlay

          // Faire apparaître scrolldown_info et progress après le titre
          tl_transitOut.fromTo(".scrolldown_info", 
            {
                    
                opacity: 0     // Commence invisible
            },
            {
                        // Arrive à sa position originale
                opacity: 1,    // Devient visible
                duration: 0.5,   // Durée de l'animation
                ease: "power3.out"
             }, 1.5);  // Commence juste après l'animation du titre

            // Sélectionner la barre de progression
            const progressBar = document.querySelector(".progress");
            const progressWidth = progressBar.offsetWidth;  // Obtenir la largeur de la barre de progression

            // Utiliser fromTo pour animer la progress bar
            tl_transitOut.fromTo(progressBar, 
                {
                    width: "0%",   // Valeur initiale (largeur à 0 au début)
                },
                {
                    width: progressWidth + "px",  // Valeur finale (utilise la largeur réelle)
                    duration: 0.5,
                    ease: "power3.out"
                }, 1.6);  // Débute avant la fin de l'animation de scrolldown_info

            // Animation des slides, une par une, avec un délai plus court
            const slides = document.querySelectorAll('.slide');
            slides.forEach((slide, index) => {
                tl_transitOut.fromTo(slide, 
                    {
                        opacity: 0, // Commence invisible
                        y: 50       // Départ légèrement plus bas
                    },
                    {
                        opacity: 1,  // Devient visible
                        y: 0,        // Reviens à sa position normale
                        duration: 0.5, // Durée de l'animation
                        ease: "power3.out",
                        delay: index * 0.1 // Moins de délai entre chaque slide
                    }, 1.8);  // Accélère l'animation en les faisant apparaître plus rapidement

            });
             

    }

    // Forcer le rechargement quand on revient en arrière avec le navigateur
    window.onpageshow = function (event) {
        if (event.persisted) {
            window.location.reload();
        }
    };

    // Gestion des clics sur les liens pour activer la transition
    document.querySelectorAll("a")
        .forEach(link => {
            if (!link.matches('[target="_blank"], [href^="#"], [href^="mailto"], [href^="tel"], .tt-btn-disabled a, .no-transition')) {
                link.addEventListener("click", function(e) {
                    e.preventDefault();

                    setTimeout(() => {
                        window.location = this.href;
                    }, 1000);

                    RevealLoad(); // Lancement de l'animation d'entrée
                });
            }
        });

      
}



// =================
// info Pages
// =================



// Récupère l'élément contenant le contenu à animer
const scrollableSection = document.querySelector(".scrollable-content");

// Calcul de la hauteur totale du contenu à animer
const contentHeight = scrollableSection.scrollHeight;

// Animation de scroll
gsap.to(scrollableSection, {
    y: () => -contentHeight + window.innerHeight, // Déplacement vertical du contenu
    ease: "none", // Effet linéaire
    scrollTrigger: {
        trigger: ".sth-content", // Le déclencheur de l'animation est désormais .sth-content
        start: "top top", // Commence au top de la page
        end: () => `+=${contentHeight}`, // Finit après avoir parcouru toute la hauteur du contenu
        scrub: 1, // Synchronisation avec le scroll
        pin: true, // Epingle le contenu pendant le scroll
    },
});

/*

// Récupère les éléments à animer pour le parallaxe
const imageContainer = document.querySelector(".info-image-container");
const titleContent = document.querySelector(".title-content");
const textContent = document.querySelector(".info-txt");

// Animation Parallaxe
gsap.to(imageContainer, {
    y: -80, // Déplacement vers le haut pour l'effet parallaxe
    ease: "none",
    scrollTrigger: {
        trigger: ".scrollable-content", // Le scroll se déclenche ici
        start: "top top",
        end: "bottom top",
        scrub: 1, // Synchronisation avec le scroll
    },
});

gsap.to(titleContent, {
    y: 70, // Légère translation vers le bas
    ease: "none",
    scrollTrigger: {
        trigger: ".scrollable-content",
        start: "top top",
        end: "bottom top",
        scrub: 1,
    },
});

gsap.to(textContent, {
    y: -30, // Déplacement plus subtil vers le haut
    ease: "none",
    scrollTrigger: {
        trigger: ".scrollable-content",
        start: "top top",
        end: "bottom top",
        scrub: 1,
    },
});



if (document.body.classList.contains("tt-transition")) {

  // Attendre que la page soit complètement chargée
  window.addEventListener("load", function () {
      setTimeout(HideLoad, 500); // Appel de l'animation de sortie après chargement
  });

  // Animation d'entrée (l'overlay apparaît)
  function RevealLoad() {
    var tl_transitIn = gsap.timeline({ defaults: { duration: 1, ease: "Expo.easeInOut" }});
    tl_transitIn.set("#page-transition", { autoAlpha: 1 });
    tl_transitIn.fromTo(".ptr-overlay", 
        { y: "100%" },  // Départ en bas
        { y: "0%", opacity: 1 }, // Monte vers le haut et devient visible
        0
    );
    tl_transitIn.to(".ptr-preloader", { autoAlpha: 1 }, 0.4);
    
}

  // Animation de sortie (l'overlay monte et disparaît)
  function HideLoad() {
      var tl_transitOut = gsap.timeline();
      tl_transitOut.to(".ptr-preloader", { duration: 0.5, autoAlpha: 0, ease: "Expo.easeInOut" });
      tl_transitOut.to(".ptr-overlay", { 
          duration: 1, 
          y: "-100%", // Monte l'overlay vers le haut
          opacity: 1, 
          ease: "Expo.easeInOut" 
      }, 0.3);
      tl_transitOut.set("#page-transition", { autoAlpha: 0 });

      
      
        tl_transitOut.fromTo(".info-image-container", 
        {
            y:50,    
            opacity: 0    
        },
        {
            y:0, 
            opacity: 1,    // Devient visible
            duration: 0.5,   // Durée de l'animation
            ease: "power3.out"
         }, 1.2); 

        tl_transitOut.fromTo(".info-title", 
          {
              x: -50,         // Départ légèrement en bas
              opacity: 0     // Commence invisible
          },
          {
              x: 0,          // Arrive à sa position originale
              opacity: 1,    // Devient visible
              duration: 1,   // Durée de l'animation
              ease: "power3.out"
          }, 1.4);  // Démarre avant la fin de l'overlay
          
        tl_transitOut.fromTo(".info-subtitle", 
          {
              x: 50,         // Départ légèrement en bas
              opacity: 0     // Commence invisible
          },
          {
              x: 0,          // Arrive à sa position originale
              opacity: 1,    // Devient visible
              duration: 1,   // Durée de l'animation
              ease: "power3.out"
          }, 1.5);  // Démarre avant la fin de l'overlay

           

  }

  // Forcer le rechargement quand on revient en arrière avec le navigateur
  window.onpageshow = function (event) {
      if (event.persisted) {
          window.location.reload();
      }
  };

 
}

*/

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
        $('.mailto-message').empty().append(messageCopy);}, 1500); 
});

});


// Copies the email variable to clipboard
function copyToClipboard(text) {
var dummy = document.createElement("input");
document.body.appendChild(dummy);
dummy.setAttribute('value', text);
dummy.select();
document.execCommand('copy');
document.body.removeChild(dummy);
}

