<script>
	import P5 from 'p5-svelte';

	let numberOfBalls = 50; // MAX 100

	const sketch = (p5) => {
		let w = 600;
		let h = 400;

		class ball {
			constructor(diameter) {
				this.dia = diameter;
				this.x = randx(this);
				this.y = randy(this);
				this.xlocIncrement = randloc();
				this.ylocIncrement = randloc();
			}

			checkDirection() {
				if (this.x > p5.width - this.dia / 2 || this.x < 0 + this.dia / 2) {
					this.xlocIncrement = this.xlocIncrement * -1;
				}

				if (this.y > p5.height - this.dia / 2 || this.y < 0 + this.dia / 2) {
					this.ylocIncrement = this.ylocIncrement * -1;
				}
			}

			move() {
				this.x += this.xlocIncrement;
				this.y += this.ylocIncrement;
			}
		}

		function randdia() {
			return p5.random(5, 50);
		}

		function randx(ball) {
			return p5.random(ball.dia, w - ball.dia);
		}

		function randy(ball) {
			return p5.random(ball.dia, h - ball.dia);
		}

		function randloc() {
			return p5.random(-0.5, 0.5);
		}

		// CREATING LIST OF BALLS

		var ballList = {};
		for (var i = 1; i <= numberOfBalls; i++) {
			ballList[i] = new ball(randdia());
		}

		p5.setup = () => {
			p5.createCanvas(w, h);

			// CANVAS SIZE

			// RANDOM GENERATORS
		};

		p5.draw = () => {
			p5.background(78);
			p5.stroke(255);
			p5.strokeWeight(4);
			p5.noFill();

			for (var i = 1; i <= numberOfBalls; i++) {
				p5.ellipse(
					ballList[i].x,
					ballList[i].y,
					ballList[i].dia,
					ballList[i].dia
				);
				ballList[i].checkDirection();
				ballList[i].move();
			}
		};
	};
</script>

<P5 {sketch} />
