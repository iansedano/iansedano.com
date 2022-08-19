<script>
	import P5 from 'p5-svelte';

	const sketch = (p5) => {
		let bubbles = [];
		p5.setup = () => {
			p5.createCanvas(600, 400);

			for (let i = 0; i < 400; i++) {
				bubbles[i] = {
					x: p5.random(0, p5.width),
					y: p5.random(0, p5.height),
					move: function () {
						this.x += p5.random(-1, 1);
						this.y += p5.random(-1, 1);
					},
					display: function () {
						p5.stroke(255);
						p5.noFill();
						p5.ellipse(this.x, this.y, 24, 24);
					}
				};
			}
		};

		p5.draw = () => {
			p5.background(0);

			for (var i = 0; i < bubbles.length; i++) {
				bubbles[i].move();
				bubbles[i].display();
			}
		};
	};
</script>

<P5 {sketch} />
