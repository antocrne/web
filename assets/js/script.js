
// ======================================================
// 1. HOMEPAGE (Slider / Backgrounds / Clics)
// ======================================================
const titleItems = document.querySelectorAll('.title-item');
const backgrounds = document.querySelectorAll('.background');

if (titleItems.length > 0) {
    const isMobile = window.innerWidth <= 768;

    // --- FONCTION DE REDIRECTION COMMUNE ---
    const goToActiveProject = () => {
        const activeItem = document.querySelector('.title-item.active, .title-item.active-slide');
        if (activeItem) {
            const link = activeItem.querySelector('a');
            if (link) window.location.href = link.href;
        }
    };

    if (isMobile) {
        // === MOBILE: Slider + Pagination ===
        let currentSlide = 0;
        const totalSlides = titleItems.length;
        let touchStartY = 0;

        const pagination = document.createElement('div');
        pagination.className = 'pagination';
        pagination.style.display = 'flex'; 
        pagination.innerHTML = `
            <span class="current">1</span>
            <span class="separator"></span>
            <span class="total">${totalSlides}</span>
        `;
        document.body.appendChild(pagination);

        function goToSlide(index) {
            if (index < 0 || index >= totalSlides) return;
            currentSlide = index;

            titleItems.forEach((item, i) => {
                item.classList.toggle('active-slide', i === index);
                item.classList.toggle('active', i === index);
            });

            // ✅ AJOUT : met à jour l'image de fond selon le data-bg du titre actif
            const bgId = titleItems[index].getAttribute('data-bg');
            backgrounds.forEach(bg => {
                bg.classList.toggle('active', bg.id === bgId);
                bg.classList.toggle('inactive', bg.id !== bgId);
            });

            pagination.querySelector('.current').textContent = currentSlide + 1;
        }

        // Swipe Logic
        document.addEventListener('touchstart', e => touchStartY = e.touches[0].clientY);
        document.addEventListener('touchend', e => {
            const diff = touchStartY - e.changedTouches[0].clientY;
            if (Math.abs(diff) > 50) {
                diff > 0 ? goToSlide(currentSlide + 1) : goToSlide(currentSlide - 1);
            }
        });

        goToSlide(0);

    } else {
        // === DESKTOP: Hover ===
        titleItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const bgId = this.getAttribute('data-bg');
                backgrounds.forEach(bg => {
                    bg.classList.toggle('active', bg.id === bgId);
                    bg.classList.toggle('inactive', bg.id !== bgId);
                });
                titleItems.forEach(t => t.classList.toggle('active', t === item));
            });
        });
    }

    // === LE CLIC GLOBAL (Background cliquable) ===
    document.addEventListener('click', (e) => {
        const isMenu = e.target.closest('nav');
        const isLink = e.target.tagName === 'A' || e.target.closest('a');
        
        if (!isMenu && !isLink) {
            goToActiveProject();
        }
    });

    // Resize propre
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            location.reload();
        }, 250);
    });
}
/*
// ======================================================
// 2. PLAYER YOUTUBE (Projets) CUSTOM
// ======================================================
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
let isPlayerReady = false;
let timer;
let updateInterval;

const container = document.querySelector(".container");
const playPauseBtn = document.querySelector(".play-pause i");
const videoTimeline = document.querySelector(".video-timeline");
const progressBar = document.querySelector(".progress-bar");
const volumeBtn = document.querySelector(".volume i");
const currentVidTime = document.querySelector(".current-time");
const fullScreenBtn = document.querySelector(".fullscreen i");
const shield = document.querySelector(".video-shield");
const videoPreview = document.querySelector(".video-preview");

const videoContainer = document.getElementById('youtube-player');
const videoId = videoContainer ? videoContainer.getAttribute('data-video-id') : null;
const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function onYouTubeIframeAPIReady() {
    if (!videoId) return;
    
    player = new YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
            'controls': isMobileDevice ? 1 : 0,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0,
            'iv_load_policy': 3,
            'playsinline': 1,
            'fs': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady() { 
    isPlayerReady = true;
    console.log('Player prêt !');
}

function onPlayerStateChange(event) {
    if (!isMobileDevice && playPauseBtn) {
        if (event.data == YT.PlayerState.PLAYING) {
            playPauseBtn.classList.replace("fa-play", "fa-pause");
            if(shield) shield.classList.add("active-yt");
            startUpdateInterval();
            hideControls();
        } else {
            playPauseBtn.classList.replace("fa-pause", "fa-play");
            if(shield) shield.classList.remove("active-yt");
            stopUpdateInterval();
        }
    }
}

// ═══════════════════════════════════════════════════════
// CONTRÔLES DESKTOP
// ═══════════════════════════════════════════════════════

if (!isMobileDevice && container) {
    
    //GESTION DE LA PREVIEW
    if (videoPreview) {
        videoPreview.addEventListener('click', () => {
            if (!isPlayerReady) return;
            
            videoPreview.classList.add('hidden');
            setTimeout(() => {
                videoPreview.style.display = 'none';
            }, 1500);
            
            player.playVideo();
        });
    }

    // Shield & Mousemove
    if(shield) {
        shield.addEventListener("click", () => { 
            if (!isPlayerReady) return;
            player.pauseVideo(); 
        });
        
        shield.addEventListener("mousemove", () => {
            container.classList.add("show-controls");
            clearTimeout(timer);
            hideControls();   
        });
    }

    function startUpdateInterval() {
        updateInterval = setInterval(() => {
            if (player && player.getCurrentTime) {
                const currentTime = player.getCurrentTime();
                const duration = player.getDuration();
                progressBar.style.width = `${(currentTime / duration) * 100}%`;
                currentVidTime.innerText = formatTime(currentTime);
            }
        }, 100);
    }

    function stopUpdateInterval() { 
        clearInterval(updateInterval); 
    }

    const formatTime = time => {
        let m = Math.floor(time / 60);
        let s = Math.floor(time % 60);
        return `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
    }

    const hideControls = () => {
        if (!player || player.getPlayerState() !== YT.PlayerState.PLAYING) return;
        timer = setTimeout(() => { 
            container.classList.remove("show-controls"); 
        }, 3000);
    }

    container.addEventListener("mousemove", () => {
        container.classList.add("show-controls");
        clearTimeout(timer);
        hideControls();   
    });

    //PLAY/PAUSE avec gestion de la preview
    document.querySelector('.play-pause')?.addEventListener("click", () => {
        if (!isPlayerReady) return;
        
        // Cache la preview si visible
        if (videoPreview && !videoPreview.classList.contains('hidden')) {
            videoPreview.classList.add('hidden');
            setTimeout(() => {
                videoPreview.style.display = 'none';
            }, 1500);
        }
        
        player.getPlayerState() === YT.PlayerState.PLAYING ? player.pauseVideo() : player.playVideo();
    });

    //VOLUME
    document.querySelector('.volume')?.addEventListener("click", () => {
        if (!isPlayerReady) return;
        if (player.isMuted()) {
            player.unMute();
            volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
        } else {
            player.mute();
            volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
        }
    });

    // TIMELINE INTERACTIVE
    if (videoTimeline) {
        // Clic sur timeline
        videoTimeline.addEventListener("click", e => {
            if (!player || !player.getDuration) return;
            let timelineWidth = videoTimeline.clientWidth;
            let newTime = (e.offsetX / timelineWidth) * player.getDuration();
            player.seekTo(newTime, true);
        });

        // Drag sur timeline
        const draggableProgressBar = e => {
            let timelineWidth = videoTimeline.clientWidth;
            let newTime = (e.offsetX / timelineWidth) * player.getDuration();
            player.seekTo(newTime, true);
        }

        videoTimeline.addEventListener("mousedown", () => {
            videoTimeline.addEventListener("mousemove", draggableProgressBar);
        });
        
        document.addEventListener("mouseup", () => {
            videoTimeline.removeEventListener("mousemove", draggableProgressBar);
        });
    }

    // FULLSCREEN
    document.querySelector('.fullscreen')?.addEventListener("click", () => {
        if (!isPlayerReady) return;
        
        container.classList.toggle("fullscreen");
        
        if (document.fullscreenElement) {
            fullScreenBtn.classList.replace("fa-down-left-and-up-right-to-center", "fa-up-right-and-down-left-from-center");
            document.exitFullscreen();
        } else {
            fullScreenBtn.classList.replace("fa-up-right-and-down-left-from-center", "fa-down-left-and-up-right-to-center");
            container.requestFullscreen();
        }
    });

    // Gestion touche ÉCHAP pour fullscreen
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            container.classList.remove('fullscreen');
            if (fullScreenBtn) {
                fullScreenBtn.classList.replace("fa-down-left-and-up-right-to-center", "fa-up-right-and-down-left-from-center");
            }
        }
    });

    // CONTRÔLES CLAVIER
    document.addEventListener('keydown', (e) => {
        if (!isPlayerReady) return;
        
        // Espace = Play/Pause
        if (e.keyCode === 32) {
            e.preventDefault();
            
            if (videoPreview && !videoPreview.classList.contains('hidden')) {
                videoPreview.classList.add('hidden');
            }
            
            player.getPlayerState() === YT.PlayerState.PLAYING ? player.pauseVideo() : player.playVideo();
        }
        
        // Flèche gauche = -5 secondes
        if (e.keyCode === 37) {
            e.preventDefault();
            player.seekTo(Math.max(0, player.getCurrentTime() - 5), true);
        }
        
        // Flèche droite = +5 secondes
        if (e.keyCode === 39) {
            e.preventDefault();
            player.seekTo(Math.min(player.getDuration(), player.getCurrentTime() + 5), true);
        }
    });
}

// ═══════════════════════════════════════════════════════
// MOBILE : Preview uniquement
// ═══════════════════════════════════════════════════════

if (isMobileDevice && videoPreview) {
    videoPreview.addEventListener('click', () => {
        if (!isPlayerReady) return;
        
        videoPreview.classList.add('hidden');
        setTimeout(() => {
            videoPreview.style.display = 'none';
        }, 1500);
        
        player.playVideo();
    });
}
*/


