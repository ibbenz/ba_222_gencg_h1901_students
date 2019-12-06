// Global var
var windowWidth1=6480;
var windowHeight1=3840;
var time;
var oldtime;
var rand_rect;
//Das unterlagerte Rechteck.
let rand_rect2;
var rectColor;
var opacity;
let diamant;
//Variation der Opacity des untenliegenden Rechteckes
let randOpacity;
//Hier berechnen wir die Radien der Ecken.


let randomSigma;
//Basis zu der Radius an den Rechteckrändern bestimmt wird.
let radiusBase;

//Die Variablen für einen Rechteckstein
let rectWidth;
let rectHeight;
let rectPosX;
let rectPosY;
//Das leicht unterlagerte Rechteck
let shiftRectX;
let shiftRectY;

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
  console.log("color 1: "+rectColor);

  //Bezierlinien zeichnen um das ganze zu strukturieren.
    //und zwar zufällig und mit verschiedenen Strokeooacities.
}

function draw() {


    rectWidth=50;
    rectHeight=50;
    rectPosX=250;
    rectPosY=250;


    diamant=new Diamond(rectPosX,rectPosY,rectWidth,rectHeight,rectColor,opacity,1,(PI/4.0));

    diamant.draw();



    noLoop();


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
    constructor(posX,posY,width,height,color,opacity,scale,radius){
        let _posX = posX;
        let _posY = posY;
        let _width = width;
        let _height = height;
        let _color=color;
        let _opacity= opacity;
        let _scale=scale;
        let _radius=radius;


        this.getPosX = function() { return _posX; }

        this.getPosY = function() { return _posY; }

        this.getWidth = function() { return _width; }

        this.getHeight = function() { return _height; }

        this.getColor = function() { return _color; }

        this.getOpacity = function() { return _opacity; }

        this.getScale = function() { return _scale; }

        this.setPosX = function(posX) { _posX = posX; }
        this.setPosY = function(posY) { _posY = posY; }
        this.setWidth = function(width) { _width = width; }
        this.setHeight = function(height) { _height = height; }
        this.setOpacity = function(opacity) { _opacity = opacity; }
        this.setColor = function(color) { _color = color; }
        this.setScale = function(scale) { _scale = scale; }

        console.log("randomnumber:");

        this.draw = function() {
            //Mit push() speichern wir die aktuellen Drawing settings.
            push();
            noStroke();
            console.log("colorofrectangle"+_color);
            console.log("Opacity"+_opacity)
            //fill(_color,_opacity);
            fill(_color[0],_color[1],_color[2],_opacity);

            rect(_posX,_posY,scale*_width,scale*_height,radius[0],radius[1],radius[2],radius[3]);
            ///Hier holen wir die gespeicherten Drawing-Settings wieder hervor.
            pop();
        }

    }

}


