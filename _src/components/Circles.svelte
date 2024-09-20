<script>
	import P5 from 'p5-svelte';

	const sketch = (p5) => {
		p5.setup = () => {
			p5.createCanvas(400, 400);
			// myCanvas.parent('color_circles');
			p5.background(78); // 0 means black 255 means white , if you call with three , its RGB
		};

		var spot = {
			x: 100,
			y: 50
		};

		var col = {
			r: 255,
			g: 0,
			b: 0
		};

		p5.draw = () => {
			// code inside draw() is automatically looped forever

			spot.x = p5.random(0, 400);
			spot.y = p5.random(0, 400);

			col.r = p5.random(0, 255);
			col.g = p5.random(0, 255);
			col.b = p5.random(0, 255);

			p5.noStroke();
			p5.fill(col.r, col.g, col.b, 100);
			p5.ellipse(spot.x, spot.y, 24, 24);
			p5.textSize(100);
			p5.fill(255);
			// text("Hello", 100, 200,);
		};
	};
</script>

<P5 {sketch} />
