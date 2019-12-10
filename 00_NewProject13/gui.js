
var options = {

    randomLineLength_upper: 1000,
    randomLineLength_lower: 10,
    horizontalDivisions:    3,
    verticalDivisions:  6,
    repetitionLine: 3,
    repetitionTime: 10,
    lineStroke: 1,

    //NumberDia: 10,
};

window.onload = function() {
  var gui = new dat.GUI();
    gui.add(options, 'randomLineLength_upper').min(200).max(1000).step(4);
    gui.add(options, 'randomLineLength_lower').min(0).max(200).step(4);
    gui.add(options, 'horizontalDivisions').min(1).max(10).step(1);
    gui.add(options, 'verticalDivisions').min(2).max(10).step(1);
    gui.add(options, 'repetitionLine').min(1).max(10).step(1);
    gui.add(options, 'repetitionTime').min(1).max(10).step(1);
    gui.add(options, 'lineStroke').min(1).max(10).step(1);
};

//Height und Width von 10 und Anzahl 400 sieht nicht schlecht aus.
//und evtl. MixFade von 0.95