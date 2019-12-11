// Global var
var windowWidth1=6480;
var windowHeight1=3840;
var time;
var oldtime;

var backgroundColor;

//Move der Anfangspunkte der Linien
let move;
//Move der Endpunkte der Linien.
let move2;
let moveOld=0;
let moveDifference;
let randomLineLength_upper;
let randomLineLength_lower;

//Die Dicke gelben Linien
let lineStroke;
let lineLength;
let lineColor;
let colorShade;
let angle;
let referenceAngle;
let anglecounter;
let reset=false;
let resetTime;
let resetTrigger;


//X und Y-Position des Startpunktes.
let YPosition;
let XPosition;
let LineArray;
//In wieviele Quadranten die Zeichenfläche unterteilt werden soll.
let horizontalDivisions;
let verticalDivisions;

//Anzahl Linien die gleichzeitig gezeichnet werden.
let repetitionLine;
//Zeitlicher Abstand in dem dieses gleichzeitige Zeichnen geschieht
let repetitionTime;
let distance;


function setup() {


  // Canvas setup
  //canvas = createCanvas(windowWidth1, windowHeight1);
    canvas = createCanvas(windowWidth1, windowHeight1);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  oldtime=timestamp();

  //backgroundColor= new Array(170,255,245); //Blau
    backgroundColor= new Array(0,0,100); //Blau
    // backgroundColor= new Array(255,255,170); //Gelb
    //backgroundColor= new Array(255,170,255); //Pink
  background(backgroundColor[0],backgroundColor[1],backgroundColor[2]);
  repetitionLine=options.repetitionLine;
  repetitionTime=options.repetitionTime;
  horizontalDivisions=options.horizontalDivisions;
  verticalDivisions=options.verticalDivisions;
  randomLineLength_upper=options.randomLineLength_upper;
  randomLineLength_lower=options.randomLineLength_lower;
  lineStroke=options.lineStroke;
  lineLength=100;
  colorShade=options.colorShade;
  lineColor=color(255,colorShade,170);
  anglecounter=0;
  moveDifference=1;
  resetTime=0;
  resetTrigger=false;
  LineArray=[];

  //Winkel der Linie;
  angle=0;
  referenceAngle=0;
  move=0;
  //Move der Endpunkte der Linien.
    move2=0;


    for(let i=-0.2*windowWidth1; i<(1.2*windowWidth1+1);i=i+windowWidth1/verticalDivisions){
        //X-Position des Startpunktes im Vertikalen Streifen wird festgelegt
        XPosition=random(i,i+windowWidth1/verticalDivisions);
        for(let j=(-windowHeight1/2); j<(3/2*windowHeight1+1);j=j+windowHeight1/horizontalDivisions) {
            for(let k=0; k<repetitionLine;k++) {
                //Y-Position des Startpunktes im Quadranten innerhalb des vertikalen Streifens wird festgelegt.
                YPosition = random(j, j + windowHeight1 / horizontalDivisions);
                lineLength = random(randomLineLength_lower, randomLineLength_upper);
                //stroke(255,255,170);
                //Wir sorgen noch für ein wenig Variation innerhalb des Streifens
                let variation = random(0, windowWidth1 / verticalDivisions);
                //let variation=0;
                if (XPosition + variation < windowWidth1) {
                LineArray.push(new Line(XPosition + variation, YPosition, XPosition + variation + lineLength, YPosition));
                }
            }
        }
    }


    for(let l=0;l<LineArray.length;l++){
        LineArray[l].draw();
    }

    distance=0;

  

}

