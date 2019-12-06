
var options = {
    rectangleWidth: 50,
    rectangleHeight: 50,
    LowLimitRadius: 1,
    HighLimitRadius: 4,
    FaderValue: 100,
    MixFade: 0.98,
    //NumberDia: 10,
};

window.onload = function() {
  var gui = new dat.GUI();
    gui.add(options, 'rectangleWidth').min(40).max(200).step(4);
    gui.add(options, 'rectangleHeight').min(40).max(200).step(4);
    gui.add(options, 'LowLimitRadius').min(6).max(20).step(1);
    gui.add(options, 'HighLimitRadius').min(1).max(6).step(1);
    gui.add(options, 'FaderValue').min(50).max(500).step(50);
    gui.add(options, 'MixFade').min(0.8).max(0.99).step(0.1);
    //gui.add(options, 'NumberDia').min(5).max(40).step(5);
};
