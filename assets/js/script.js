
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

//////////////////////////
// MODAL NAVIGATION WORK
//////////////////////////
var modal = document.getElementById("workModal");
var modalContent = modal.querySelector(".modal-content");
var btn = document.getElementById("workBtn");

// Fonction pour désactiver tous les ScrollTrigger actifs
function disableScrollTriggers() {
  ScrollTrigger.getAll().forEach(trigger => trigger.disable());
}

// Fonction pour réactiver tous les ScrollTrigger actifs
function enableScrollTriggers() {
  ScrollTrigger.getAll().forEach(trigger => trigger.enable());
}

// Fonction pour ouvrir la modal avec animation
function openModal() {
  disableScrollTriggers(); // Désactive ScrollTrigger

  gsap.set(modal, { visibility: "visible", opacity: 0, }); // Assure que la modal est invisible au départ
  gsap.to(modal, { opacity: 1, duration: 0.5 }); // Animation d'opacité de la modal
  gsap.fromTo(modalContent, 
    { opacity: 0, y: -50 }, 
    { opacity: 1, y: 0, duration: 0.5 }
  );

  btn.textContent = "Close"; // Change le texte en "Close"
  $(btn).addClass("active");
  $("#infoBtn").removeClass("active");
}

// Fonction pour fermer la modal avec animation
function closeModal() {
  btn.textContent = "Work"; // Remet le texte du bouton à "Work"
  $(btn).removeClass("active");
  $("#infoBtn").addClass("active");
  gsap.to(modalContent, {
    opacity: 0,
    y: 50,
    duration: 0.5,
    
    onComplete: function() {
      gsap.to(modal, { opacity: 0, duration: 0.5, onComplete: function() {
        gsap.set(modal, { visibility: "hidden" }); // Cache la modal après l'animation
        enableScrollTriggers(); // Réactive ScrollTrigger
      }});
    }
  });
}

// Gérer le clic sur le bouton (ouvre ou ferme la modal)
btn.onclick = function() {
  if (gsap.getProperty(modal, "visibility") === "visible") {
    closeModal(); // Ferme si déjà ouvert
  } else {
    openModal(); // Ouvre sinon
  }
}

/*
// Fermer la modal si l'utilisateur clique en dehors
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}
*/


// Récupérer les slides du carousel
var getSlides = document.querySelectorAll(".carousel .slide");

// Vérifier si des slides existent avant de procéder
if (getSlides.length > 0) {
  var slidesData = Array.from(getSlides).map(slide => {
    return {
      title: slide.querySelector(".project-title-hidden").textContent,
      link: slide.querySelector("a").getAttribute("href"), // Récupère le lien <a>
      image: slide.querySelector("img") ? slide.querySelector("img").src : ""  // Récupère l'URL de l'image
    };
  });

  // Sauvegarde des données dans localStorage
  localStorage.setItem("numberOfSlides", getSlides.length);  // Sauvegarde du nombre de slides
  localStorage.setItem("slidesData", JSON.stringify(slidesData));  // Sauvegarde des titres, liens et images
}

// Récupère le nombre de slides et les données (titres, liens, et images) depuis le localStorage
var numberOfSlides = localStorage.getItem("numberOfSlides");
var slidesData = JSON.parse(localStorage.getItem("slidesData"));

// Sélectionne le conteneur de la modal où tu veux ajouter les éléments
var modalContent = document.querySelector(".modal-content");

