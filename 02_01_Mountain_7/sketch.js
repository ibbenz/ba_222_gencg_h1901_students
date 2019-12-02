// Based on the code P_2_2_5_01.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
// The var are initialised in gui.js
var maxCount, currentCount, elements, mouseRect;

//Eingabe der  Mountains evtl. über UI machen.
var numberOfPoints=6482; //Mit Anfangs- und Endpunkt.
var numberOfMountains=2;
var numberOfPeaks=2;
var windowWidth=6480;
var windowHeight=3840;
var mountains= new Array(numberOfMountains);
var singlePoint; //Vektor in dem die Bergpunkte gespeichert werden.
var mount1;
var mount2;
var opacity;
var time;
var oldtime;

//Um die Spitzen bewegen zu können;
let temporaryWave=new Array(numberOfMountains);
let temporaryWaveCounter=new Array(numberOfMountains);


function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  oldtime=timestamp();
  pixelDensity(density);
  // Init var
  // some of the var are initialised in gui.js
  mouseRect = 100; // size of the mouse rectangle
  maxCount = 6; //max count of the cirlces
  currentCount = 1;
  opacity=100;
    for (let j = 0; j <= numberOfMountains; j++) {
        //(peaks,height,width,iterationDepth){
        //Wir machen die Mountains deutlich breiter als die Canvas, so können wir die Peaks innerhalb der
        //Canvas leicht verschieben, ohne auf die Grösse des Arrays zu achten.
        mountains[j]=new mountainElement(numberOfPeaks,(2*windowHeight/numberOfMountains)*j,2*windowWidth,1);
        temporaryWave[j]=0;
        temporaryWaveCounter[j]=0;
    }

  //Evtl. alles in Graustufen zeichnen????
  background(255);
  rectMode(CENTER);
  smooth();
  //stroke(10);
    //noStroke();
  mountains[0].draw();
  mountains[1].draw();

  //Nun wird jedes Mountain-Element mit jedem verbunden.
    for (let k = 0; k <= numberOfMountains; k++) {
        for (let l = 0; l <= numberOfMountains; l++) {
            connectMountains(mountains[k], mountains[l]);
        }
    }
}

function draw() {

  // colorMode(HSB, 360, 100, 100, 255);
    //Nun wird jedes Mountain-Element mit jedem verbunden.
/*
    for (let k = 0; k <= numberOfMountains; k++) {
        for (let l = 0; l <= numberOfMountains; l++) {
            connectMountains(mountains[k], mountains[l]);
        }
    }
*/

    //In Millisekunden
    time=timestamp();
    let timeDiff=time-oldtime;
    let temporaryPeakPoints;


    if(timeDiff>3000) {
        console.log("Output: "+timeDiff);
        oldtime=time;

        for (let k = 0; k <= numberOfMountains; k++) {
            //Wir erstellen die zufälligen Verschiebungswerte der Peakpoints jedes Mountain.
            temporaryWave[k]=toInt(random(-windowWidth/2,windowWidth/2));
            console.log("tempWave first:"+temporaryWave[k]);
            //Innerhalb von 1000 Frames wird die Verschiebung umgesetzt.
            temporaryWaveCounter[k]=temporaryWave[k]/1000;
        }
    }

    //Bei jedem Durchgang wird nun ein Teil der Temporarywave angewandt, bis sie bei 0 ist.
    for (let l = 0; l <= numberOfMountains; l++) {
        temporaryPeakPoints =mountains[l].getPeakPoints();
        console.log("oldtempPeak:"+mountains[l].getPeakPoints());
        for(let m=0; m<numberOfPeaks;m++){
            console.log("tempWave:"+temporaryWave[l]);
            console.log("tempPeak:"+temporaryPeakPoints[m]);
            if(((temporaryPeakPoints[m].x+temporaryWave[l])<windowWidth)&&((temporaryPeakPoints[m].x+temporaryWave[l])>0)){
                temporaryPeakPoints[m]=createVector(temporaryPeakPoints[m].x+temporaryWaveCounter[l],temporaryPeakPoints[m].y);
            }
        }

        //Hier setze ich die verschobenen Peak-Points.
        mountains[l].setPeakPoints(temporaryPeakPoints);
        console.log("newtempPeak:"+mountains[l].getPeakPoints());

        if(abs(temporaryWave[l])>abs(temporaryWaveCounter[l])){
            temporaryWave[l]=temporaryWave[l]-temporaryWaveCounter[l];
        }else{
            temporaryWave[l]=0;
            temporaryWaveCounter[l]=0;}
    }

    for (let k = 0; k <= numberOfMountains; k++) {
            for (let l = 0; l <= numberOfMountains; l++) {
                //if((temporaryWaveCounter[l]>0)||(temporaryWaveCounter[k]>0)){
                    connectMountains(mountains[k], mountains[l]);
                //}
        }

    }

  //noLoop();

}

