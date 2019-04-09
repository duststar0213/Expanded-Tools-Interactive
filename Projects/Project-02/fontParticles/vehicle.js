

function Vehicle(x, y,size,ax,ay) {
  this.pos = createVector(random(width), random(height));
  this.target = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector(ax,ay);
  this.r = size;
  this.maxspeed = 15;
  this.maxforce = 10;
}

Vehicle.prototype.behaviors = function(offsetX,offsetY) {
  var arrive = this.arrive(this.target);
  var offset = createVector(offsetX, offsetY);
  var flee = this.flee(offset,offsetX, offsetY);


  arrive.mult(1);
  flee.mult(5);
  this.applyForce(arrive);
  this.applyForce(flee);
}

Vehicle.prototype.applyForce = function(f) {
  this.acc.add(f);
  
}

Vehicle.prototype.update = function(r,off) {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
  this.acc.add(off);
  this.r=r;
}

Vehicle.prototype.show = function(offset) {
var r= map(offset, 0, 1,0,255);
  stroke(random(255),random(255),255);
  strokeWeight(offset);
  var sc = map(this.r, 0, 1, 50, 100);
  //textSize(sc);
  point(this.pos.x, this.pos.y);
 // line(this.pos.x*cos(this.r), this.pos.y*sin(this.i),(this.pos.x+10)*(this.r-1), this.pos.y);
}


Vehicle.prototype.arrive = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxspeed;
  if (d < 50) {
    speed = map(d, 0, 200, 0, this.maxspeed);
    
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  if(desired.mag() < -2){
    var steer = p5.Vector.add(desired, this.vel);
  }
 // steer.limit(this.maxforce);
  return steer;
}

Vehicle.prototype.flee = function(target,rx,ry) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  if (d < 30) {
    desired.setMag(this.maxspeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}
