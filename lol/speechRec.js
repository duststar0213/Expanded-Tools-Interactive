var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
var vehicle;
var vehicles = [];
var points;
var pt;
var font;
//var dead;
function preload() {
  font = loadFont('line.ttf');
  //song = loadSound('Assets/Nervous.mp3');
}
function setup()
{  
  // graphics stuff:
  createCanvas(windowWidth, windowHeight);
  background(255, 255, 255);
  fill(0, 0, 0, 255);
  // instructions:
  textSize(1);
  textAlign(CENTER);
  text("say something..", width/2, height/2);
  myRec.onResult = showResult;
  myRec.start();
}
function draw()
{
  // why draw when you can talk?
showResult();
}
function showResult()
{
  if (myRec.resultValue==true) {
    background(192, 255, 192);
    //text(myRec.resultString, width/2, height/2);
    console.log(myRec.resultString);

    points = font.textToPoints(myRec.resultString, 120, height/2, 42, {
    sampleFactor: 
      0.2
    }
    );
    for (var i = 0; i < points.length; i++) {
      pt = points[i];
      vehicle = new Vehicle(pt.x, pt.y, 3);
      vehicles.push(vehicle);
    }

    for (var i = 0; i < vehicles.length; i++) {
      var v = vehicles[i];
      v.behaviors(mouseX,mouseY);
      v.update(2,3);
      v.show(2.5);
    }
      for (var i = vehicles.length-1; i>-1; i--) {
        if(vehicles.length>8000){
       vehicles.splice(i);
       
        }
    }
  }
}
