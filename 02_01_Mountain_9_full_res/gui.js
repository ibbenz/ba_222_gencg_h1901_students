var options = {
    numberOfMountains: 3,
    numberOfPeaks: 50,
    opacity: 30,
    colorShade: 25,
};

window.onload = function() {
    var gui = new dat.GUI();
    gui.add(options, 'numberOfMountains').min(1).max(20).step(1);
    gui.add(options, 'numberOfPeaks').min(0).max(50).step(1);
    gui.add(options, 'opacity').min(0).max(255).step(1);
    gui.add(options, 'colorShade').min(0).max(255).step(1);
};