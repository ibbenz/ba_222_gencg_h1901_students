// Based on the code P_2_0_02.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

var position, velocity;

function setup() {
    // Canvas full page
    createCanvas(windowWidth, windowHeight);
    // Default screen density (for retina)
    var density = displayDensity();
    pixelDensity(density);
    // Var init
    background(0);
    position = createVector(0, 0);
    velocity = createVector(2.5, 5);
    smooth();
}

function draw() {
    noStroke();
    fill(0,20);
    rect(0,0,width,height);

    // Add the current speed to the location.
    position.add(velocity);

    // Check for bouncing
    if ((position.x > width) || (position.x < 0)) {
        velocity.x = velocity.x * -1;
    }
    if ((position.y > height) || (position.y < 0)) {
        velocity.y = velocity.y * -1;
    }

    // Display at x,y location
    stroke(0,50);
    fill(255);
    ellipse(position.x,position.y,16,16);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}