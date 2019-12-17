// Based on the code P_2_2_5_01.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9


/*
var options = {
    numberOfMountains: 2,
    numberOfPeaks: 3,
    opacity: 100,
    colorShade: 255,
};
*/


//Eingabe der  Mountains evtl. über UI machen.
var numberOfPoints=40; //Mit Anfangs- und Endpunkt.
var windowWidth1=6480;
var windowHeight1=3840;

var mountains;
var time;
var oldtime;
//Zeit, welche der Lift braucht.
var runTime;
var reset;
//Der Berg soll sich entsprechend den up/down-keys bewegen.
var moveMountain=0;
//Grösse der Bewegung des Mountains.
var diffMountain=2;
//Starten der Animation, beenden des Setups;
var start;
var timeDiff;
var temporaryPeakPoints;
var temporaryMountainPoints;
var peakUpdate;
var peakTime;

//Um die Spitzen bewegen zu können;
let temporaryWave=new Array(options.numberOfMountains);
let temporaryWaveCounter=new Array(options.numberOfMountains);

function setup() {
    // Canvas setup
    canvas = createCanvas(windowWidth1, windowHeight1);
    canvas.parent("p5Container");
    // Detect screen density (retina)
    var density = displayDensity();
    oldtime=timestamp();
    peakTime=timestamp();
    start=false;
    reset=false;
    runTime=6000;
    //Wenn die neue Peakposition angepasst wird.
    peakUpdate=1000;
    pixelDensity(density);
    mountains= new Array(options.numberOfMountains);
    for (let j = 0; j <= options.numberOfMountains; j++) {
        mountains[j]=new mountainElement(options.numberOfPeaks,(2.5*windowHeight1 / options.numberOfMountains) * j,1.9*windowWidth1,1);
        temporaryWave[j]=0;
        temporaryWaveCounter[j]=0;
    }

    background(255);
    rectMode(CENTER);
    smooth();
    mountains[0].draw();
    mountains[1].draw();

    //Nun wird jedes Mountain-Element mit jedem verbunden. Im connectMountains wird dieses auch gleich gezeichnet!!
    for (let k = 0; k <= options.numberOfMountains; k++) {
        for (let l = 0; l <= options.numberOfMountains; l++) {
            connectMountains(mountains[k], mountains[l]);
        }
    }
}

