
var options = {

    randomLineLength_upper: 100,
    randomLineLength_lower: 10,
    horizontalDivisions:    3,
    verticalDivisions:  20,
    repetitionLine: 100,
    repetitionTime: 100,
    lineStroke: 1,

    //NumberDia: 10,
};

window.onload = function() {
  var gui = new dat.GUI();
    gui.add(options, 'randomLineLength_upper').min(200).max(1000).step(4);
    gui.add(options, 'randomLineLength_lower').min(0).max(200).step(4);
    gui.add(options, 'horizontalDivisions').min(1).max(10).step(1);
    gui.add(options, 'verticalDivisions').min(2).max(30).step(1);
    gui.add(options, 'repetitionLine').min(1).max(10).step(1);
    gui.add(options, 'repetitionTime').min(1).max(200).step(10);
    gui.add(options, 'lineStroke').min(1).max(10).step(1);
};

//Height und Width von 10 und Anzahl 400 sieht nicht schlecht aus.
//und evtl. MixFade von 0.95