// Vérifie si les données sont présentes
if (numberOfSlides && slidesData) {
  // Crée dynamiquement un élément pour chaque slide dans la modal
  slidesData.forEach(function(slide, index) {
    // Crée un conteneur pour chaque élément de la modal
    var newSlide = document.createElement("div");
    newSlide.classList.add("modal-slide");

    // Créer l'élément numéro avec format (01), (02), ...
    var slideNumber = document.createElement("span");
    slideNumber.classList.add("modal-slide-number");
    
    // Formater le numéro pour qu'il soit sous la forme (01), (02), ...
    var formattedNumber = String(index + 1).padStart(2, '0');  // Ajoute un zéro devant les numéros inférieurs à 10
    slideNumber.textContent = `(${formattedNumber})`; // Format final avec parenthèses

    // Ajoute le lien et le titre du projet dans le nouvel élément
    newSlide.innerHTML = `<a href="${slide.link}" class="modalSlide-link">${slide.title}</a>`;

    // Créer le lien "See Project"
    var seeProjectLink = document.createElement("a");
    seeProjectLink.classList.add("see-project-link");
    seeProjectLink.href = slide.link;  // Lien du projet
    seeProjectLink.textContent = "See Project";  // Texte du lien

    // Créer l'élément pour l'image du projet (initialement cachée)
    var projectImage = document.createElement("img");
    projectImage.classList.add("project-image");
    projectImage.src = slide.image; // Assurer que chaque objet slide contient l'URL de l'image
    projectImage.style.position = "absolute"; // Image flottante
    projectImage.style.pointerEvents = "none"; // Pour que l'image ne bloque pas d'autres éléments
    projectImage.style.visibility = "hidden"; // L'image est cachée au départ
    projectImage.style.opacity = "0"; // Opacité à 0 pour la rendre invisible
    projectImage.style.transition = "opacity 0.1s ease-in-out, visibility 0s ease-in-out 0.1s"; // Animation pour l'opacité et visibilité

    // Ajouter l'image à la modal
    modalContent.appendChild(projectImage);

    // Ajouter un événement mouseover pour afficher l'image lorsque la souris passe sur le titre
    newSlide.querySelector('.modalSlide-link').addEventListener("mouseover", function() {
      gsap.to(projectImage, { 
        opacity: 1,          // Afficher l'image avec une transition d'opacité
        visibility: "visible", // Rendre l'image visible
        duration: 0.1       // Durée de l'animation
      });
    });

    // Ajouter un événement mouseout pour masquer l'image lorsque la souris quitte
    newSlide.querySelector('.modalSlide-link').addEventListener("mouseout", function() {
      gsap.to(projectImage, { 
        opacity: 0,          // Masquer l'image avec une transition d'opacité
        visibility: "hidden", // Rendre l'image invisible
        duration: 0.1       // Durée de l'animation
      });
    });

    // Ajouter un événement mousemove pour déplacer l'image avec le curseur
    newSlide.querySelector('.modalSlide-link').addEventListener("mousemove", function(event) {
      var mouseX = event.pageX + -100; // Décale légèrement l'image par rapport au curseur
      var mouseY = event.pageY + -100; // Décale légèrement l'image par rapport au curseur
      projectImage.style.left = mouseX + "px";
      projectImage.style.top = mouseY + "px";
    });

    // Appliquer une animation GSAP pour changer la couleur de fond et du texte au survol
    newSlide.addEventListener("mouseenter", function() {
      gsap.to(newSlide, {
        backgroundColor: "#000",   // Fond noir
        color: "#fff",             // Texte en blanc
        duration: 0.3              // Durée de l'animation
      });

      // Animer le lien à l'intérieur de la slide
      var link = newSlide.querySelector('.modalSlide-link');
      if (link) {
        gsap.to(link, {
          color: "#fff",            // Texte du lien en blanc
          duration: 0.3
        });
      }
      // Animer le lien à l'intérieur de la slide
      var linkProject = newSlide.querySelector('.see-project-link');
      if (linkProject) {
        gsap.to(linkProject, {
          color: "#fff",            // Texte du lien en blanc
          duration: 0.3
        });
      }
    });

    newSlide.addEventListener("mouseleave", function() {
      gsap.to(newSlide, {
        backgroundColor: "",       // Rétablir le fond
        color: "",                 // Rétablir la couleur du texte
        duration: 0.3              // Durée de l'animation
      });

      // Réinitialiser la couleur du lien à l'état initial
      var link = newSlide.querySelector('.modalSlide-link');
      if (link) {
        gsap.to(link, {
          color: "",                // Réinitialise la couleur du lien
          duration: 0.3
        });
      }
      // Animer le lien à l'intérieur de la slide
      var linkProject = newSlide.querySelector('.see-project-link');
      if (linkProject) {
        gsap.to(linkProject, {
          color: "",            // Texte du lien en blanc
          duration: 0.3
        });
      }
    });

    // Ajouter le numéro avant ou après le titre (selon ta préférence)
    newSlide.prepend(slideNumber); // Tu peux aussi utiliser `appendChild(slideNumber)` selon où tu veux le placer

    // Ajouter le lien "See Project" à la fin de chaque slide
    newSlide.appendChild(seeProjectLink);

    // Ajoute ce nouvel élément à la modal
    modalContent.appendChild(newSlide);
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



$(document).ready(function() {

// Add class to mailto link
// Needed to separate the disabling of the default action AND copy email to clipboard
$('a[href^=mailto]').addClass('mailto-link');

var mailto = $('.mailto-link');
var messageCopy = 'hello@antoinecorniere.com';
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



// PROJECT JS VIDEO 

// Variable globale pour le player YouTube
var player;

// Chargement de l'API YouTube
function onYouTubePlayerAPIReady() {
    player = new YT.Player("video", {
        events: {
            onReady: onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    var playButton = document.getElementById("btnplay");
    var thumbnail = document.getElementById("thumbnail");

    // Ajouter l'image de la thumbnail
    var thumbnailImage = thumbnail.getAttribute("data-thumbnail");
    if (thumbnailImage) {
        thumbnail.style.backgroundImage = "url('" + thumbnailImage + "')";
    }

    if (playButton) {
        playButton.addEventListener("click", function () {
            // Jouer la vidéo immédiatement
            player.playVideo();

            // Masquer la thumbnail en douceur
            thumbnail.style.opacity = "0";
            setTimeout(() => { thumbnail.style.display = "none"; }, 500);
        });
    } else {
        console.error('Play button not found!');
    }
}

// Injection du script YouTube API
var tag = document.createElement("script");
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

