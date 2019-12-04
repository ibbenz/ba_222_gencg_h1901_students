// Global var
 
function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight-45);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
}

function draw() {

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

function initScene() {

    background(0);
    fill(1);
    textSize(options.txtSize);

    //Text wird hier in Mitte gesetzt
    text(options.txt, width/2-textWidth(options.txt)/2, height/2+options.txtSize/2);

    let container = document.getElementById('p5Container');
    ctx = container.firstChild.getContext("2d");
    //hier werden die Pixel der Texte herausgeschrieben.
    let data = ctx.getImageData(0, 0, w, h).data;

}