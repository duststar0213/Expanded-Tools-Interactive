var font;
var vehicles = [];
var t = "";
var points;
var pt;
var vehicle;
let song, analyzer;
let sis =0;
var can;
function preload() {
  font = loadFont('line.ttf');
  song = loadSound('Assets/Nervous.mp3');
}
alert("Welcome to this particle type writer! type Anything you want, and then press the mouse");
function setup() {
  can= createCanvas(windowWidth, windowHeight);
  // song.play();
  background(0);

  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();

  // Patch the input to an volume analyzer
  analyzer.setInput(song);

  /*points = font.textToPoints(t, 100, 200, 82, {
   sampleFactor:   10.25
   }
   );
   
   for (var i = 0; i < points.length; i++) {
   var pt = points[i];
   var vehicle = new Vehicle(pt.x, pt.y,0,0);
   vehicles.push(vehicle);
   }*/
  can.mouseClicked(function() {

    if (song.isPlaying()) {
      //  translate(mouseX,mouseY);
      // .isPlaying() returns a boolean
      song.stop();
      sis= 1;
      //translate(mouseX,0);

      //  background(255, 0, 0);
    } else {
      // sis=0;
      song.play();
    // rotate(mouseX);
      // background(0, 255, 0);
    }
  }
  );
}


function keyPressed() {
  if ( keyCode >= 65 && keyCode <= 90) {
    if (t.length * 50 < windowWidth) {
      t+=key;
      points = font.textToPoints(t, 120, height/2, 120, {
      sampleFactor: 
        0.25
      }
      );
      for (var i = 0; i < points.length; i++) {
        pt = points[i];
        vehicle = new Vehicle(pt.x, pt.y, 3);
        vehicles.push(vehicle);
      }
    }
    if (t.length * 50 >= windowWidth) {

      alert("You reached the limit");
    }
  }

  if (keyCode === 8) {
    alert("Sorry, this feature is not yet working!");
  }
  if (keyCode === 32) {

    t+=" ";
  }
}



function draw() {
  background(0, 0, 0, 15);
   var rms = analyzer.getLevel();
   var ration = map(rms, 0, 1, frameCount,mouseX);
console.log(rms);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];

    v.behaviors(mouseX+rms*random(2300,5000), mouseY+rms*2300);
    v.update(1.5+random(rms,rms*2), random(rms,rms*12));
    v.show(2.5+rms*5);

  }
  
 // console.log(rms*frameCount*200);
}