function draw() {


    console.log("Start: "+start);
    //Berg-Bewegung zurücksetzen, falls diese länger als 3 Sekunden dauert.
    //*******************************
    if (start == false) {
        timeDiff=0;
        mountains = new Array(options.numberOfMountains);
        for (let j = 0; j <= options.numberOfMountains; j++) {
            //Wir machen die Mountains deutlich breiter als die Canvas, so können wir die Peaks innerhalb der
            //Canvas leicht verschieben, ohne auf die Grösse des Arrays zu achten.
            mountains[j] = new mountainElement(options.numberOfPeaks, (2.5*windowHeight1 / (options.numberOfMountains+1)) * j, 1.9*windowWidth1, 1);
            temporaryWave[j] = 0;
            temporaryWaveCounter[j] = 0;
        }

        //Evtl. alles in Graustufen zeichnen????
        background(255);
        rectMode(CENTER);
        smooth();
        mountains[0].draw();
        mountains[1].draw();
        oldtime=timestamp();

        //Nun wird jedes Mountain-Element mit jedem verbunden.
        for (let k = 0; k <= options.numberOfMountains; k++) {
            for (let l = 0; l <= options.numberOfMountains; l++) {
                connectMountains(mountains[k], mountains[l]);
            }
        }


        //Nachdem wir den Space-Key gedrückt haben, starten wir die Simulation
    } else {

        //In Millisekunden
        time = timestamp();
        timeDiff = time - oldtime;

        //Nachdem der Lift ein wenig gefahren ist, setzen wir die Bewegung aus.
        if((timeDiff>runTime)&&(moveMountain!=0)){
            moveMountain=0;
        }

        //Die Berge werden entsprechen dem Move verschoben
        //Die Peaks werden entsprechen dem Move verschoben
        for (let l = 0; l <= options.numberOfMountains; l++) {

            //Bei jedem Durchgang wird nun ein Teil der Temporarywave angewandt, bis sie bei 0 ist.
            //Falls die "W" oder "S"-Taste gedrückt wird, hat auch MoveMountain einen anderen Wert und wird
            //angepasst.
            temporaryPeakPoints = mountains[l].getPeakPoints();
            //Wir erstellen die zufälligen Verschiebungswerte der Peakpoints jedes Mountain.

            //nach einer gewissen Zeitspanne wird das Temporary Wave erneut berechnet
            if((timestamp()-peakTime)>peakUpdate){
                temporaryWave[l] = toInt(random(-windowWidth1, windowWidth1));
            }

            //Innerhalb von 1000 Frames wird die Verschiebung umgesetzt.
            //Wollen wir eine höhere Geschwindigkeit so reduzieren wir die Framenummer
            temporaryWaveCounter[l] = temporaryWave[l] / 500;
            for (let m = 1; m <= (options.numberOfPeaks-2); m++) {

                //Damit die neuen Punkte nicht über das Fenster hinauslappen:
                if (((temporaryPeakPoints[m].x + temporaryWave[l]) < windowWidth1) && ((temporaryPeakPoints[m].x + temporaryWave[l]) > 0)) {
                    temporaryPeakPoints[m] = createVector(temporaryPeakPoints[m].x + temporaryWaveCounter[l], temporaryPeakPoints[m].y);
                }
            }

            //Hier setze ich die verschobenen Peak-Points.
            mountains[l].setPeakPoints(temporaryPeakPoints);
            //Die Verschiebung dauert so lange, bis der Verschiebevektor abgearbeitet ist.
            if (abs(temporaryWave[l]) > abs(temporaryWaveCounter[l])) {
                temporaryWave[l] = temporaryWave[l] - temporaryWaveCounter[l];
            } else {
                temporaryWave[l] = 0;
                temporaryWaveCounter[l] = 0;
            }

            temporaryPeakPoints = mountains[l].getPeakPoints();
            temporaryMountainPoints = mountains[l].getmountainPoints();

            for (let k = 0; k <= (numberOfPoints-1); k++) {
                temporaryMountainPoints[k] = createVector(temporaryMountainPoints[k].x, temporaryMountainPoints[k].y+moveMountain);
            }

            for (let m = 0; m <= options.numberOfPeaks; m++) {
                temporaryPeakPoints[m] = createVector(temporaryPeakPoints[m].x, temporaryPeakPoints[m].y + moveMountain);
            }
            mountains[l].setPeakPoints(temporaryPeakPoints);
            mountains[l].setMountainPoints(temporaryMountainPoints);
        }

        if((timestamp()-peakTime)>peakUpdate){
            peakTime=timestamp();
        }

        //console.log("Temp Mountain Points Out1: "+mountains[0].getmountainPoints());
        //Die neu positionierten Peaks werden verbunden
        for (let k = 0; k <= options.numberOfMountains; k++) {
            for (let l = 0; l <= options.numberOfMountains; l++) {
                connectMountains(mountains[k], mountains[l]);
            }
        }

        if(abs(moveMountain)>0){
        }
    }
}

