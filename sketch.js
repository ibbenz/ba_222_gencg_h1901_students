
//GUI
var options = {

    randomLineLength_upper: 100,
    randomLineLength_lower: 10,
    horizontalDivisions:    1,
    verticalDivisions:  20,
    repetitionLine: 100,
    repetitionTime: 100,
    lineStroke: 1,
    colorShade: 200,

    //NumberDia: 10,
};

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
let start;
let resetTime;
let resetTrigger;
//Bereinigen des Backgrounds
let backgroundReset;

//Winkel, um den die Linie rotiert:
let rotateAngleDeg;

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

//Wenn wir das Programm nicht durch Tastendruck,
//sondern als zeitliche Abfolge Programmieren.
let timeDriver;

function setup() {
    // Canvas setup
    canvas = createCanvas(windowWidth1, windowHeight1);
    canvas.parent("p5Container");
    // Detect screen density (retina)
    var density = displayDensity();
    pixelDensity(density);
    oldtime=timestamp();

    backgroundColor= new Array(0,0,50); //Blau
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
    rotateAngleDeg=45;
    timeDriver=0;
	//Damit wird der space-key nicht mehr benötigt
    start=true;
    reset=true;
    moveDifference=1;
    backgroundReset=true;
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
                //Wir sorgen noch für ein wenig Variation innerhalb des Streifens
                let variation = random(0, windowWidth1 / verticalDivisions);
                if (XPosition + variation < windowWidth1) {
                    LineArray.push(new Line(XPosition + variation, YPosition, XPosition + variation + lineLength, YPosition));
                }
            }
        }
    }
    for(let l=0;l<LineArray.length;l++){
        LineArray[l].draw();
    }
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

    if(backgroundReset==false){
        background(backgroundColor[0],backgroundColor[1],backgroundColor[2],10);
    }else{
        background(backgroundColor[0],backgroundColor[1],backgroundColor[2]);
        backgroundReset=true;
    }


    //Wenn wir die Liftfahrt nicht über die Tasten steuern, sondern als Zeit nach dem Pressen des Space-key:
    if((start==true)&&(timeDriver==0)){
        timeDriver=timestamp();
    }else if(((timestamp()-timeDriver)>=3000)&&((timestamp()-timeDriver)<4000)&&(start==true)){
        //Es soll eine Aufwärtsbewegung sein:
        move=+1;
        //Wir säubern den Hintergrund, wenn Bewegung startet
        backgroundReset=true;
        reset=false;
    }

    //Hier zeichnen wir die Linien immer und immer wieder, wenn das reset true ist.
    //Dies wird deaktiviert, sobald eine Bewegung stattfindet.
    if(reset==true){
        angle=0;
        referenceAngle=0;
        LineArray=[];
        //Die Linien werden gezeichnet:
        for(let i=-0.2*windowWidth1; i<(1.2*windowWidth1+1);i=i+windowWidth1/verticalDivisions){
            //X-Position des Startpunktes im Vertikalen Streifen wird festgelegt
            XPosition=random(i,i+windowWidth1/verticalDivisions);
            for(let j=(-windowHeight1/2); j<(3/2*windowHeight1+1);j=j+windowHeight1/horizontalDivisions) {
                for(let k=0; k<repetitionLine;k++) {
                    //Y-Position des Startpunktes im Quadranten innerhalb des vertikalen Streifens wird festgelegt.
                    YPosition = random(j, j + windowHeight1 / horizontalDivisions);
                    lineLength = random(randomLineLength_lower, randomLineLength_upper);
                    //Wir sorgen noch für ein wenig Variation innerhalb des Streifens
                    let variation = random(0, windowWidth1 / verticalDivisions);
                    if (XPosition + variation < windowWidth1) {
                        LineArray.push(new Line(XPosition + variation, YPosition, XPosition + variation + lineLength, YPosition));
                    }
                }
            }
        }

        if(start==true) {
            for (let l = 0; l < LineArray.length; l++) {
                LineArray[l].draw();
            }
        }
    };


    if((timestamp()-oldtime)>1){
        //Wenn Lift sich bewegt, dreht sich der Winkel um xxx Grad
        switch(move){
            case 0:
                //Hier drehen wir die bei 1 und -1 gesteigerten Winkel wieder zurück.
                //Wird nach einer Bewegung wieder 0, dann setzen wir die Move-Difference hoch
                //erst nach einem Reset ist diese wieder OK.
                //Damit Winkel nach dem Zurückdrehen nicht wieder am gleichen Ort landet,
                //addieren/subtrahieren wir jeweils 0.1.
                moveDifference=3;
                if(anglecounter<0){
                    angle=angle-(rotateAngleDeg*2*PI/360)-0.1;
                    anglecounter++;}

                if(anglecounter>0){
                    angle=angle+(rotateAngleDeg*2*PI/360)+0.1;
                    anglecounter--;}

                if(anglecounter==0){
                    //console.log("Hallo");
                    //Durch den ständigen Wechsel der Winkel gibt es nach der Bewegung diese Vögel.
                    //Aufgrund der unsauberen Division durch eine Zahl und den Rundungsfehlern??
                    if(angle>0){
                        //console.log("redux");
                        angle=angle-(rotateAngleDeg*2*PI/360);
                    }else if(angle<0){
                        //console.log("increase");
                        angle=angle+(rotateAngleDeg*2*PI/360);

                    }else{
                        angle=angle
                    }
                }
                break;

            //Solange Winkel grosser als -2Pi ist verkleinere ihn.
            case 1:
                reset=false;
                if(angle>(-2*PI)) {
                    angle = angle - (rotateAngleDeg*2 * PI / 360) * move;
                    referenceAngle=referenceAngle+(rotateAngleDeg*2 * PI / 360)
                    //console.log("Hier2");
                    anglecounter=anglecounter-1;
                }
                break;

            //Solange Winkel kleiner als 2Pi ist, erhöhe ihn
            case -1:
                reset=false;
                if(angle<(2*PI)) {
                    angle = angle - (rotateAngleDeg*2 * PI / 360) * move;
                    referenceAngle=referenceAngle-(rotateAngleDeg*2 * PI / 360)
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
        //Hier setzen wir die Bewegung nach einer gewissen Zeit zurück:
        //Heisst, Winkel dreht sich dann zurück.
        if((resetTrigger==true)&&((timestamp()-resetTime)>1000)){
            resetTime=timestamp();
            resetTrigger=false;
            console.log("Hier");
            move=0;
        }

        let helper1;
        let helper2;

        //Hier zeichnen wir die Linien.
        // Dies wird nur getan, wenn wir das Programm gestartet haben.
        //Hier drehen wir die Linien entsprechend dem vorgegebenen Winkel:

        if(start==true){
            for(let l=0;l<LineArray.length;l++){
                helper1=LineArray[l].getPosX1()+moveDifference*cos(angle);
                LineArray[l].setPosX1(helper1);
                helper2=LineArray[l].getPosY1()+moveDifference*sin(angle);
                LineArray[l].setPosY1(helper2);
                helper2=LineArray[l].getPosX1()+LineArray[l].getLength()*cos(angle)+moveDifference*cos(angle);
                LineArray[l].setPosX2(helper2);
                helper2=LineArray[l].getPosY1()+LineArray[l].getLength()*sin(angle)+moveDifference*sin(angle);
                LineArray[l].setPosY2(helper2);
                LineArray[l].draw();
                if(helper1>windowWidth1){
                    LineArray[l].setPosX1(0);
                    LineArray[l].setPosX2(0+LineArray[l].getLength());
                }
            }
        }
        //Den gesamten Background neu zu zeichnen setzt die Framerate massiv runter
        //Deshalb nicht regelmässig neu zeichnen.
        oldtime=timestamp();
    };
    backgroundReset=false;
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
            pop();
        }
    }
}


function keyPressed() {
    if (key == 'a' ||key == 'A') {start=true; };
    if (key == 'd' || key == 'D') start=false;

    //38 ist lift fährt rauf
    if (keyCode === 38){
        /*        move=-1;
                reset=false;
                //Wir säubern den Hintergrund, wenn Bewegung startet
                backgroundReset=true;*/
    }
    //40 ist lift fährt runter
    if (keyCode === 40){
        /*        move=+1;
                //Wir säubern den Hintergrund, wenn Bewegung startet
                backgroundReset=true;
                reset=false;*/}
    if (keyCode === 32){
        move=0;
        //reset=true;
        start=true;
        reset=true;
        moveDifference=1;
        backgroundReset=true;
        timeDriver=0;
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
