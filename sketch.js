let particles = [];
let y = 0; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(random(250,360), 100, random(100), 1);
  particles.push(new Element(createVector(mouseX, mouseY)));

  for(let i = particles.length - 1; i >= 0; i--){
    let p = particles[i];
    p.run();
    if (p.ghost()){
      particles.splice(i, 1);
    }
  }
  stroke(random(50,70), 100, 100);
  line(0, y, width, y);

  y += random(-10, 12);
   if (y > height){
     y = 0;
   }

   if (y < 0){
     y = height;
   }
}

class Element {
  constructor(loc) {
    this.accel = createVector(random(-0.05, 0.05), random(-0.06, 0.01));
    this.vel = createVector(random(-1,1), random(-1,1));
    this.loc = loc.copy();
    this.lifespan = 255.0;
    this.H1 = 150;
  }

  run(){
    this.update();
    this.display();
  }

  update(){
    this.vel.add(this.accel);
    this.loc.add(this.vel);
    this.lifespan -= random(1,2);
    this.H1 += 1;
  }

  display(){
    noStroke();
    fill(this.H1, 100, random(100), this.lifespan);
    //circle(this.loc.x + random(-5,5), this.loc.y + random(-5,5), random(2,5));
    square(this.loc.x, this.loc.y, random(2));

    if (this.H1 >= 300){
      this.H1 = 150;
    }

  }

  ghost(){
    if (this.lifespan < 0.0){
      return true;
    } else {
      return false;
    }
  }
}
