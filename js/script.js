$(document).ready(function () {
    gsap.from("#brand", {x: -150, opacity: 0, duration: 1, delay: 0.4});
    gsap.from("#title__bar", {width: 0, opacity: 0, duration: 1.2, delay: 1, ease: "power2"});
    gsap.from("#menu1", { opacity: 0, duration: 1, delay: 1.2, y: 50, ease: "power2"});
    gsap.from("#menu2", { opacity: 0, duration: 1, delay: 1.4, y: 50, ease: "power2"});
    gsap.from("#menu3", { opacity: 0, duration: 1, delay: 1.6, y: 50, ease: "power2"});
    gsap.from("#menu4", { opacity: 0, duration: 1, delay: 1.8, y: 50, ease: "power2"});
    gsap.from("#foot", {x: 150, opacity: 0, duration: 1, delay: 0.4});
});

$(document).ready(function () {
    gsap.from("#nav1", { opacity: 0, duration: 1, delay: 0.4, y: -50, ease: "power2"});
    gsap.from("#nav2", { opacity: 0, duration: 1, delay: 0.6, y: -50, ease: "power2"});
    gsap.from("#nav3", { opacity: 0, duration: 1, delay: 0.8, y: -50, ease: "power2"});
    gsap.from("#contact", { opacity: 0, duration: 1.2, delay: 1,  ease: "power2"});
    gsap.from("#s1", { opacity: 0, duration: 1, delay: 1.2, y: 50, ease: "power2"});
    gsap.from("#s2", { opacity: 0, duration: 1, delay: 1.4, y: 50, ease: "power2"});
    gsap.from("#s3", { opacity: 0, duration: 1, delay: 1.6, y: 50, ease: "power2"});
});

$(document).ready(function () {
    gsap.from(".info__title", {y: -50, opacity: 0, duration: 1.5, delay: 0.2,ease:"power3"});
    gsap.from(".info__txt", { opacity: 0, duration: 2.5, delay: 0.8,ease:"power3"});
    gsap.from(".info__img", {y: 350, opacity: 0, duration: 2, delay: 1.5,ease:"power3"});
    gsap.from(".photo-copy", {y: 350, opacity: 0, duration: 2, delay: 1.8,ease:"power3"});

});

$(document).ready(function () {
    gsap.from(".menu__photo", {y: 50, opacity: 0, duration: 1.5, delay: 0.6,ease:"power3"});
    gsap.from("#work__photo", {y: 50, opacity: 0, duration: 1.5, delay: 0.6,ease:"power3"});
    gsap.from("#film__photo", {y: 50, opacity: 0, duration: 1.5, delay: 0.6,ease:"power3"});

});

$(document).ready(function () {
    gsap.from(".video__block", {y: 50, opacity: 0, duration: 1.5, delay: 0.2,ease:"power3"});
});


$(".menu__link").mouseenter(function () {
    if ($(this).parent('.menu__div').children('div.image').length) {
        $(this).parent('.menu__div').children('div.image').show();
    } else {
        var image_name = $(this).data('image');
        var imageTag = '<div class="image" style="position:absolute;">' + '<img src="' + image_name + '" alt="image" class="img_hover" />' + '</div>';
        $(this).parent('div').append(imageTag);
    }
});

$(".menu__link").mouseleave(function () {
    $(this).parent('div').children('div.image').hide();
});

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

// hover Image

var hoverDistort = new hoverEffect({
    parent: document.querySelector('#wrapper-1'),
    intensity: 0.6,
    imagesRatio: 1080 / 720,
    angle1: Math.PI / 2,
    angle2: -Math.PI / 2,
    image1: './img/Archi-2.jpg',
    image2: './img/Emma-min.jpg',
    displacementImage: './img/displace/relief3.png',

});

var hoverDistort = new hoverEffect({
    parent: document.querySelector('#wrapper-2'),
    intensity: 0.6,
    imagesRatio: 720 / 1080,
    angle1: Math.PI / 4,
    angle2: -Math.PI / 2,
    image1: './img/Kiss.jpg',
    image2: './img/film-photo/007_7-min.JPG',
    displacementImage: './img/displace/relief3.png',

});


