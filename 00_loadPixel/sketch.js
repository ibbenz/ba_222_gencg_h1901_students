// Global var

/*var windowWidth1=3240;
var windowHeight1=1920;*/
var windowWidth1=324;
var windowHeight1=192;
var backgroundColor;
var timeBegin;
var circleDiameter=55;
var circlePositionX=100;
var circlePositionY=100;
let circleColor;
//Position auf dem Rand des Kreises;
let xCircle;
let yCircle;
let pixelsOnCircle;
let pixelColor;
let PointArray= new Array();
let arrayLength;
//Winkelsprung zwischen den Pixeln
let circleAngle;
let circlePoint;

let pink;


 
function setup() {
  // Canvas setup
    canvas = createCanvas(windowWidth1, windowHeight1);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);

  windowWidth1=324;
  windowHeight1=192;
  circleDiameter=55;
  circlePositionX=100;
  circlePositionY=100;

  backgroundColor= new Array(255,255,245);
  background(backgroundColor[0],backgroundColor[1],backgroundColor[2]);

  pink = color(255, 102, 204);
    // Timestamp
  timeBegin=timestamp();
  pixelsOnCircle=toInt(PI*circleDiameter);
  circleAngle=2*PI/pixelsOnCircle;

  for(let i=0;i<=2*PI;i=i+circleAngle){
  xCircle=circlePositionX+circleDiameter/2*cos(i);
  yCircle=circlePositionY+circleDiameter/2*sin(i);
  circlePoint=createVector(toInt(xCircle),toInt(yCircle));
  PointArray.push(circlePoint);
  }

  arrayLength=PointArray.length
  console.log("size:"+PointArray.length);

}

function draw() {

    fill(100, 100, 100);
    ellipse(circlePositionX, circlePositionY,circleDiameter, circleDiameter);

    for(let i=0;i<arrayLength;i++){
        fill(0, 0, 0);
        strokeWeight(1);
        point(PointArray[i].x,PointArray[i].y)
    }

    for(let i=0;i<arrayLength;i++){
        console.log("Circle Points"+PointArray[i]);
        pixelColor=get(PointArray[i].x,PointArray[i].y);
    }

    //Ich mache dann mittels der Pixel-Color und den Points Mischfarben.




/*    let pink = color(255, 102, 204);

    if ((timestamp() - timeBegin) > 1000) {
        loadPixels();

        let d = pixelDensity();
        circleColor=get(circlePositionX, circlePositionY);
        console.log(circleColor);
        //updatePixels();
        timeBegin=timestamp();
    }*/

    noLoop();


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