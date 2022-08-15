<script>
	var bubbles = [];

	function setup() {
		myCanvas = createCanvas(600, 400);
		myCanvas.parent('bubbles');
		for (var i = 0; i < 400; i++) {
			bubbles[i] = {
				x: random(0, width),
				y: random(0, height),
				move: function () {
					this.x += random(-1, 1);
					this.y += random(-1, 1);
				},
				display: function () {
					stroke(255);
					noFill();
					ellipse(this.x, this.y, 24, 24);
				}
			};
		}
	}

	function draw() {
		background(0);

		for (var i = 0; i < bubbles.length; i++) {
			bubbles[i].move();
			bubbles[i].display();
		}
	}
</script>