class mountainElement {
  constructor(peaks,height,width,iterationDepth){
    let _peaks = peaks;
    let _height = height;
    let _width = width;
    let _iterationDepth = iterationDepth;
    let peakPoints= new Array(peaks);
    let mountainPoints= new Array(numberOfPoints);
    let colorMountain=new Array(4);

    this.getPeaks = function() { return _peaks; }

    this.getPeakPoints = function() { return peakPoints; }

    this.getColorMountain = function() { return colorMountain; }

    this.getHeight = function() { return _height; }

    this.getWidth = function() { return _width; }

    this.getiterationDepth = function() { return _iterationDepth; }

    this.getmountainPoints = function() { return mountainPoints; }

    this.setPeaks = function(peaks) { _peaks = peaks; }

    this.setHeight = function(height) { _height = height; }

    this.setWidth = function(width) { _width = width; }

    this.setIterationDepth = function(iterationDepth) { _iterationDepth = iterationDepth; }

    this.setPeakPoints = function(newPeakPoints) {
        this.peakPoints = newPeakPoints;}

    let a;
    //Wir befüllen die Matrix mit Punkten
    for (let i = 0; i <= (numberOfPoints-1); i++) {
      //for (let i = 1; i <= (numberOfPoints-2); i++) {
      mountainPoints[i]=createVector(i, _height/2);
      //console.log("y: "+mountainPoints[i].y)
      }

      //Wir geben dem Berg eine Farbskala;
      //Ich entscheide mich dafür bei der "blau-gelben"-Farbskala zu bleiben.
      colorMountain=createVector(toInt(random(0,255)),255,toInt(random(0,255)),opacity);

      //Wir setzen die Peaks der Berge
      for (let j = 0; j <= (peaks); j++) {
          let point=toInt(random(1,(windowWidth-1)));
          //console.log("randomnumber: "+point)
          //Die Peakpoints erhalten die doppelte Menge der Punkte. Nämlich auch die gespiegelten.
          peakPoints[j]=createVector(mountainPoints[point].x,mountainPoints[point].y);
      }

      peakPoints.sort(compareVectors);

/*      for (let j = 0; j <= (peaks); j++) {
          peakPoints[j];
      }*/

      console.log("randomnumber: "+point)


    this.draw = function() {
      //push()
      strokeWeight(1);
      fill(colorMountain[0],colorMountain[1],colorMountain[2],colorMountain[3]);
      beginShape();
        for (let i = 0; i <= (numberOfPoints-1); i++) {
          vertex(mountainPoints[i].x, mountainPoints[i].y);
        }
      //rect(windowWidth/2,windowHeight,_height,_width);
      endShape();
      //pop()
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
  let img = get(width / 2 - w / 2, height / 2 - h / 2, w, h);
  save(img, 'thumb.jpg');
}

function compareVectors(a, b) {
    return a.x - b.x || a.y - b.y || a.z - b.z;
}

function connectMountains(mount1, mount2) {
    let _mount1 = mount1;
    let _mount2 = mount2;
    let peak1;
    let peak2;

    peak1=mount1.getPeaks();
    peak2=mount2.getPeaks();

    //Die Peaks und die Anfang und Schlusspunkte
    let connectMount= new Array((2*peak1+4));
    let connectColor=[0,0,0];

    //Die zweite Ziffer gibt an, zu welchem Mount der Punkt gehört.
    //Die dritte Ziffer speichert den Farbwert;
    connectMount[0]=[mount1.getmountainPoints()[0],1,mount1.getColorMountain()];
    //let test=connectMount[0].x;
    //console.log("connect mount entry 0:"+connectMount[0]);
    connectMount[1]=[mount2.getmountainPoints()[0],2,mount2.getColorMountain()];
    //console.log("connect mount entry 1:"+connectMount[1]);

    //Hier lese ich die Peak-Positionen ein.
    for (let j = 0; j < (peak1+2); j++) {
        connectMount[2+2*j]=[mount1.getPeakPoints()[j],1,mount1.getColorMountain()];
        connectMount[3+2*j]=[mount2.getPeakPoints()[j],2,mount2.getColorMountain()];
    }

    connectMount[2*peak1+3]=[mount2.getmountainPoints()[mount1.getWidth()-1],2,mount1.getColorMountain()];
    connectMount[2*peak1+4]=[mount1.getmountainPoints()[mount2.getWidth()-1],1,mount2.getColorMountain()];


    for (let j = 0; j < (2*peak1+4); j++) {
/*    console.log("Verbindungstabelle: "+connectMount[j]);*/
    }


    strokeWeight(1);
    fill(255,255,255);
    //stroke(10);


    for (let i = 0; i <= ((2*peak1+4-2)); i++) {

        //Calculate color of triangle.

        beginShape();



        //Calculate color of triangle.
        let base;
        let ratio;
        let colorConnect=[];

        //Volle Farbstärke, wenn die Höhe gleich gross ist wie die Basis
        //Zuerst prüfen, wir, welche Berge zum gleichen  Mount gehören.
        if(connectMount[i][1]==connectMount[i+1][1]){
            base=abs(connectMount[i][0].x-connectMount[i+1][0].x);
            if(base>abs((connectMount[i][0].y-connectMount[i+1][0].y))){
                ratio= abs((connectMount[i][0].y-connectMount[i+1][0].y))/base
            }else{
                ratio=base/abs((connectMount[i][0].y-connectMount[i+1][0].y));
            }

            colorConnect[i]=p5.Vector.mult(connectMount[i][2],ratio).add(p5.Vector.mult(connectMount[i+2][2],(1-ratio)));
            /*console.log("Farbe1: "+connectMount[i][2]);
            console.log("Farbe2: "+connectMount[i+2][2]);
            console.log("Verbindungsverhaeltnis1: "+ratio);
            console.log("Verbindungsfarbe1: "+colorConnect[i]);
*/
        }else if(connectMount[i][1]==connectMount[i+2][1]){
            base=abs(connectMount[i][0].x-connectMount[i+2][0].x);

            if(base>abs((connectMount[i+1][0].y-connectMount[i+2][0].y))){
                ratio= abs((connectMount[i+1][0].y-connectMount[i+2][0].y))/base
            }else{
                ratio=base/abs((connectMount[i+1][0].y-connectMount[i+2][0].y));
            }
            colorConnect[i]=p5.Vector.mult(connectMount[i][2],ratio).add(p5.Vector.mult(connectMount[i+1][2],(1-ratio)));
/*
            console.log("Farbe1: "+connectMount[i][2]);
            console.log("Farbe2: "+connectMount[i+2][2]);
            console.log("Verbindungsfarbe: "+colorConnect[i]);
            console.log("Verbindungsverhaeltnis2: "+ratio);
            console.log("Verbindungsfarbe2: "+colorConnect[i]);*/
        } else{
            base=abs(connectMount[i+1][0].x-connectMount[i+2][0].x);
            if(base>abs((connectMount[i][0].y-connectMount[i+2][0].y))){
               ratio= abs((connectMount[i][0].y-connectMount[i+2][0].y))/base
            }else{
                ratio=base/abs((connectMount[i][0].y-connectMount[i+2][0].y));
            }
            colorConnect[i]=ratio*connectMount[i][2]+(1-ratio)*connectMount[i+1][2];
            colorConnect[i]=p5.Vector.mult(connectMount[i+1][2],ratio).add(p5.Vector.mult(connectMount[i][2],(1-ratio)));
/*            console.log("Verbindungsverhaeltnis3: "+ratio);
            console.log("Verbindungsfarbe3: "+colorConnect[i]);*/
        }

        //In einem Vektor sind die Farb-Komponenten als x,y,z abgelegt.
        fill(colorConnect[i].x,colorConnect[i].y,colorConnect[i].z,opacity);
        vertex(connectMount[i][0].x, connectMount[i][0].y);
        vertex(connectMount[i+1][0].x, connectMount[i+1][0].y);
        vertex(connectMount[i+2][0].x, connectMount[i+2][0].y);

        endShape();
    }


/*    console.log("peak mount 1:"+peak1);
    console.log("peak mount 2:"+peak2);*/
    //vertex(mountainPoints[i].x, mountainPoints[i].y);

}