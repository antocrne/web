gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector(".carousel");
const slides = document.querySelectorAll(".slide");
const totalWidth = container.scrollWidth;

// Animation pour le déplacement du carousel
gsap.to(container, {
  x: () => -totalWidth + window.innerWidth,
  ease: "none",
  scrollTrigger: {
    trigger: ".scroll-container",
    start: "top top",
    end: () => `+=${totalWidth}`,
    scrub: 1,
    pin: true,
  },
});


// Effet de Parallax sur les images dans les slides
slides.forEach((slide) => {
    gsap.to(slide.querySelector("img"), {
      y: 50,  // Décalage vertical
      scale: 1.1, // Légère augmentation de la taille de l'image
      scrollTrigger: {
        trigger: slide,
        start: "left center",
        end: "right center",
        scrub: 1.2,
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
