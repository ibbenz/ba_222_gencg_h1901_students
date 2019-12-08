// Global var

/*var windowWidth1=3240;
var windowHeight1=1920;*/
var windowWidth1;
var windowHeight1;
var backgroundColor;
var lineColor;
var timeBegin;
var strokeBreite;
var mixFactor;
var startY;
let newPosition;
let colorMix;
let newColor;
let lineElementArray;
let drawCounter;
//Position auf dem Rand des Kreises;



function setup() {
    windowWidth1=6480;
    windowHeight1=3840;
    canvas = createCanvas(windowWidth1, windowHeight1);
    canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  strokeBreite=100;
  mixFactor=0.5;
  startY=1;
  drawCounter=0;
  newPosition=startY;
  lineElementArray=new Array();

  backgroundColor= new Array(255,255,245);
  lineColor= new Array(255,0,0);
  colorMix=lineColor;
  newColor=lineColor;
  background(backgroundColor[0],backgroundColor[1],backgroundColor[2]);
  //Farbe des Anfangstriches


  //Die Ausgangslinie wird dem Array hinzugefügt.
  lineElementArray.push(new lineElement(newPosition,windowWidth1,newColor));

    // Timestamp
  timeBegin=timestamp();
}

function draw() {


    //Für Sphere-Darstellung, da sich bei dieser das ganze kreisrund an der Decke darstellen sollte.
    //Eine Rekursive Linienfunktion
    //bei der sich die Startlinie um den stroke verschiebt.
    //und zwar beidseitig zur Ursprungslinie.
    //Die Rekursion ist zu Ende, sobald eine Linie ausserhalb
    //der Höhe zu liegen kommt (also <0 oder >WindowWidth)


    let arrayLength=lineElementArray.length;
    console.log("Arraylength: "+arrayLength);

    if((arrayLength>0)&&(drawCounter<10)){
        for(let i=0;i<arrayLength;i++){
            lineElementArray[i].draw();
            console.log("Du Da");
        }
    }else{
        noLoop();
    }



    newPosition = startY + strokeBreite;
    colorMix = color(newColor[0] * mixFactor + backgroundColor[0] * (1 - mixFactor), newColor[1] * mixFactor + backgroundColor[1] * (1 - mixFactor), newColor[2] * mixFactor + backgroundColor[2] * (1 - mixFactor));
    //Soll ich hier als neue Farbe die Mischfarbe aus Farbe und Umgebungsfarbe nehmen?
    lineElementArray.push(new lineElement(newPosition,windowWidth1,new Array(0,255,0)));
    newPosition = startY - strokeBreite;
    //lineElementArray.push(new lineElement(newPosition,windowWidth1,colorMix));
    drawCounter++;





    //noLoop();

}

class lineElement {
    constructor(position,length,color) {
        let newPosition=position;
        let colorMix=color;
        let laenge=length;

        console.log(colorMix);

        this.draw =function () {
            //Hier Abbruchkriterium noch einfügen!!!
            //line(0, newPositionY, length, newPositionY);
            strokeWeight(strokeBreite);
            stroke(colorMix);
            console.log("colorMix "+colorMix);
            console.log("new Position"+newPosition);
            console.log("laenge"+laenge);
            line(0, newPosition,laenge, newPosition);
        }
    }
}


function keyPressed() {
  if (key == 's' || key == 'S') saveThumb(650, 350);
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