// Global var
var windowWidth1=6480;
var windowHeight1=3840;
var time;
var oldtime;
var rand_rect;
//Das unterlagerte Rechteck.
let rand_rect2;

//Die Farben für das Rechteck.
var rectColor;
var backgroundColor;
var mixColor;
//Wie die Rechtecke als Mischfarbe der Hintergrund
//und der Vordergrundfarbe gemischt werden.
var mixRatio;
//Wie schnell sich die Farbmischung von der Hintergrund zur Vordergrundfarbe bewegt.
var mixRatioFade;
var stripeWidth;

//Zeit bei der der Move-Zyklus abgeschlossen ist.
var moveEndTime;

var diamondList;
var numOfDiamonds;
var opacity;
var origOpacity=255;
var elevatorScaler;

//Zentrum der Streifen
var elevatorCenter;
//Varianz um den Streifen

//Wie schnell Tropfen ausblassen soll.
var fader;;
var backgroundFader=10;
let resetTime;
let resetTrigger;

//Setzt alles wieder auf den Ausgangszustand zurück.
let reset;


let diamant;
let redrawTime=0;
let reFadeTime=0;
let reBackgroundTime=0;
let currentDiamondNumber;
let counter=0;
let move=0;
let moveOld=0;
let lowRadiusLimit;
let highRadiusLimit;


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
let opacityScale;
let timeDriver;




function setup() {

  // Canvas setup
  canvas = createCanvas(windowWidth1, windowHeight1);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  numOfDiamonds=100;
  //Dicke der Streifen
  stripeWidth=100;
  elevatorCenter=windowHeight1*1/4;




    fader=options.FaderValue;
    lowRadiusLimit=options.LowLimitRadius;
    highRadiusLimit=options.HighLimitRadius;
    rectWidth=options.rectangleWidth;
    rectHeight=options.rectangleHeight;

  pixelDensity(density);
  oldtime=timestamp();
  backgroundColor= new Array(0,0,0);
  rectColor=new Array(255,0,0);
  mixColor=[];
  mixRatioFade=options.MixFade;
  mixRatio=1;
  background(backgroundColor[0],backgroundColor[1],backgroundColor[2]);
  opacity=origOpacity;
  opacityScale=0.9;
  currentDiamondNumber=0;
  diamondList=new Array(numOfDiamonds);
  resetTime=0;
  resetTrigger=false;
  moveEndTime=timestamp();
  reset=false;
  timeDriver=0;

  //constructor(posX,posY,width,height,color,opacity,scale)
  //console.log("color 1: "+rectColor);

  //Bezierlinien zeichnen um das ganze zu strukturieren.
    //und zwar zufällig und mit verschiedenen Strokeopacities.
    redrawTime=timestamp();
    reFadeTime=timestamp();
    reBackgroundTime=timestamp();

    mixColor[0]=rectColor[0]*(1-mixRatio)+mixRatio*backgroundColor[0];
    mixColor[1]=rectColor[1]*(1-mixRatio)+mixRatio*backgroundColor[1];
    mixColor[2]=rectColor[2]*(1-mixRatio)+mixRatio*backgroundColor[2];
    mixRatio=mixRatio*mixRatioFade;




}