//A Line, which will be connected with an other line by the function connect() to triangles.
class mountainElement {
    constructor(peaks,height,width,iterationDepth){
        let _peaks = peaks;
        let _height = height;
        let _width = width;
        let _iterationDepth = iterationDepth;
        let peakPoints= new Array(peaks);
        let mountainPoints= new Array(numberOfPoints);
        let colorMountain=new Array(4);

        this.getPeaks = function() { return _peaks; }
        this.getPeakPoints = function() { return peakPoints; }
        this.getColorMountain = function() { return colorMountain; }
        this.getHeight = function() { return _height; }
        this.getWidth = function() { return _width; }
        this.getiterationDepth = function() { return _iterationDepth; }
        this.getmountainPoints = function() { return mountainPoints; }
        this.setPeaks = function(peaks) { _peaks = peaks; }
        this.setHeight = function(height) { _height = height; }
        this.setWidth = function(width) { _width = width; }
        this.setIterationDepth = function(iterationDepth) { _iterationDepth = iterationDepth; }
        this.setPeakPoints = function(newPeakPoints) {
            this.peakPoints = newPeakPoints;}

        this.setMountainPoints = function(newMountainPoints) {
            this.MountainPoints = newMountainPoints;}

        let a;
        let verhaeltnis=_width/numberOfPoints;
        //Wir befüllen die Matrix mit Punkten
        for (let i = 0; i <= (numberOfPoints-1); i++) {
            mountainPoints[i]=createVector(i*verhaeltnis, _height/2);
        }

        //Wir geben dem Berg eine Farbskala;
        //Ich entscheide mich dafür bei der "blau-gelben"-Farbskala zu bleiben.
        colorMountain=createVector(toInt(random(0,255)),options.colorShade,toInt(random(0,255)),options.opacity);

        //Die Randpunkte sollen fixiert werden:
        peakPoints[0]=createVector(mountainPoints[0].x,mountainPoints[0].y);
        //Wir setzen die Peaks der Berge
        for (let j = 1; j <= (peaks-1); j++) {
            let point=toInt(random(1,(numberOfPoints-2)));
            //Die Peakpoints erhalten die doppelte Menge der Punkte. Nämlich auch die gespiegelten.
            peakPoints[j]=createVector(mountainPoints[point].x,mountainPoints[point].y);
        }
        peakPoints[peaks]=createVector(mountainPoints[numberOfPoints-1].x,mountainPoints[numberOfPoints-1].y);
        peakPoints.sort(compareVectors);

        this.draw = function() {
            //push()
            strokeWeight(1);
            fill(colorMountain[0],colorMountain[1],colorMountain[2],colorMountain[3]);
            beginShape();
            for (let i = 0; i <= (numberOfPoints-1); i++) {
                vertex(mountainPoints[i].x, mountainPoints[i].y);
            }
            endShape();
            //pop()
        }

    }
}

function keyPressed() {

    //38 ist lift fährt rauf
    /*    if (key == 'w' ||key == 'W'){moveMountain=-diffMountain;}
        //40 ist lift fährt runter
        if (key == 's' ||key == 'S'){moveMountain=+diffMountain;}*/

    //38 ist lift fährt rauf
    if (keyCode === 38){
        moveMountain=-diffMountain;
        oldtime=timestamp();} ;
    //40 ist lift fährt runter
    if (keyCode === 40){
        moveMountain=+diffMountain;
        oldtime=timestamp();}
    //console.log(keyCode);

    if (keyCode === 32){
        if(start==false){ start=true;}
        else if(start==true){start=false;};
        reset=false;
        moveMountain=0;
        oldtime=timestamp();}
}

function keyReleased() {
    //38 ist lift fährt rauf
    /*    if (key == 'w' ||key == 'W'){moveMountain=0;}
        //40 ist lift fährt runter
        if (key == 's' ||key == 'S'){moveMountain=0;}*/
}


// Tools

