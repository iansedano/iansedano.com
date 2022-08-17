export class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

export class BoardRef {
	constructor(boardX, boardY, point) {
		this.bx = boardX;
		this.by = boardY;
		this.point = point;
		// this.point = findCoordinate(this);
	}
}

export class BadukCanvas {
	constructor(size, pad, gridSpacing, context) {
		this.size = size;
		this.pad = pad;
		this.gridSpacing = gridSpacing;
		this.context = context;
	}

	drawBoard() {
		this.context.beginPath();
		this.context.fillStyle = '#D6B450';
		this.context.fillRect(0, 0, 500, 500);

		this.context.beginPath();
		for (var i = 0; i < this.size; i++) {
			this.context.moveTo(this.pad + this.gridSpacing * i, this.pad);
			this.context.lineTo(
				this.pad + this.gridSpacing * i,
				this.pad + (this.size - 1) * this.gridSpacing
			);
		}
		for (var i = 0; i < this.size; i++) {
			this.context.moveTo(this.pad, this.pad + this.gridSpacing * i);
			this.context.lineTo(
				this.pad + (this.size - 1) * this.gridSpacing,
				this.pad + this.gridSpacing * i
			);
		}
		this.context.stroke();
		const middlePoint = new Point((this.size - 1) / 2, (this.size - 1) / 2);
		var tengen = new BoardRef(
			middlePoint.x,
			middlePoint.y,
			this.findCoordinate(middlePoint)
		);
		this.drawDot(tengen.point);
	}

	drawDot(point) {
		// TODO - not drawing dot
		this.context.beginPath();
		this.context.arc(point.x, point.y, 3, 0, 2 * Math.PI);
		this.context.fillStyle = 'black';
		this.context.fill();
		this.context.stroke();
	}

	drawStone(point, color) {
		this.context.beginPath();
		this.context.arc(point.x, point.y, 20, 0, 2 * Math.PI);
		this.context.fillStyle = color;
		this.context.fill();
		this.context.stroke();
	}

	drawStones(board) {
		board.forEach((row) => {
			row.forEach((pos) => {
				if (pos.state != 'empty') {
					let coord = this.findCoordinate(pos);
					this.drawStone(coord, pos.state);
				}
			});
		});
	}

	findCoordinate(pos) {
		var x = this.pad + pos.bx * this.gridSpacing;
		var y = this.pad + pos.by * this.gridSpacing;
		return new Point(x, y);
	}

	createClickMap() {
		const clickMapArray = new Array(this.size);
		for (let i = 0; i < this.size; i++) {
			clickMapArray[i] = new Array(this.size);
		}

		let positionX = this.pad;
		let positionY = this.pad;

		for (let i = 0; i < this.size; i++) {
			positionY = this.pad;
			for (let j = 0; j < this.size; j++) {
				clickMapArray[i][j] = new Point(positionX, positionY);
				positionY += this.gridSpacing;
			}
			positionX += this.gridSpacing;
		}

		return clickMapArray;
	}
}
