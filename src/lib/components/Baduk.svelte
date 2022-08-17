<script>
	import { onMount } from 'svelte';
	import Board from './Baduk/Board';

	onMount(() => {
		class Player {
			constructor(colour) {
				this.colour = colour;
				this.prisoners = 0;
			}
		}

		class Point {
			constructor(x, y) {
				this.x = x;
				this.y = y;
			}
		}

		class BoardRef {
			constructor(boardX, boardY) {
				this.bx = boardX;
				this.by = boardY;
				this.point = findCoordinate(this);
			}
		}

		const CANVAS = document.getElementById('canvas');
		const CTX = CANVAS.getContext('2d');

		// SETS SIZE FOR GRID AND GAME - only works for 9 x 9 for now.
		const BOARD_SIZE = 9;
		const PADDING = 48.5;
		const GRID_SPACING = 50;
		const BOX_SIZE = 30;

		let PLAYER_TURN = 'black';
		const PLAYER_BLACK = new Player('black');
		const PLAYER_WHITE = new Player('white');

		const BOARD = new Board(BOARD_SIZE);

		drawBoard(BOARD_SIZE, PADDING, GRID_SPACING, CTX);
		const CLICK_MAP_ARRAY = createClickMap();
		CANVAS.addEventListener('mousedown', function (e) {
			let bRef = getBoardRef(getCursorPosition(CANVAS, e), CLICK_MAP_ARRAY);

			if (bRef != undefined) {
				let currentPlayer = getPlayer();
				move(bRef, currentPlayer);
				drawBoard(BOARD_SIZE, PADDING, GRID_SPACING, CTX);
				drawStones(BOARD, CTX);
			}
		});

		function findCoordinate(pos) {
			var x = PADDING + pos.bx * GRID_SPACING;
			var y = PADDING + pos.by * GRID_SPACING;
			return new Point(x, y);
		}

		function getPlayer() {
			if (PLAYER_TURN === 'black') {
				return PLAYER_BLACK;
			} else {
				return PLAYER_WHITE;
			}
		}

		/** */
		function changeTurn() {
			if (PLAYER_TURN === 'black') {
				PLAYER_TURN = 'white';
			} else {
				PLAYER_TURN = 'black';
			}
		}

		/** */
		function move(bRef, activePlayer) {
			const currentPosition = BOARD[bRef.bx][bRef.by];
			if (currentPosition.state !== 'empty') {
				window.alert('spot already taken');
			} else {
				currentPosition.state = PLAYER_TURN;
				const groups = BOARD.buildGroups();
				const currentGroup = findGroupByPosition(currentPosition, groups);
				const deadEnemyGroup = findDeadEnemyGroup(groups, currentGroup);

				if (
					currentGroup.liberties === 0 &&
					deadEnemyGroup === 'no dead enemy'
				) {
					window.alert('Suicide! Invalid move');
					currentPosition.state = 'empty';
				} else if (deadEnemyGroup != 'no dead enemy') {
					killGroup(deadEnemyGroup, activePlayer);
					changeTurn();
				} else if (deadEnemyGroup == 'no dead enemy') {
					changeTurn();
				}
			}
		}

		function killGroup(groupToKill, playerKilling) {
			groupToKill.positions.forEach((pos) => {
				pos.state = 'empty';
				playerKilling.prisoners += 1;
			});
		}

		/** */
		function findDeadEnemyGroup(groupList, friendlyGroup) {
			var deadEnemyGroupIndex = groupList.findIndex(
				(g) => g.liberties == 0 && g.colour == friendlyGroup.enemy
			);

			if (deadEnemyGroupIndex == -1) {
				return 'no dead enemy';
			} else if (deadEnemyGroupIndex > -1) {
				return groupList[deadEnemyGroupIndex];
			}
		}

		/** */
		function findGroupByPosition(positionToFind, groupList) {
			var currentGroupIndex = -1;
			var groupFound = '';
			groupList.forEach((g, index) => {
				let posIndex = g.positions.findIndex((pos) => pos == positionToFind);
				if (posIndex != -1) {
					currentGroupIndex = index;
					groupFound = groupList[currentGroupIndex];
				}
			});
			if (currentGroupIndex == -1) {
				return 'group not found';
			} else {
				return groupFound;
			}
		}

		/** */

		/** */
		function drawBoard(size, pad, gridSpacing, context) {
			//CANVAS Background
			context.beginPath();
			context.fillStyle = '#D6B450';
			context.fillRect(0, 0, 500, 500);

			//GRID
			context.beginPath();
			//vertical lines
			for (var i = 0; i < size; i++) {
				context.moveTo(pad + gridSpacing * i, pad);
				context.lineTo(pad + gridSpacing * i, pad + (size - 1) * gridSpacing);
			}
			//horizontal lines
			for (var i = 0; i < size; i++) {
				context.moveTo(pad, pad + gridSpacing * i);
				context.lineTo(pad + (size - 1) * gridSpacing, pad + gridSpacing * i);
			}
			context.stroke();

			// Drawing tengen star point
			var tengen = new BoardRef((size - 1) / 2, (size - 1) / 2);
			drawDot(tengen.point, context);

			document.getElementById('turn').innerHTML = PLAYER_TURN + "'s turn";

			document.getElementById('whitePrisoners').innerHTML =
				'black has ' + PLAYER_BLACK.prisoners + ' prisoners.';
			document.getElementById('blackPrisoners').innerHTML =
				'white has ' + PLAYER_WHITE.prisoners + ' prisoners';
		}

		function updatePlayerInfo(
			turnElement,
			playerWhiteElement,
			playerBlackElement
		) {
			turnElement.innerText = `${PLAYER_TURN}'s turn`;
			playerBlackElement.innerText = `black has ${PLAYER_BLACK.prisoners} prisoners.`;
			playerWhiteElement.innerText = `white has ${PLAYER_WHITE.prisoners} prisoners`;
		}

		/** */
		function createClickMap() {
			const clickMapArray = new Array(BOARD_SIZE);
			for (let i = 0; i < BOARD_SIZE; i++) {
				clickMapArray[i] = new Array(BOARD_SIZE);
			}

			let positionX = PADDING;
			let positionY = PADDING;

			for (let i = 0; i < BOARD_SIZE; i++) {
				positionY = PADDING;
				for (let j = 0; j < BOARD_SIZE; j++) {
					clickMapArray[i][j] = new Point(positionX, positionY);
					positionY += GRID_SPACING;
				}
				positionX += GRID_SPACING;
			}

			return clickMapArray;
		}

		function getCursorPosition(canvas, event) {
			const rect = canvas.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			return new Point(x, y);
		}

		function drawDot(point, context) {
			context.beginPath();
			context.arc(point.x, point.y, 3, 0, 2 * Math.PI);
			context.fillStyle = 'black';
			context.fill();
			context.stroke();
		}

		function drawStones(board, context) {
			board.forEach((row) => {
				row.forEach((pos) => {
					if (pos.state != 'empty') {
						let coord = findCoordinate(pos);
						context.beginPath();
						context.arc(coord.x, coord.y, 20, 0, 2 * Math.PI);
						context.fillStyle = pos.state;
						context.fill();
						context.stroke();
					}
				});
			});
		}

		function getBoardRef(point, clickMapArray) {
			for (var i = 0; i < BOARD_SIZE; i++) {
				for (var j = 0; j < BOARD_SIZE; j++) {
					var xMin = clickMapArray[i][j].x - BOX_SIZE / 2;
					var xMax = clickMapArray[i][j].x + BOX_SIZE / 2;
					var yMin = clickMapArray[i][j].y - BOX_SIZE / 2;
					var yMax = clickMapArray[i][j].y + BOX_SIZE / 2;
					if (
						point.x >= xMin &&
						point.x <= xMax &&
						point.y >= yMin &&
						point.y <= yMax
					) {
						return new BoardRef(i, j);
					}
				}
			}
		}

		// ++++++++++++++++++++++++++++++++++
		// ++++++++ TESTING SET UPS +++++++++
		// ++++++++++++++++++++++++++++++++++

		// SIMPLE CAPTURE SETUP

		// playerTurn = "white";
		// board[1][2].state = "white"
		// board[2][3].state = "white"
		// board[3][2].state = "white"
		// board[2][2].state = "black"
		// DrawStones(board, ctx)

		// simple group capture setup

		// PLAYER_TURN = 'white';
		// BOARD[1][2].state = 'white';
		// BOARD[2][3].state = 'white';
		// BOARD[3][2].state = 'white';
		// BOARD[2][2].state = 'black';
		// BOARD[2][1].state = 'black';
		// BOARD[1][1].state = 'white';
		// BOARD[3][1].state = 'white';
		// DrawStones(BOARD, CTX);

		// NEAR KO SETUP
		PLAYER_TURN = 'black';
		BOARD[1][2].state = 'white';
		BOARD[2][3].state = 'white';
		BOARD[3][2].state = 'white';
		BOARD[2][1].state = 'white';
		BOARD[1][1].state = 'black';
		BOARD[2][0].state = 'black';
		BOARD[3][1].state = 'black';
		drawStones(BOARD, CTX);
	});
</script>

<canvas id="canvas" width="500" height="500" style="border:1px solid" />

<p id="turn" />
<p id="whitePrisoners" />
<p id="blackPrisoners" />
