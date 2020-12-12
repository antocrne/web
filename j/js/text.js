var text = new Blotter.Text("Filmmaker & Photographer", {
  family: "Orpheus Pro",
  size: 60,
  fill: "#171717",
  paddingLeft: 10,
  paddingRight: 40
});

var material = new Blotter.LiquidDistortMaterial();


material.uniforms.uSpeed.value = .15;

material.uniforms.uVolatility.value = .02;

material.uniforms.uSeed.value = 0.05;


var blotter = new Blotter(material, {
  texts: text
});

var elem = document.getElementById("distortion-text");
var scope = blotter.forText(text);

scope.appendTo(elem);
