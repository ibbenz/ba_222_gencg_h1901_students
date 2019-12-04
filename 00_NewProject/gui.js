
var options = {
    // Text
    txt: "Hello World",
    txtSize: 250,
    txtGray: 50, 
    txtAlpha: 0,
};

window.onload = function() {
  var gui = new dat.GUI();
  // Text
  gui.add(options, 'txt');
  gui.add(options, 'txtSize').step(1);
  gui.add(options, 'txtGray').min(1).max(255).step(1);
  gui.add(options, 'txtAlpha').min(0).max(255).step(.1);
  gui.add(options, 'step').min(1).max(100).step(1);
};