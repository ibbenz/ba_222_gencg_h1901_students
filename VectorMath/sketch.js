// Based on the code P_2_0_02.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
var b = 255, p = false;
var startVertex;
var endVertex;
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
  //background(0);
    let c = color(random(255), random(255), random(255),255); // Define color 'c'
    fill(c);
  smooth();
  //noFill();

  if (p) {
      b = random(250, 255);
      //starte eine neue Zeichnung
      push();

      //Objekt welches am Ende gezeichnet wird, wird immer in die Mitte verschoben.
      translate(width / 2, height / 2);

      //Durch die Map wird der Wert relativ skaliert z.B.
      // wenn MouseY=75 im Bereich 0-100 so wird er zu 0.75 im Bereich 0-1.
      //Im untigen Beispiel wird die Mausposition umgewandelt in die Anzahl
      //Ecken eines Polygons
      //var circleResolution = toInt(map(abs(mouseY -height / 2), 0, height/2, 2, 10));
      //Distanz der Maus zum Zentrum wird Radius.
      var radius = mouseX - width / 2 + 0.5;
      var angle = TWO_PI / circleEdges;

      strokeWeight(2);
      stroke(b, 25);

      if ((circleEdges < 5)&&(circleEdges>0)){
          beginShape();
          vertex(startVertex.x, startVertex.y);
          vertex(endVertex.x, endVertex.y);

      for (i = 0; i <= (circleEdges-1); i++) {
          var x = endVertex.x + cos(angle * i) * radius;
          var y = endVertex.y + sin(angle * i) * radius;
          vertex(x, y);
      }
          endVertex.x=x;
          endVertex.y=y;
      endShape();
      }else if(circleEdges==5){
          startVertex=createVector(0, 0);
          beginShape();
          for (i = 0; i <= circleEdges; i++) {
              var x = startVertex.x + cos(angle * i) * radius;
              var y = startVertex.y + sin(angle * i) * radius;
              vertex(x, y);
          }
          endVertex=createVector(x, y);
          endShape();
      }

      circleEdges=circleEdges-1;

    //beende die Zeichung
    pop();
  }
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