class Diamond {
    constructor(posX,posY,width,height,color,opacity,scale,rotation){
        let _posX = posX;
        let _posY = posY;
        let _width = width;
        let _height = height;
        let _color=color;
        let _opacity= opacity;
        let _scale=scale;
        let _rotation=rotation;


        let randomRadius1;
        let randomRadius2;
        let randomRadius3;
        let randomRadius4;
        let radiusArray;
        let linePoint1;
        let linePoint2;
        let linePoint3;
        let linePoint4;

        let linePoint1_2;
        let linePoint2_2;
        let linePoint3_2;
        let linePoint4_2;


        this.getPosX = function() { return _posX; }

        this.getPosY = function() { return _posY; }

        this.getWidth = function() { return _width; }

        this.getHeight = function() { return _height; }

        this.getColor = function() { return _color; }

        this.getOpacity = function() { return _opacity; }

        this.getScale = function() { return _scale; }

        this.getRotation = function() { return _rotation; }

        this.setPosX = function(posX) { _posX = posX; }
        this.setPosY = function(posY) { _posY = posY; }
        this.setWidth = function(width) { _width = width; }
        this.setHeight = function(height) { _height = height; }
        this.setOpacity = function(opacity) { _opacity = opacity; }
        this.setColor = function(color) { _color = color; }
        this.setScale = function(scale) { _scale = scale; }
        this.setRotation = function(rotation) { _rotation = rotation; }


        this.draw = function() {
            //Mit pus() speichern wir die aktuellen Drawing settings.
            push();

            radiusArray=new Array(4);

            if(_width>_height){
                radiusBase=_height;
            }else{
                radiusBase=_width;
            }

            //Hier berechnen wir die Radien der Ecken.
            randomRadius1=random(radiusBase/12,radiusBase/4);
            randomRadius2=random(radiusBase/12,radiusBase/4);
            randomRadius3=random(radiusBase/12,radiusBase/4);
            randomRadius4=random(radiusBase/12,radiusBase/4);
            radiusArray[0]=randomRadius1;
            radiusArray[1]=randomRadius2;
            radiusArray[2]=randomRadius3;
            radiusArray[3]=randomRadius4;

            //Wie das darunterliegende Rechteck verschoben wird.
            shiftRectX=random(-radiusBase/4,radiusBase/4);
            if(random(-1,1)>=0){randomSigma=1}else(randomSigma=-1);
            shiftRectY=shiftRectX*randomSigma;
            //randOpacity=opacity*random(0.25,0.75);
            rand_rect2=new randomRectangle(_posX,_posY,_width,_height,_color,_opacity,_scale,radiusArray);
            rand_rect=new randomRectangle(_posX+shiftRectX,_posY+shiftRectY,_width,_height,_color,_opacity,_scale,radiusArray);

            //push();

            //Funktioniert, allerdings kommt Figur dann an einem ganz ganz anderen Ort!!!
            //Schein um 0-Punkt des Gesamtsystems zu rotieren
            //translate(_posX,);
            //rotate(_rotation);
            rand_rect2.draw();
            //pop();



            //Verbindungslinie zwischen oberem und unterem Rechteck
            //unteres Rechteck
            linePoint1=createVector(_posX+radiusArray[0],_posY+radiusArray[0]);
            //point(linePoint1.x,linePoint1.y);
            linePoint2=createVector(_posX+_width-radiusArray[1],_posY+radiusArray[1]);
            //point(linePoint2.x,linePoint2.y);
            linePoint3=createVector(_posX+radiusArray[3],_posY+_height-radiusArray[3]);
            //point(linePoint3.x,linePoint3.y);
            linePoint4=createVector(_posX+_width-radiusArray[2],_posY+_width-radiusArray[2]);
            //point(linePoint4.x,linePoint4.y);


            linePoint1_2=createVector(linePoint1.x+shiftRectX,linePoint1.y+shiftRectY);
            //point(linePoint1_2.x,linePoint1_2.y);
            linePoint2_2=createVector(linePoint2.x+shiftRectX,linePoint2.y+shiftRectY);
            //point(linePoint2_2.x,linePoint2_2.y);
            linePoint3_2=createVector(linePoint3.x+shiftRectX,linePoint3.y+shiftRectY);
            //point(linePoint3_2.x,linePoint3_2.y);
            linePoint4_2=createVector(linePoint4.x+shiftRectX,linePoint4.y+shiftRectY);
            //point(linePoint4_2.x,linePoint4_2.y);

            strokeWeight(2*radiusArray[0]);
            stroke(_color[0],_color[1],_color[2],opacity);
            line(linePoint1.x, linePoint1.y, linePoint1_2.x, linePoint1_2.y);
            strokeWeight(2*radiusArray[1]);
            line(linePoint2.x, linePoint2.y, linePoint2_2.x, linePoint2_2.y);
            strokeWeight(2*radiusArray[3]);
            line(linePoint3.x, linePoint3.y, linePoint3_2.x, linePoint3_2.y);
            strokeWeight(2*radiusArray[2]);
            line(linePoint4.x, linePoint4.y, linePoint4_2.x, linePoint4_2.y);

            //Das darüberliegende Rechteck
            rand_rect.draw();
            pop();
        }

    }

}