// ═══════════════════════════════════════════════════════
// PLAYER YOUTUBE SIMPLE AVEC PREVIEW
// ═══════════════════════════════════════════════════════

// Vérifier si on est sur une page avec vidéo
const videoContainer = document.getElementById('youtube-player');

if (videoContainer) {
    // Charger l'API YouTube
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let player;
    let isPlayerReady = false;

    const videoPreview = document.querySelector(".video-preview");
    const videoId = videoContainer.getAttribute('data-video-id');

    // Initialiser le player YouTube
    window.onYouTubeIframeAPIReady = function() {
        if (!videoId) {
            console.error('Aucun ID vidéo trouvé !');
            return;
        }
        
        player = new YT.Player('youtube-player', {
            height: '100%',
            width: '100%',
            videoId: videoId,
            playerVars: {
                'controls': 1,          // Contrôles YouTube natifs
                'modestbranding': 1,    // Réduit le branding YouTube
                'rel': 0,               // Pas de vidéos suggérées
                'showinfo': 0,          // Cache les infos
                'playsinline': 1,       // Lecture inline sur mobile
                'fs': 1                 // Fullscreen activé
            },
            events: {
                'onReady': onPlayerReady
            }
        });
    }

    function onPlayerReady() {
        isPlayerReady = true;
        console.log('Player YouTube prêt avec la vidéo:', videoId);
    }

    // Gestion du clic sur la preview
    if (videoPreview) {
        videoPreview.addEventListener('click', () => {
            if (!isPlayerReady) {
                console.log('Player pas encore prêt...');
                return;
            }
            
            // Cache la preview avec fondu
            videoPreview.classList.add('hidden');
            
            // Retire complètement après l'animation
            setTimeout(() => {
                videoPreview.style.display = 'none';
            }, 1500);
            
            // Lance la vidéo
            player.playVideo();
        });
    }
}