function draw() {

    //Updaten der Eingabewerte vom GUI:

    mixRatioFade=options.MixFade;
    fader=options.FaderValue;
    lowRadiusLimit=options.LowLimitRadius;
    highRadiusLimit=options.HighLimitRadius;
    rectWidth=options.rectangleWidth;
    rectHeight=options.rectangleHeight;
    lowRadiusLimit=options.LowLimitRadius;
    highRadiusLimit=options.HighLimitRadius;
    rectWidth=options.rectangleWidth;
    rectHeight=options.rectangleHeight;
    fader=options.FaderValue;
    mixRatioFade=options.MixFade;
    //numOfDiamonds=options.NumberDia;

    //Wenn wir die Liftfahrt nicht über die Tasten steuern, sondern als Zeit nach dem Pressen des Space-key:
    if((reset==true)&&(timeDriver==0)){
        timeDriver=timestamp();
        //console.log("Hallo");
    }else if(((timestamp()-timeDriver)>=3000)&&((timestamp()-timeDriver)<4000)&&(reset==false)){
        //Es soll eine Aufwärtsbewegung sein:
        console.log("move1: "+move);
        move=+1;
        //Wir säubern den Hintergrund, wenn Bewegung startet
    }

    //console.log("timestampdiff"+(timestamp()-timeDriver));
    //console.log("reset"+reset);


    if(reset==true){
        background(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
        reset=false;
    }

    //Geschwindigkeit mit der Farbwechsel Hintergrundfarbe-Objektfarbe stattfindet
    //Nachdem ich Punkte gezeichnet habe, passe ich nach jeder fader-Zeit die Farbe an.
    if(((timestamp()-reFadeTime)>fader)){


        mixColor[0]=rectColor[0]*(1-mixRatio)+mixRatio*backgroundColor[0];
        mixColor[1]=rectColor[1]*(1-mixRatio)+mixRatio*backgroundColor[1];
        mixColor[2]=rectColor[2]*(1-mixRatio)+mixRatio*backgroundColor[2];
        mixRatio=mixRatio*mixRatioFade;
        reFadeTime=timestamp();

        //
        //Hier führe ich noch einnen Blurr ein
        //console.log("Move:"+move);


    }


    if((counter<=0)){
        //Zuerst füllen wir die Liste mit der maximalen Anzahl Diamanten pro Durchlauf:
        //console.log("Du Da!: ");

        for(let i=0;i<numOfDiamonds;i++){
            rectPosX=random(0,windowWidth1);
            rectPosY=random(elevatorCenter-stripeWidth,elevatorCenter);
            diamant=new Diamond(rectPosX,rectPosY,(rectWidth+random(0,rectWidth)),(rectHeight+random(0,rectHeight)),mixColor,opacity,1,(PI/4.0));
            diamondList[i] = diamant;
            currentDiamondNumber = currentDiamondNumber + 1;
        }
        counter=counter+1;



        //Wir zeichnen einen neuen Satz Diamanten.
    }else if(((timestamp()-redrawTime)>10)){
        //Wenn noch genügend Diamantenplätze vorhanden sind, erzeugen wir bei jedem Durchgang einen neuen Diamanten.
        //und fügen diesen der Liste hinzu.
        //console.log("rectPosX:"+rectPosX);
        //console.log("rectPosY: "+rectPosY);


        let colorCase=toInt(random(0,2.9));

        switch(colorCase){

            case 0 : rectColor[0]=255;
                     rectColor[1]=random(0,30);
                     rectColor[2]=random(0,30);
                break;
            case 1 : rectColor[1]=255;
                    rectColor[0]=random(0,30);
                    rectColor[2]=random(0,30);
                break;
            case 2:  rectColor[2]=255;
                     rectColor[1]=random(0,30);
                     rectColor[0]=random(0,30);
                    break;

        }

        mixColor[0]=rectColor[0]*(1-mixRatio)+mixRatio*backgroundColor[0];
        mixColor[1]=rectColor[1]*(1-mixRatio)+mixRatio*backgroundColor[1];
        mixColor[2]=rectColor[2]*(1-mixRatio)+mixRatio*backgroundColor[2];
        opacity=origOpacity;

        //console.log("Move:"+ move);
        //console.log("MoveOld:"+ moveOld);

        for(let i=0;i<numOfDiamonds;i++){
            rectPosX=random(0,windowWidth1);
            rectPosY=random(0,windowHeight1);


            if(move<(-0.1)){
                //console.log("Hier1");
                elevatorScaler=elevatorScaler*0.999;
                //rectPosY=random(windowHeight1-elevatorScaler,0.7*windowHeight1);
                rectPosY=random(elevatorCenter+(elevatorCenter-elevatorScaler),elevatorCenter+(elevatorCenter-elevatorScaler)+stripeWidth);
                moveOld=move;
            } else if(move>(0.1)){
                //console.log("Hier2");
                elevatorScaler=elevatorScaler*0.999;
                rectPosY=random(elevatorScaler,elevatorScaler-stripeWidth);
                moveOld=move;

            } else{
                //Wenn der Move-Zyklus abgeschlossen ist, soll der Streifen wieder zurückwandern.
                //console.log("Hier3");
                if(elevatorScaler<elevatorCenter){
                    elevatorScaler=elevatorScaler*1.002;
                }else{
                    elevatorScaler=elevatorCenter;
                }

                if(moveOld<(-0.1)){
                    //console.log("Hier4:");
                    rectPosY=random(elevatorCenter+(elevatorCenter-elevatorScaler),elevatorCenter+(elevatorCenter-elevatorScaler)+stripeWidth);
                }else if(moveOld>(0.1)){
                    //console.log("Hier5:");
                    rectPosY=random(elevatorScaler,elevatorScaler-stripeWidth);
                }else{
                    //console.log("Hier6:");
                    rectPosY=random(elevatorCenter-stripeWidth,elevatorCenter);
                }
            }
            //console.log("elevatorScaler:"+elevatorScaler);
            //console.log("lowLimit:"+0.1*windowHeight1);

            diamant=new Diamond(rectPosX,rectPosY,rectWidth,rectHeight,mixColor,opacity,1,(PI/4.0));
            diamondList[i] = diamant;

            //Falls der Scaler zu klein wird.
            if(elevatorScaler<elevatorCenter/2){
                elevatorScaler=elevatorCenter/2;
            }


            //Wenn Elevator wieder voll ausgewachsen ist
            if(elevatorScaler>1*elevatorCenter){
                elevatorScaler=elevatorCenter;
                move=0;
                moveOld=0;}
        }



        redrawTime=timestamp();



    };

    //console.log("redrawtime: "+(timestamp()-redrawTime));


    //Hier zeichnen wir die Diamanten bei jedem Durchlauf.
    //Nach jeweils 1000ms wird eine Neue Liste erstellt.

    push()

    for(let i=0;i<numOfDiamonds;i++){
        //push();
        //Bewirkt, dass die Tropfen unregelmässig gross werden.
        //Dies weil das scale in und nicht ausserhalb der Schleife ist.
        //scale(1.05);
        //console.log("zeichnen");
        diamondList[i].draw();
        //pop();
    }
    pop();
    //translate(0,move);
    if(((timestamp()-reBackgroundTime)>backgroundFader)) {
        background(backgroundColor[0], backgroundColor[1], backgroundColor[2], 2);
    }


    //Hier beginnen wir zu zählen, nachdem der Lift gestartet ist.
    if((move!=0)&&(resetTrigger==false)){
        resetTime=timestamp();
        resetTrigger=true;
    }

    //console.log("move:"+move);

    //Hier setzen wir die Bewegung nach einer gewissen Zeit zurück:
    //Heisst der Streifen von mOve -1 und Move 1 wird wieder abgebaut.
    if((resetTrigger==true)&&((timestamp()-resetTime)>4000)){
        resetTime=timestamp();
        resetTrigger=false;
        move=0;
    }

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
    //if (keyCode === 38){move=-1} ;
    //40 ist lift fährt runter
    //if (keyCode === 40)move=+1;
    //console.log(keyCode);

    if (keyCode === 32){
        move=0;
        reset=true;
        timeDriver=0;
        //console.log("yes");
    }
}

function keyReleased() {
    //38 ist lift fährt rauf
    /*    if (key == 'w' ||key == 'W'){moveMountain=0;}
        //40 ist lift fährt runter
        if (key == 's' ||key == 'S'){moveMountain=0;}*/
    //if (keyCode === 38){move=0;}
    //40 ist lift fährt runter
    //if (keyCode === 40){move=0;}
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

        //console.log("randomnumber:");

        this.draw = function() {
            //Mit push() speichern wir die aktuellen Drawing settings.
            push();
            noStroke();
            //console.log("colorofrectangle"+_color);
            //console.log("Opacity"+_opacity)
            //fill(_color,_opacity);
            fill(_color[0],_color[1],_color[2],_opacity);

            //rect(_posX,_posY,scale*_width,scale*_height,radius[0],radius[1],radius[2],radius[3]);
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


        radiusArray=new Array(4);

        if(_width>_height){
            radiusBase=_height;
        }else{
            radiusBase=_width;
        }


        //Hier berechnen wir die Radien der Ecken.
        randomRadius1=random(radiusBase/lowRadiusLimit,radiusBase/highRadiusLimit);
        randomRadius2=random(radiusBase/lowRadiusLimit,radiusBase/highRadiusLimit);
        randomRadius3=random(radiusBase/lowRadiusLimit,radiusBase/highRadiusLimit);
        randomRadius4=random(radiusBase/lowRadiusLimit,radiusBase/highRadiusLimit);
        radiusArray[0]=randomRadius1;
        radiusArray[1]=randomRadius2;
        radiusArray[2]=randomRadius3;
        radiusArray[3]=randomRadius4;
        shiftRectX=random(-radiusBase/4,radiusBase/4);
        if(random(-1,1)>=0){randomSigma=1}else(randomSigma=-1);
        shiftRectY=shiftRectX*randomSigma;


        this.draw = function() {
            //Mit push() speichern wir die aktuellen Drawing settings.

            //Wie das darunterliegende Rechteck verschoben wird.

            //randOpacity=opacity*random(0.25,0.75);
            rand_rect2=new randomRectangle(0,0,_width,_height,_color,_opacity,_scale,radiusArray);
            rand_rect=new randomRectangle(0+shiftRectX,0+shiftRectY,_width,_height,_color,_opacity,_scale,radiusArray);


            push();
            translate(_posX,_posY);
            rotate(_rotation);
            rand_rect2.draw();

            //Verbindungslinie zwischen oberem und unterem Rechteck
            //unteres Rechteck
            linePoint1=createVector(0+radiusArray[0],0+radiusArray[0]);
            //point(linePoint1.x,linePoint1.y);
            linePoint2=createVector(0+_width-radiusArray[1],0+radiusArray[1]);
            //point(linePoint2.x,linePoint2.y);
            linePoint3=createVector(0+radiusArray[3],0+_height-radiusArray[3]);
            //point(linePoint3.x,linePoint3.y);
            linePoint4=createVector(0+_width-radiusArray[2],0+_width-radiusArray[2]);
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
            stroke(_color[0],_color[1],_color[2],_opacity);
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


function windowResized() {
    resizeCanvas(windowWidth, windowHeight, false);
}

function blurrFunction(imagePoints,resolution) {

}