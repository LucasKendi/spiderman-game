var lineMultiplic = 5;

function Player() {
  this.rad = 10;
  this.acceleration = createVector(0, 0);
  this.position = createVector(this.rad, height - this.rad);
  this.velocity = createVector(0, 0);
  this.jumpVector = createVector(0, -20);
  this.moveStrength = 1;
  this.hookLen = 1000;
  this.maxSpeed = 20;

  this.gravity = createVector(0, 1);
  this.airRes = .90;
  this.mouseVector = createVector(0, 0);
  this.hook = createVector(0, 0);
  this.tan = createVector(0, 0);
  this.tangent = createVector(0, 0);
  this.tension = createVector(0, 0);

	this.show = function() {
    push();
    translate(this.position.x, this.position.y);
    rectMode(CENTER);
    fill(167, 24, 20);
    stroke(10, 43, 78);
    strokeWeight(2);
    ellipse(0, 0, 2*this.rad);
    this.drawVelocity();
    pop();
	}

  this.update = function() {
    if(mouseIsPressed) {
      this.hooking();
      this.mouseVector.set([mouseX, mouseY]);
    }
    else {
      this.keepHooked(this.mouseVector);
      this.drawHook();
    }
    this.applyForce(this.gravity);
    this.applyPhysics();
    this.Bounce();
    this.airDrag();
  }

  this.applyPhysics = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }
  
  this.Bounce = function() {
    if(this.position.x < this.rad) {
      this.position.x = this.rad;
      this.velocity.x = 0;
    }

    if(this.position.x > width - this.rad) {
      this.position.x = width - this.rad;
      this.velocity.x = 0;
    }

    if(this.position.y < this.rad) {
      this.position.y = this.rad;
      this.velocity.y = 0;
    }

    if(this.position.y > height - this.rad) {
      this.position.y = height - this.rad;
      this.velocity.y = 0;
    }
  }

  this.jump = function() {
    if(this.isStanding()) {
     this.applyForce(this.jumpVector);
    }
  }
  this.airDrag = function() {
    this.velocity.mult(this.airRes);
  }

  this.isStanding = function() {
    return this.position.y === height - this.rad;
  }

  this.move = function() {
    if(keyIsDown(32)) {
      this.jump();
    }

    if(keyIsDown(65)) {
      this.applyForce(createVector(-this.moveStrength, 0));
    }

    if(keyIsDown(68)) {
      this.applyForce(createVector(this.moveStrength, 0));
    }

    if(keyIsDown(83)) {
      this.applyForce(createVector(0, this.moveStrength));
    }
  }

  this.hooking = function() {
    this.hookLen = this.position.dist(this.mouseVector);
  }

  this.keepHooked = function(vector) {
	//if(this.position.dist(vector) > this.hookLen) {
	    this.hook = p5.Vector.sub(this.position, this.mouseVector);
	    this.hook.limit(this.velocity.mag());
	    this.tan = p5.Vector.sub(this.velocity, this.hook);
	    this.tangent = this.hook.rotate(HALF_PI);
		  newX = this.velocity.x;
		  newY = this.velocity.y;
		  this.tension = createVector(newX, newY);
		//  this.applyForce(this.tan.mult(0.2))
		//  this.velocity.add(this.tan.mult(0.5));
	  //}
  }

  this.drawHook = function() {
    stroke(200);
    line(this.position.x, this.position.y, this.mouseVector.x, this.mouseVector.y);
    noFill();
    ellipse(this.mouseVector.x, this.mouseVector.y, 2*this.hookLen);
  }

  this.drawVelocity = function() {
  	strokeWeight(2);
    stroke(255,0,0);
    line(0, 0, lineMultiplic*this.velocity.x, lineMultiplic*this.velocity.y);
    stroke(0,255,0);
    line(0, 0, lineMultiplic*this.hook.x, lineMultiplic*this.hook.y);
    stroke(0,0,255);
    line(0, 0, lineMultiplic*this.tan.x, lineMultiplic*this.tan.y);
  	strokeWeight(1);
    stroke(200,200,40);
    line(0, 0, lineMultiplic*this.tangent.x, lineMultiplic*this.tangent.y);
  }
}