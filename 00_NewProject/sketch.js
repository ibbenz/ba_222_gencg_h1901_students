// Global var
var windowWidth1=6480;
var windowHeight1=3840;
var time;
var oldtime;
var rand_rect;
var rectColor;
var opacity;
 
function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth1, windowHeight1);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  background(250,255,245);
  oldtime=timestamp();
  rectColor=new Array(255,0,0);
  opacity=255;
  //constructor(posX,posY,width,height,color,opacity,scale)
  rand_rect=new randomRectangle(250,250,50,50,rectColor,opacity,1);
  console.log("color 1: "+rectColor);



  //Bezierlinien zeichnen um das ganze zu strukturieren.
    //und zwar zufällig und mit verschiedenen Strokeooacities.
}

function draw() {

  rand_rect.draw();


//Falls Vektor mit Rechtecken voll ist, beginne ihn erneut von vorne zu füllen.

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

// Timestamp
function timestamp() {
    return Date.now();
}

class randomRectangle {
    constructor(posX,posY,width,height,color,opacity,scale){
        let _posX = posX;
        let _posY = posY;
        let _width = width;
        let _height = height;
        let _color=color;
        let _opacity= color;
        let _scale=scale;

        this.getPosX = function() { return _posX; }

        this.getPosY = function() { return _posY; }

        this.getWidth = function() { return _width; }

        this.getHeight = function() { return _height; }

        this.getOpacity = function() { return _opacity; }

        this.getScale = function() { return _scale; }

        this.setPosX = function(posX) { _posX = posX; }
        this.setPosY = function(posY) { _posY = posY; }
        this.setWidth = function(width) { _width = width; }
        this.setHeight = function(height) { _height = height; }
        this.setOpacity = function(opacity) { _opacity = opacity; }
        this.setScale = function(scale) { _scale = scale; }

        console.log("randomnumber:")


        this.draw = function() {
          //Mit pus() speichern wir die aktuellen Drawing settings.
          push();
            noStroke();
            console.log("colorofrectangle"+_color)
            fill(_color);
            rect(_posX,_posY,scale*_width,scale*_height);
            ///Hier holen wir die gespeicherten Drawing-Settings wieder hervor.
            pop();
        }

    }
}