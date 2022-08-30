



$(function(){
    $(".Vlinks").click(function(){
      $("#modal").fadeIn();
      $(".close__video").addClass('is-appear');
      $('body').addClass('stop-scrolling');
      $('body').bind('touchmove', function(e){e.preventDefault()});

    });
    $("#modal .closeV").click(function(){
      $("#modal").fadeOut();
      $("#mainVid").attr("src", "");
      $('body').removeClass('stop-scrolling');
      $('body').unbind('touchmove');

    });
});




$("#email").click(function() {

    if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById("email"));
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById("email"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
    document.execCommand("copy");

    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    }
    else if (document.selection) {
        document.selection.empty();
    }

    var posEmailX = $("#email").offset().left;
    var posEmailY = $("#email").offset().top;
    var emailHeight = $("#email").height();
    let emailContent = document.getElementById("email").innerHTML;

    document.getElementById("email").innerHTML = "Email copied to clipboard";

    setTimeout(function(){
        document.getElementById("email").innerHTML = "antoinecorniere.pro@gmail.com";
    }, 1200);
});