// resize canvas when the window is resized
function windowResized() {
    resizeCanvas(windowWidth1, windowHeight1, false);
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

function connectMountains(mount1, mount2) {
    let _mount1 = mount1;
    let _mount2 = mount2;
    let peak1;
    let peak2;

    peak1=mount1.getPeaks();
    peak2=mount2.getPeaks();

    //Die Peaks und die Anfang und Schlusspunkte
    //Die Verdoppelung des Peak ist nötig, da es sich ja um zwei Berge handelt.
    let connectMount= new Array((2*peak1+4));
    let connectColor=[0,0,0];

    //Die zweite Ziffer gibt an, zu welchem Mount der Punkt gehört.
    //Die dritte Ziffer speichert den Farbwert;
    connectMount[0]=[mount1.getmountainPoints()[0],1,mount1.getColorMountain()];
    connectMount[1]=[mount2.getmountainPoints()[0],2,mount2.getColorMountain()];

    //Hier lese ich die Peak-Positionen ein.
    for (let j = 0; j < (2*peak1+2); j++) {
        connectMount[2+2*j]=[mount1.getPeakPoints()[j],1,mount1.getColorMountain()];
        connectMount[3+2*j]=[mount2.getPeakPoints()[j],2,mount2.getColorMountain()];
    }

    connectMount[2*peak1+3]=[mount2.getmountainPoints()[numberOfPoints],2,mount1.getColorMountain()];
    connectMount[2*peak1+4]=[mount1.getmountainPoints()[numberOfPoints],1,mount2.getColorMountain()];
    strokeWeight(1);
    fill(255,255,255);

    for (let i = 0; i <= ((2*peak1)); i++) {
        //Calculate color of triangle.
        beginShape();
        //Calculate color of triangle.
        let base;
        let ratio;
        let colorConnect=[];

        //Volle Farbstärke, wenn die Höhe gleich gross ist wie die Basis
        //Zuerst prüfen, wir, welche Berge zum gleichen  Mount gehören.
        if(connectMount[i][1]==connectMount[i+1][1]){
            base=abs(connectMount[i][0].x-connectMount[i+1][0].x);
            if(base>abs((connectMount[i][0].y-connectMount[i+1][0].y))){
                ratio= abs((connectMount[i][0].y-connectMount[i+1][0].y))/base
            }else{
                ratio=base/abs((connectMount[i][0].y-connectMount[i+1][0].y));
            }
            colorConnect[i]=p5.Vector.mult(connectMount[i][2],ratio).add(p5.Vector.mult(connectMount[i+2][2],(1-ratio)));

        }else if(connectMount[i][1]==connectMount[i+2][1]){
            base=abs(connectMount[i][0].x-connectMount[i+2][0].x);

            if(base>abs((connectMount[i+1][0].y-connectMount[i+2][0].y))){
                ratio= abs((connectMount[i+1][0].y-connectMount[i+2][0].y))/base
            }else{
                ratio=base/abs((connectMount[i+1][0].y-connectMount[i+2][0].y));
            }
            colorConnect[i]=p5.Vector.mult(connectMount[i][2],ratio).add(p5.Vector.mult(connectMount[i+1][2],(1-ratio)));

        } else{
            base=abs(connectMount[i+1][0].x-connectMount[i+2][0].x);
            if(base>abs((connectMount[i][0].y-connectMount[i+2][0].y))){
                ratio= abs((connectMount[i][0].y-connectMount[i+2][0].y))/base
            }else{
                ratio=base/abs((connectMount[i][0].y-connectMount[i+2][0].y));
            }
            colorConnect[i]=ratio*connectMount[i][2]+(1-ratio)*connectMount[i+1][2];
            colorConnect[i]=p5.Vector.mult(connectMount[i+1][2],ratio).add(p5.Vector.mult(connectMount[i][2],(1-ratio)));
        }

        //In einem Vektor sind die Farb-Komponenten als x,y,z abgelegt.
        fill(colorConnect[i].x,colorConnect[i].y,colorConnect[i].z,options.opacity);
        vertex(connectMount[i][0].x, connectMount[i][0].y);
        vertex(connectMount[i+1][0].x, connectMount[i+1][0].y);
        vertex(connectMount[i+2][0].x, connectMount[i+2][0].y);
        endShape();
    }
}


//*************************************************************3
