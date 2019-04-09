
var myFont;
var enter;
var diameter = 0.0;
var t = "";
var r=0;
let song, analyzer;
let sis =0;
var angle = 2.0;
var offset = 300;
var scalar = 3.5;
var speed = 0.1;
var px =10;
var py =0;
var rms;
var pt="";
function preload() {

  myFont = loadFont('line.ttf');
}

let bugs = []; // array of Jitter objects

function setup() {
  createCanvas(windowWidth, windowHeight);
  song = loadSound('Assets/yoy.mp3');
  background(0);
  textFont(myFont);
  textSize(90);

  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();

  // Patch the input to an volume analyzer
  analyzer.setInput(song);
}


function keyPressed() {
  if ( keyCode >= 65 && keyCode <= 90) {
    if (t.length * 50 < windowWidth) {
      t+=key;
    }
    if (t.length * 50 >= windowWidth) {

      alert("You reached the limit");
    }
  }

  if (keyCode === 8) {
    if (t.length > 0) {
      t = t.slice(0, -1);
    }
  }
  if (keyCode === 32) {

    t+=" ";
  }
}

function mousePressed() {

  if (song.isPlaying()) {
     //  translate(mouseX,mouseY);
    // .isPlaying() returns a boolean
    song.stop();
    sis= 1;
    translate(mouseX,0);

    //  background(255, 0, 0);
  } else {
    // sis=0;
    song.play();

    // background(0, 255, 0);
  }
}

function draw() {

  // fill(0, 0, 0, 35);
  background(0, 0, 0, 55);
  // rect(0, 0, width, height);
  // textSize(20);
  // text("Type anything", width/2, height/2-300);
  // text("After you finished typing, press the mouse", width/2-100, height/2-260);
  textSize(80);
  fill(random(255), random(255), random(255), 255); 
  noStroke();
  translate(40, height/4);


  path = myFont._getPath(t, px, py );
  //path =myFont.getBoundingBox();

  for (i=0; i<path.commands.length; i+=1)
  {

    fill(random(255), random(255), random(255), 255);

    //   textSize(50*rms*10);
    // rectMode(CENTER);
    rms = analyzer.getLevel();
    push();
    rotatingRect(path.commands[i].x, path.commands[i].y+rms*500, 4.5+rms*10, 4.5+rms*10,rms*10);
   scale(rms*10);
pop();
    //rotateZ(rms*10*frameCount);
    //translate(path.commands[i].x, path.commands[i].y+rms*500,-200);
    //box(20+rms*20);
    //pop();
    //ellipse(path.commands[i].x, path.commands[i].y+rms*400, rms*10, rms*10);
  }

  stroke(255);

  noFill();
  beginShape();
  for (i=0; i<path.commands.length; i+=1)
  {

    //  rotate(sin(mouseX));
    curveVertex(path.commands[i].x, path.commands[i].y-rms*8);
    curveVertex(path.commands[i].x, path.commands[i].y+rms*8);
    curveVertex(path.commands[i].x-rms*8, path.commands[i].y-rms*8);
    curveVertex(path.commands[i].x+rms*8, path.commands[i].y+rms*8);
  }


  endShape();
}

function rotatingRect(x, y, size, size,r) {


  translate(x, y);
    rotate(r);
    rectMode(CENTER);
  rect(0, 0, size, size);
  r = r + 0.02;
  resetMatrix();
}
