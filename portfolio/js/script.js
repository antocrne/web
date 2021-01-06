
/*

$(".fv_explore").click(function(link_work){


  
   setTimeout(function () {
              window.location.href = "work.html"; 
    }, 1500);      
});

*/






var text = new Blotter.Text("Filmmaker & Photographer", {
  family : "'Orpheus pro', sans-serif",
  size : 50,
  fill : "#f0f0f0",
  weight: 400,
  paddingLeft : 40,
  paddingRight : 40
});



var material = new Blotter.LiquidDistortMaterial();

material.uniforms.uSpeed.value = 0.3;
material.uniforms.uVolatility.value = 0.03;



var blotter = new Blotter(material, {
  texts : text
});

var elem = document.getElementById("distortion-text");
var scope = blotter.forText(text);

scope.appendTo(elem);




var text = new Blotter.Text("Filmmaker & Photographer", {
  family : "'Orpheus pro', sans-serif",
  size : 25,
  fill : "#f0f0f0",
  weight: 400,
  paddingLeft : 40,
  paddingRight : 40
});



var material = new Blotter.LiquidDistortMaterial();

material.uniforms.uSpeed.value = 0.3;
material.uniforms.uVolatility.value = 0.03;



var blotter = new Blotter(material, {
  texts : text
});

var elem = document.getElementById("distortion-text-resp");
var scope = blotter.forText(text);

scope.appendTo(elem);