// ======================================================
// 3. SYSTÈME DE TRADUCTION (i18n)
// ======================================================

const translations = {
    fr: {
        nav_work: "Projets",
        nav_info: "Info",
        project_norway: "Norvège — Sony FX2",
        project_canon: "Camara — Canon R6 Mark III",
        project_japan: "Le Japon à travers mes yeux",
        project_archives: "Archives",
        description_norway: `<a href="https://www.stevenrsl.eu/" target="_blank" class="ext-link">Steven</a> et moi sommes partis pour les îles Lofoten, en Norvège, afin de tester les limites du Sony FX2. Face à des paysages à couper le souffle et à une lumière arctique changeante, nous voulions découvrir le véritable potentiel de cet appareil, et il nous a bluffés. Des aurores boréales aux fjords dramatiques, le FX2 a saisi chaque instant avec une clarté et une profondeur saisissantes.`,
        description_canon: `Pour célébrer le lancement du nouveau Canon R6 Mark III, Camara France a demandé à <a href="https://www.mxhpics.com/" target="_blank" class="ext-link">Maxime Horlaville</a> et <a href="https://www.stevenrsl.eu" target="_blank" class="ext-link">Steven Roussel</a> de mettre cet appareil révolutionnaire à l'épreuve. J'ai eu l'opportunité de collaborer à ce projet en tant que monteur vidéo, contribuant ainsi à mettre en valeur les capacités exceptionnelles de ce dispositif de pointe.`,
        description_japan: `Ce voyage au Japon était un rêve d’enfance que j’ai enfin réalisé. Entre des paysages à couper le souffle, des rencontres inoubliables et une culture fascinante, je vous emmène à ma découverte d’un pays qui m’a profondément ému. 🌸🎌 <br><br> Cette vidéo mêle séquences cinématographiques, souvenirs marquants, instants authentiques partagés avec les habitants et une exploration entre modernité et tradition.`,
        info_txt1: `Hello ! 👋🏻 Je m'appelle Antoine Cornière, réalisateur et photographe français 🇫🇷. Passionné par l'art de donner vie aux histoires à travers la vidéo, j'explore constamment de nouvelles idées et techniques pour perfectionner mon travail. Pour moi, le storytelling repose sur la connexion humaine, le partage d'expériences et la capacité à inspirer.`,
        info_txt2: `J'aime fusionner différents styles visuels, de la vidéo à la photographie, pour créer quelque chose de frais et d'unique. Que ce soit à travers une prise de vue esthétique ou la fluidité d'un montage, je crois au pouvoir du récit pour inspirer et faire rêver. Mon approche consiste à construire des histoires fluides et naturelles, où la forme s'efface pour laisser toute la place au message.`,
        description_nantais: `Imaginez votre pause déjeuner avec vue, entouré de tables de pique-nique au bord d'un lac, un après-work animé par des jeux en plein air et un marché mettant en valeur des créateurs locaux sur fond de musique live… Bienvenue aux « Nantais » ! <a href="https://www.stevenrsl.eu" target="_blank" class="ext-link">Steven Roussel</a> et moi assurons la couverture photo et vidéo de cette guinguette. Notre mission : partager la programmation et mettre en avant l'ambiance conviviale et détendue des événements sur les réseaux sociaux…`,
        error: `Cette page n'existe pas.`,
        error_back: `Retournez à l'accueil.`
    },
    en: {
        nav_work: "Work",
        nav_info: "Info",
        project_norway: "Norway — Sony FX2",
        project_canon: "Camara — Canon R6 Mark III",
        project_japan: "Japan Through My Eyes",
        project_archives: "Archives",
        description_norway: `<a href="https://www.stevenrsl.eu/" target="_blank" class="ext-link">Steven</a> and I headed to Norway's Lofoten Islands to put the Sony FX2 through its paces. With jaw-dropping landscapes and ever-changing Arctic light, we wanted to see what this camera could truly deliver and it blew us away. From the Northern Lights to dramatic fjords, the FX2 captured every moment with stunning clarity and depth.`,
        description_canon: `To celebrate the launch of the new Canon R6 Mark III, Camara France asked <a href="https://www.mxhpics.com/" target="_blank" class="ext-link">Maxime Horlaville</a> and <a href="https://www.stevenrsl.eu" target="_blank" class="ext-link">Steven Roussel</a> to put this groundbreaking camera to the test. I had the opportunity to collaborate on this project as the video editor, helping showcase the exceptional capabilities of this cutting-edge device.`,
        description_japan: `This trip to Japan was a childhood dream that I finally made a reality. Between amazing landscapes, unforgettable encounters, and a fascinating culture, I’m taking you through my eyes to discover a country that truly moved me. 🌸🎌 <br> <br> This video combines cinematic sequences with meaningful memories, authentic moments with locals, and an exploration between modernity and tradition.`,
        info_txt1: `Hello there! 👋🏻 I’m Antoine Cornière, a French 🇫🇷 Filmmaker & Photographer. I’m passionate about bringing stories to life through video, and I’m always experimenting with new ideas and techniques to make my work even better. For me, storytelling is all about connecting with people, sharing experiences, and sparking inspiration.`,
        info_txt2: `I love mixing different visual styles, from film to photography, to create something fresh and unique. Whether it’s through a beautiful shot or the way an edit flows, I believe in the power of storytelling to inspire and make people dream. My approach is all about creating smooth, seamless stories that feel natural and effortless, so the focus is always on the message, not the medium.`,
        description_nantais: `Imagine your lunch break with a view, surrounded by picnic tables around a lake, an afterwork gathering with outdoor games and a market featuring local creators with live music… Welcome to “Les Nantais” ! <a href="https://www.stevenrsl.eu" target="_blank" class="ext-link">Steven Roussel</a> and I provide and create photos and videos around the guinguette. Share the planning, showcase the fun and relaxed atmosphere of events on social media…`,
        error: `This page does not exist.`,
        error_back: `Return to home page`
    }
};

function getLang() {
    return localStorage.getItem('lang') || 'en';
}

function applyTranslations() {
    const lang = getLang();
    const t = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerHTML = t[key]; // ← innerHTML au lieu de textContent
    });

    const btn = document.getElementById('lang-switcher');
    if (btn) btn.textContent = lang === 'fr' ? 'EN' : 'FR';

    document.documentElement.lang = lang;
}


const langBtn = document.getElementById('lang-switcher');
if (langBtn) {
    langBtn.addEventListener('click', () => {
        const newLang = getLang() === 'fr' ? 'en' : 'fr';
        localStorage.setItem('lang', newLang);
        applyTranslations();
    });
}



applyTranslations();