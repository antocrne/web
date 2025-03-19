gsap.registerPlugin(ScrollTrigger);

// Sélectionne le container du carousel
const container = document.querySelector(".carousel");
const slides = document.querySelectorAll(".slide");
const totalHeight = container.scrollHeight; // Hauteur totale du carousel
const totalWidth = container.scrollWidth;   // Largeur totale du carousel

// Vérifie si l'écran est de type mobile
const isMobile = window.innerWidth <= 768;

if (isMobile) {
  // Animation verticale pour les écrans mobiles
  gsap.to(container, {
    y: () => -totalHeight + window.innerHeight, // Déplace le container sur toute la hauteur
    ease: "none",
    scrollTrigger: {
      trigger: ".scroll-container",
      start: "top top",
      end: () => `+=${totalHeight}`, // L'animation se termine à la fin de la hauteur du contenu
      scrub: 1,
      pin: true,
    },
  });
} else {
  // Animation horizontale pour les écrans plus larges
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

// Effet de Parallax sur les images dans les slides
slides.forEach((slide) => {
  gsap.to(slide.querySelector("img"), {
    y: 30,  // Décalage vertical
    scale: 1.1, // Légère augmentation de la taille de l'image
    scrollTrigger: {
      trigger: slide,
      start: isMobile ? "top bottom" : "left center",
      end: isMobile ? "bottom top" : "right center",
      scrub: 1.05,
    },
  });

  // Effet parallaxe sur le titre des projets
  gsap.to(slide.querySelector(".project-title-hidden"), {
    y: 30, // Décalage vertical du titre
    opacity: 1, // Appliquer l'opacité pour un effet d'apparition
    scrollTrigger: {
      trigger: slide,
      start: isMobile ? "top bottom" : "left center",
      end: isMobile ? "bottom top" : "right center",
      scrub: 1.05,
    },
  });
});

// Sélectionne les éléments de l'image dans le carousel pour appliquer l'effet hover
slides.forEach((slide) => {
  const imageWrapper = slide.querySelector(".image-wrapper"); // Utilisation du conteneur
  const img = slide.querySelector("img");

  // Animation hover au survol du conteneur de l'image
  imageWrapper.addEventListener("mouseenter", () => {
    gsap.to(imageWrapper, {
      y: -50, // Déplace le conteneur vers le haut
      duration: 0.3, 
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  // Retour à la position originale lorsque la souris quitte le conteneur
  imageWrapper.addEventListener("mouseleave", () => {
    gsap.to(imageWrapper, {
      y: 0, // Réinitialise la position
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
  
    // Quand on survole un projet
    imageWrapper.addEventListener('mouseenter', () => {
      // Récupérer le titre de la div cachée
      const title = titleHidden.textContent;
  
      // Afficher le titre dans le conteneur prévu
      titleDisplay.textContent = title;
  
      // Afficher le conteneur avec une animation
      titleDisplay.classList.add('show');
    });
  
    // Quand on quitte le survol
    imageWrapper.addEventListener('mouseleave', () => {
      // Cacher le conteneur avec le titre
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
  
    window.addEventListener("scroll", () => {
      // Récupérer la position actuelle du scroll
      const scrollY = window.scrollY;
      
      // Définir l'opacité du titre en fonction de la position du scroll
      // Plus la page défile, plus l'opacité diminue (disparaît)
      const opacity = 1 - (scrollY / 500); // Ajuster 500 pour contrôler la vitesse de disparition
      
      // Si le scroll dépasse une certaine valeur, on cache le titre complètement
      mainTitle.style.opacity = opacity > 0 ? opacity : 0; // Empêche l'opacité d'aller en dessous de 0
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
