// Based on the code P_2_0_02.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
var b = 255, p = false;
var startVertex;
var endVertex;
var sideLength;
var circleEdges = 5;

 
function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight-45);
  startVertex=createVector(0, 0);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  //Wir starten mit einem Dreieck
  pixelDensity(density);
  // Colors and drawing modes
  background(0);
  smooth();
  // Init Var
}

function draw() {
  //background(255);
    let c = color(random(255), random(255), random(255),255); // Define color 'c'
    fill(c);
    smooth();
    //var radius = mouseX - width / 2 + 0.5;
    var edgeLength = mouseX - width / 2 + 0.5;
    translate(width / 2-edgeLength, height / 2-edgeLength);
  //noFill();

  //if (p) {
     var edgex=-width/2;
     var edgey=-height/2;

    for (i = 3; i <= (circleEdges); i=i) {
        c = color(random(255), random(255), random(255),255);
        fill(c);
        var pol=new Poly2(edgex,edgey,height/8,circleEdges,1);
        pol.polygon();

        //wie logge ich es
        console.log("Hallo");
        edgex=pol.x;
        edgey=pol.y;
        circleEdges=circleEdges-1;
    }

    //beende die Zeichnung
    pop();
  //}
}

function mousePressed() {
  p = true;
}

function mouseReleased() {
  p = false;
}

function keyPressed() {
  // Clear sketch
  if (keyCode === 32) background(255) // 32 = SPACE BAR 
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



// Poly class
class Poly {
    constructor(xIn,yIn,radiusIn,edgesIn) {
        this.x = xIn;
        this.y = yIn;
        this.radius = radiusIn;
        this.edges=edgesIn;
    }

    polygon() {
        let angle = TWO_PI / this.edges;
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = this.x + cos(a) * this.radius;
            let sy = this.y + sin(a) * this.radius;
            vertex(sx, sy);
        }
        endShape();
    }
}

// Poly class
class Poly2 {
    constructor(corner1x,corner1y,sideLength,edgesIn,angleIn) {
        this.x = corner1x;
        this.y = corner1y;
        this.side = sideLength;
        this.edges = edgesIn;
        this.sx = 0;
        this.sy = 0;
        this.angin=angleIn;
    }


    polygon() {
        let angle = TWO_PI / this.edges;
        beginShape();
        for (let a = this.angin; a < TWO_PI; a += angle) {
            this.sx = this.x + cos(a) * this.side;
            this.sy = this.y + sin(a) * this.side;
            this.x=this.sx;
            this.y=this.sy;
            vertex(this.sx, this.sy);
        }
        endShape();
    }
}
