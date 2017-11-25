function setup() {
	createCanvas(200, 150);
  player = new Player();
}

function draw() {
	background(0);
  player.show();
  player.move();
  player.update();
}