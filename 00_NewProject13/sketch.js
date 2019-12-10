// Global var
var windowWidth1=6480;
var windowHeight1=3840;
var time;
var oldtime;

var backgroundColor;

let move=0;
let moveOld=0;
let randomLineLength_upper;
let randomLineLength_lower;

//Die Dicke gelben Linien
let lineStroke;
let lineLength;

//X und Y-Position des Startpunktes.
let YPosition;
let XPosition;
//In wieviele Quadranten die Zeichenfläche unterteilt werden soll.
let horizontalDivisions;
let verticalDivisions;

//Anzahl Linien die gleichzeitig gezeichnet werden.
let repetitionLine;
//Zeitlicher Abstand in dem dieses gleichzeitige Zeichnen geschieht
let repetitionTime;


function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth1, windowHeight1);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  oldtime=timestamp();
  backgroundColor= new Array(170,255,245); //Blau
    // backgroundColor= new Array(255,255,170); //Gelb
    //backgroundColor= new Array(255,170,255); //Pink
  background(backgroundColor[0],backgroundColor[1],backgroundColor[2]);
  repetitionLine=options.repetitionLine;
  repetitionTime=options.repetitionTime;
  horizontalDivisions=options.horizontalDivisions;
  verticalDivisions=options.verticalDivisions;
  randomLineLength_upper=options.randomLineLength_upper;
  randomLineLength_lower=options.randomLineLength_lower;
  lineStroke=options.lineStroke;
  lineLength=100;
}

function draw() {
    repetitionLine=options.repetitionLine;
    repetitionTime=options.repetitionTime;
    horizontalDivisions=options.horizontalDivisions;
    verticalDivisions=options.verticalDivisions;
    randomLineLength_upper=options.randomLineLength_upper;
    randomLineLength_lower=options.randomLineLength_lower;
    lineStroke=options.lineStroke;

        if((timestamp()-oldtime)>repetitionTime){
            //Auf jedem 6 der Canvas wird bei jedem Durchgang eine
            //Linie gezeichnet, deren Länge soll Variiert werden.

            for(let i=0; i<(windowWidth1+1);i=i+windowWidth1/verticalDivisions){
                //X-Position des Startpunktes im Vertikalen Streifen wird festgelegt
                XPosition=random(i,i+windowWidth1/verticalDivisions);
                for(let j=0; j<(windowHeight1+1);j=j+windowHeight1/horizontalDivisions) {
                    for(let k=0; k<repetitionLine;k++) {
                        //Y-Position des Startpunktes im Quadranten innerhalb des vertikalen Streifens wird festgelegt.
                        YPosition=random(j,j+windowHeight1/horizontalDivisions);
                        lineLength=random(randomLineLength_lower,randomLineLength_upper);
                        push();
                        strokeWeight(lineStroke);
                        //stroke(0,0,0);
                        stroke(255,255,170);
                        line(XPosition, YPosition, XPosition+lineLength, YPosition);
                        pop();
                    }
                }
            }
            oldtime=timestamp();
        }

    background(backgroundColor[0],backgroundColor[1],backgroundColor[2],100);



//Falls Vektor mit Rechtecken voll ist, beginne ihn erneut von vorne zu füllen.

}

function keyPressed() {
    if (key == 'a' ||key == 'A') {start=true; };
    if (key == 'd' || key == 'D') start=false;

    //38 ist lift fährt rauf
    /*    if (key == 'w' ||key == 'W'){moveMountain=-diffMountain;}
        //40 ist lift fährt runter
        if (key == 's' ||key == 'S'){moveMountain=+diffMountain;}*/

    //38 ist lift fährt rauf
    if (keyCode === 38){move=-1} ;
    //40 ist lift fährt runter
    if (keyCode === 40)move=+1;
    console.log(keyCode);
}

function keyReleased() {
    //38 ist lift fährt rauf
    /*    if (key == 'w' ||key == 'W'){moveMountain=0;}
        //40 ist lift fährt runter
        if (key == 's' ||key == 'S'){moveMountain=0;}*/
    if (keyCode === 38){move=0;}
    //40 ist lift fährt runter
    if (keyCode === 40){move=0;}
}


// Tools

// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
}

// Int conversion
function toInt(value) {
  return ~~value;
}

// Timestamp
function timestamp() {
  return Date.now();
}

// Thumb
function saveThumb(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'thumb.jpg');
}

// Timestamp
function timestamp() {
    return Date.now();
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight, false);
}

function blurrFunction(imagePoints,resolution) {

}