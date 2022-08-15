<script>
	import P5 from 'p5-svelte';

	const sketch = (p5) => {
		let theta;

		p5.setup = () => {
			p5.createCanvas(500, 400);
		};

		p5.draw = () => {
			p5.background(0);
			p5.frameRate(30);
			p5.stroke(255);
			// Let's pick an angle 0 to 90 degrees based on the mouse position
			let a = (p5.mouseX / p5.width) * 360;
			// Convert it to radians
			theta = p5.radians(a);
			// Start the tree from the bottom of the screen
			p5.translate(p5.width / 2, p5.height);
			// Draw a line 120 pixels
			p5.line(0, 0, 0, -120);
			// Move to the end of that line
			p5.translate(0, -120);
			// Start the recursive branching!
			branch(130);
		};

		function branch(h) {
			// each branch proportion of previous one
			h *= 0.66667;

			// All recursive functions must have an exit condition!!!!
			// Here, ours is when the length of the branch is 2 pixels or less
			if (h > 3) {
				p5.push(); // Save the current state of transformation (i.e. where are we now)
				p5.rotate(theta); // Rotate by theta
				p5.line(0, 0, 0, -h); // Draw the branch
				p5.translate(0, -h); // Move to the end of the branch
				branch(h); // Ok, now call myself to draw two new branches!!
				p5.pop(); // Whenever we get back here, we "pop" in order to restore the previous matrix state

				// Repeat the same thing, only branch off to the "left" this time!
				p5.push();
				p5.rotate(-theta);
				p5.line(0, 0, 0, -h);
				p5.translate(0, -h);
				branch(h);
				p5.pop();
			}
		}
	};
</script>

<P5 {sketch} />