function draw() {


    repetitionLine=options.repetitionLine;
    repetitionTime=options.repetitionTime;
    horizontalDivisions=options.horizontalDivisions;
    verticalDivisions=options.verticalDivisions;
    randomLineLength_upper=options.randomLineLength_upper;
    randomLineLength_lower=options.randomLineLength_lower;
    lineStroke=options.lineStroke;
    colorShade=options.colorShade;

    if(reset==true){

        angle=0;
        referenceAngle=0;
        LineArray=[];


        for(let i=-0.2*windowWidth1; i<(1.2*windowWidth1+1);i=i+windowWidth1/verticalDivisions){
            //X-Position des Startpunktes im Vertikalen Streifen wird festgelegt
            XPosition=random(i,i+windowWidth1/verticalDivisions);
            for(let j=(-windowHeight1/2); j<(3/2*windowHeight1+1);j=j+windowHeight1/horizontalDivisions) {
                for(let k=0; k<repetitionLine;k++) {
                    //Y-Position des Startpunktes im Quadranten innerhalb des vertikalen Streifens wird festgelegt.
                    YPosition = random(j, j + windowHeight1 / horizontalDivisions);
                    lineLength = random(randomLineLength_lower, randomLineLength_upper);
                    //stroke(255,255,170);
                    //Wir sorgen noch für ein wenig Variation innerhalb des Streifens
                    let variation = random(0, windowWidth1 / verticalDivisions);
                    //let variation=0;
                    if (XPosition + variation < windowWidth1) {
                        LineArray.push(new Line(XPosition + variation, YPosition, XPosition + variation + lineLength, YPosition));
                    }
                }
            }
        }


        for(let l=0;l<LineArray.length;l++){
            LineArray[l].draw();
        }




    };




    if((timestamp()-oldtime)>2){
        background(backgroundColor[0],backgroundColor[1],backgroundColor[2],100);



    //Wenn Lift sich bewegt, dreht sich der Winkel um 1 Grad



    switch(move){

        case 0:
            if(anglecounter<0){
                angle=angle-(2*PI/360);
                anglecounter++;}

            if(anglecounter>0){
                angle=angle+(2*PI/360);
                anglecounter--;}

            if(anglecounter==0){
                //console.log("Hallo");
                if(angle>0){
                    //console.log("redux");
                    angle=angle-(2*PI/360);
                }else if(angle<0){
                    //console.log("increase");
                    angle=angle+(2*PI/360);

                }
            }

                //console.log("Hier1");

            break;

        case 1:
            if(angle>(-PI/2)) {
                angle = angle - (2 * PI / 360) * move;
                referenceAngle=referenceAngle+(2 * PI / 360)
                //console.log("Hier2");
                anglecounter=anglecounter-1;
            }

            break;



        case -1:
            if(angle<(PI/2)) {
                angle = angle - (2 * PI / 360) * move;
                referenceAngle=referenceAngle-(2 * PI / 360)
                anglecounter=anglecounter+1;

                //console.log("Hier3");
            }

            break;



    }

    //Hier beginnen wir zu zählen, nachdem der Lift gestartet ist.
        if((move!=0)&&(resetTrigger==false)){
            resetTime=timestamp();
            resetTrigger=true;
        }

        console.log("move:"+move);

        //Hier setzen wir die Bewegung nach einer gewissen Zeit zurück:
        if((resetTrigger==true)&&((timestamp()-resetTime)>3000)){
            resetTime=timestamp();
            resetTrigger=false;
            move=0;
        }


    //console.log("Arraylänge: "+LineArray.length);

    //console.log("angle: "+angle);

    let helper1;
    let helper2;

    for(let l=0;l<LineArray.length;l++){
        helper1=LineArray[l].getPosX1()+moveDifference*cos(angle);
        LineArray[l].setPosX1(helper1);
        helper2=LineArray[l].getPosY1()+moveDifference*sin(angle);
        LineArray[l].setPosY1(helper2);
        helper2=LineArray[l].getPosX1()+LineArray[l].getLength()*cos(angle)+moveDifference*cos(angle);
        //helper2=LineArray[l].getPosX2()+moveDifference*cos(angle);
        LineArray[l].setPosX2(helper2);
        helper2=LineArray[l].getPosY1()+LineArray[l].getLength()*sin(angle)+moveDifference*sin(angle);
        //helper2=LineArray[l].getPosY2()+moveDifference*sin(angle);
        LineArray[l].setPosY2(helper2);
        LineArray[l].draw();

        if(helper1>windowWidth1){
            LineArray[l].setPosX1(0);
            LineArray[l].setPosX2(0+LineArray[l].getLength());
        }
    }

    //stroke(0,0,0);
    //strokeWeight(100);
    //line(100,100,100+distance,2000);
    distance=distance+1;

    // Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
    let fps = frameRate();
    //fill(255);
    //stroke(0);
    //text("FPS: " + fps.toFixed(2), 100, 100 - 10);
    //console.log("Framerate: "+fps.toFixed(2));



    //Den gesamten Background neu zu zeichnen setzt die Framerate massiv runter
    //Deshalb nicht regelmässig neu zeichnen.

        oldtime=timestamp();

    };




        //noLoop()
//Falls Vektor mit Rechtecken voll ist, beginne ihn erneut von vorne zu füllen.

}

class Line {
    constructor(PointX1,PointY1,PointX2,PointY2){

        let _posX1 = PointX1;
        let _posY1 = PointY2;
        let _posX2 = PointX2;
        let _posY2 = PointY2;
        let _lineLength= ((_posX1-_posX2)^2+(_posY1-_posY2)^2)^(1/2)

        this.getPosX1 = function() { return _posX1; }
        this.getPosY1 = function() { return _posY1; }
        this.getPosX2 = function() { return _posX2; }
        this.getPosY2 = function() { return _posY2; }
        this.getLength = function() { return _lineLength; }

        this.setPosX1 = function(posX1) { _posX1 = posX1; }
        this.setPosY1 = function(posY1) { _posY1 = posY1; }
        this.setPosX2 = function(posX2) { _posX2 = posX2; }
        this.setPosY2 = function(posY2) { _posY2 = posY2; }

        this.draw = function() {
            push();
            strokeWeight(lineStroke);
            stroke(lineColor);
            line(_posX1,_posY1,_posX2,_posY2);
            //console.log("draw");
            pop();
        }
    }


}


function keyPressed() {
    if (key == 'a' ||key == 'A') {start=true; };
    if (key == 'd' || key == 'D') start=false;

    //38 ist lift fährt rauf
    /*    if (key == 'w' ||key == 'W'){moveMountain=-diffMountain;}
        //40 ist lift fährt runter
        if (key == 's' ||key == 'S'){moveMountain=+diffMountain;}*/

    //38 ist lift fährt rauf
    if (keyCode === 38){move=-1} ;
    //40 ist lift fährt runter
    if (keyCode === 40)move=+1;
    //console.log(keyCode);
   // if (keyCode === 32){reset=true;}
    if (keyCode === 32){
        move=0;
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

    //if (keyCode === 32){reset=false;}

    //if (keyCode === 32){move=0;}
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


function windowResized() {
    resizeCanvas(windowWidth, windowHeight, false);
}

function blurrFunction(imagePoints,resolution) {

}