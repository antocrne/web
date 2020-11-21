$(document).ready(function() {
  $("#back__nav").animate({
    opacity: 1,
    left: "0px",
  });

  $(".about__picture").delay(50).animate({
    opacity: 1,
    top: "0",
  }, 500);

  $(".about__title").delay(100).animate({
    opacity: 1,
    top: "0",
  }, 500);
  $(".info__txt").delay(120).animate({
    opacity: 1,
    top: "0",
  }, 500);

  $("#contact").delay(140).animate({
    opacity: 1,
    top: "0",
  }, 500);

  $(".social").delay(160).animate({
    opacity: 1,
    top: "0",
  }, 500);
});



// Modal Video

$(document).ready(function() {
  $('.video-thumb').click(function() {
    var src = $(this).find('img').attr('src');
    $('.overlay-video').css('backgroundImage', 'url(' + src + ')');

  })


  /* Toggle Video Modal
  -----------------------------------------*/
  function toggle_video_modal() {

    // Click on video thumbnail or link
    $(".js-trigger-video-modal").on("click", function(e) {

      // prevent default behavior for a-tags, button tags, etc.
      e.preventDefault();

      // Grab the video ID from the element clicked
      var id = $(this).attr('data-youtube-id');

      // Autoplay when the modal appears
      // Note: this is intetnionally disabled on most mobile devices
      // If critical on mobile, then some alternate method is needed
      var autoplay = '?autoplay=1';

      // Don't show the 'Related Videos' view when the video ends
      var related_no = '&rel=0';

      // String the ID and param variables together
      var src = 'https://www.youtube.com/embed/' + id;

      // Pass the YouTube video ID into the iframe template...
      // Set the source on the iframe to match the video ID
      $("#youtube").attr('src', src);

      // Add class to the body to visually reveal the modal
      $("body").addClass("show-video-modal noscroll");

    });

    // Close and Reset the Video Modal
    function close_video_modal() {

      event.preventDefault();

      // re-hide the video modal
      $("body").removeClass("show-video-modal noscroll");

      // reset the source attribute for the iframe template, kills the video
      $("#youtube").attr('src', '');

    }
    // if the 'close' button/element, or the overlay are clicked
    $('body').on('click', '.close-video-modal, .video-modal .overlay', function(event) {

      // call the close and reset function
      close_video_modal();

    });
    // if the ESC key is tapped
    $('body').keyup(function(e) {
      // ESC key maps to keycode `27`
      if (e.keyCode == 27) {

        // call the close and reset function
        close_video_modal();

      }
    });
  }
  toggle_video_modal();



});

//Animation



$("#home").mouseenter(function() {
  $("#bg-works").removeClass("is-active");
});

$("#works").mouseover(function() {
  $("#bg-works").addClass("is-active");
});

$("#works").mouseenter(function() {
  $("#bg-works").addClass("is-active");
  $("#bg-films").removeClass("is-active");
});

$("#films").mouseenter(function() {
  $("#bg-films").addClass("is-active");
  $("#bg-works").removeClass("is-active");
  $("#bg-photos").removeClass("is-active");
});

$("#photos").mouseenter(function() {
  $("#bg-photos").addClass("is-active");
  $("#bg-films").removeClass("is-active");
});





$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 1000, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});
