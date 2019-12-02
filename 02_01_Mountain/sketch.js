// Based on the code P_2_2_5_01.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
// The var are initialised in gui.js
var maxCount, currentCount, elements, mouseRect;

//Eingabe der  Mountains evtl. über UI machen.
var numberOfPoints=6482; //Mit Anfangs- und Endpunkt.
var numberOfMountains=5;
var windowWidth=6480;
var windowHeight=3840;
var mountainPoints= new Array(numberOfPoints);
var mountains= new Array(numberOfMountains);
var singlePoint; //Vektor in dem die Bergpunkte gespeichert werden.
var mount1;


function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  // Init var
  // some of the var are initialised in gui.js
  mouseRect = 100; // size of the mouse rectangle
  maxCount = 6; //max count of the cirlces
  currentCount = 1;
  mount1=new mountainElement(3,windowHeight,windowWidth,1);
}

function draw() {

  // colorMode(HSB, 360, 100, 100, 255);
  rectMode(CENTER);
  smooth();
  stroke(150);
  noFill();
  noLoop();

  background(0);

    //mountains.push(new mountainElement(peaks,height,width,iterationDepth));

    mountains[0]=mount1;
    //currentCount++;
    currentCount=1;

  // draw them
    mountains[0].draw();
    //mountains[0].draw();

    noStroke();


}

class mountainElement {
  constructor(peaks,height,width,iterationDepth){
    let _peaks = peaks;
    let _height = height;
    let _width = width;
    let _iterationDepth = iterationDepth;
    let peakPoints= new Array(2*peaks);

    this.getPeaks = function() { return _peaks; }

    this.getHeight = function() { return _height; }

    this.getWidth = function() { return _width; }

    this.getiterationDepth = function() { return _iterationDepth; }

    this.setPeaks = function(peaks) { _peaks = peaks; }

    this.setHeight = function(height) { _height = height; }

    this.setWidth = function(width) { _width = width; }

    this.setIterationDepth = function(iterationDepth) { _iterationDepth = iterationDepth; }


    mountainPoints[0]=createVector(0, _height);

    let a;
    //Wir befüllen die Matrix mit Punkten
    for (let i = 1; i <= (numberOfPoints-2); i++) {
      //for (let i = 1; i <= (numberOfPoints-2); i++) {
      mountainPoints[i]=createVector(i, _height/2);
      //console.log("y: "+mountainPoints[i].y)
      }

      //Wir setzen die Peaks der Berge
      for (let j = 0; j <= (peaks); j++) {
          let point=toInt(random(1,(windowWidth-1)));
          let r = random(0, +_height);
          //console.log("randomnumber: "+point)
          mountainPoints[point].y=r;
          //Die Peakpoints erhalten die doppelte Menge der Punkte. Nämlich auch die gespiegelten.
          peakPoints[2*j]=createVector(mountainPoints[point].x,mountainPoints[point].y);
          peakPoints[2*j+1]=createVector(mountainPoints[point].x,_height-mountainPoints[point].y);
      }

      peakPoints.sort(compareVectors);

      for (let j = 0; j <= (2*peaks); j++) {
          peakPoints[j];
      }

      console.log("randomnumber: "+point)

      mountainPoints[numberOfPoints-1]=createVector(windowWidth,_height);

    this.draw = function() {
      push()
      strokeWeight(10);
      fill(150,150,150);
      beginShape();
        for (let i = 0; i <= (numberOfPoints-1); i++) {
          vertex(mountainPoints[i].x, mountainPoints[i].y);
        }
      //rect(windowWidth/2,windowHeight,_height,_width);
        // vertex(0, 35);
        // vertex(35, 0);
        // vertex(0, -35);
        // vertex(-35, 0);
      endShape();


        //Ich verbinden Punkte, die links und rechts eines Punktes liegen zu Dreiecken.
        for (let k = 1; k <= (2*peaks); k++) {
            stroke(255, 255, 255);
            strokeWeight(10);
            fill(random(255),random(255),random(255),100);
            beginShape();
            vertex(peakPoints[k].x, peakPoints[k].y);

            if((k-2)>0){
                vertex(peakPoints[k-2].x,_height/2);
            }else{
                vertex(0,_height/2);
            }

            if((k+2)<peaks){
                vertex(peakPoints[k+2].x,_height/2);
            }else{
                vertex(_width,_height/2);
            }

            endShape();
        }



      pop()
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