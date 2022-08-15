<script>
	class ball {
		constructor(diameter) {
			this.dia = diameter;
			this.x = randx(this);
			this.y = randy(this);
			this.xlocIncrement = randloc();
			this.ylocIncrement = randloc();
		}

		checkDirection() {
			if (this.x > width - this.dia / 2 || this.x < 0 + this.dia / 2) {
				this.xlocIncrement = this.xlocIncrement * -1;
			}

			if (this.y > height - this.dia / 2 || this.y < 0 + this.dia / 2) {
				this.ylocIncrement = this.ylocIncrement * -1;
			}
		}

		move() {
			this.x += this.xlocIncrement;
			this.y += this.ylocIncrement;
		}
	}

	// CANVAS SIZE
	w = 600;
	h = 400;

	// RANDOM GENERATORS
	function randdia() {
		return p5.prototype.random(5, 50);
	}

	function randx(ball) {
		return p5.prototype.random(ball.dia, w - ball.dia);
	}

	function randy(ball) {
		return p5.prototype.random(ball.dia, h - ball.dia);
	}

	function randloc() {
		return p5.prototype.random(-0.5, 0.5);
	}

	// CREATING LIST OF BALLS

	numberOfBalls = 50; // MAX 100

	var ballList = {};
	for (var i = 1; i <= numberOfBalls; i++) {
		ballList[i] = new ball(randdia());
	}

	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// +++++++++++++++++++++++++++ DRAWING +++++++++++++++++++++++++++++
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	function setup() {
		myCanvas = createCanvas(w, h);
		myCanvas.parent('bouncing_balls');
	}

	function draw() {
		background(78);
		stroke(255);
		strokeWeight(4);
		noFill();

		for (var i = 1; i <= numberOfBalls; i++) {
			ellipse(ballList[i].x, ballList[i].y, ballList[i].dia, ballList[i].dia);
			ballList[i].checkDirection();
			ballList[i].move();
		}
	}
</script>
