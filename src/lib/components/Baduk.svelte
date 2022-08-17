<script>
	import { onMount } from 'svelte';
	import { BadukCanvas, Point } from './Baduk/Draw';
	import { Referee, Player } from './Baduk/Referee';
	import Board from './Baduk/Board';

	onMount(() => {
		const CANVAS = document.getElementById('canvas');
		const CTX = CANVAS.getContext('2d');

		const BOARD_SIZE = 9;
		const PADDING = 48.5;
		const GRID_SPACING = 50;
		const BOX_SIZE = 30;

		const REFEREE = new Referee();
		// let PLAYER_TURN = 'black';
		// const PLAYER_BLACK = new Player('black');
		// const PLAYER_WHITE = new Player('white');

		const BOARD = new Board(BOARD_SIZE);

		const artist = new BadukCanvas(
			BOARD_SIZE,
			PADDING,
			GRID_SPACING,
			CTX,
			BOX_SIZE
		);

		artist.drawBoard();
		updatePlayerInfo();

		CANVAS.addEventListener('mousedown', function (e) {
			let bRef = artist.getBoardRef(getCursorPosition(CANVAS, e));

			if (bRef != undefined) {
				let currentPlayer = REFEREE.turn;
				move(bRef, currentPlayer);
				artist.drawBoard();
				updatePlayerInfo();
				artist.drawStones(BOARD);
			}
		});

		function getPlayer() {
			if (PLAYER_TURN === 'black') {
				return PLAYER_BLACK;
			} else {
				return PLAYER_WHITE;
			}
		}

		function changeTurn() {
			if (PLAYER_TURN === 'black') {
				PLAYER_TURN = 'white';
			} else {
				PLAYER_TURN = 'black';
			}
		}

		function move(bRef, activePlayer) {
			const currentPosition = BOARD[bRef.bx][bRef.by];
			if (currentPosition.state !== 'empty') {
				window.alert('spot already taken');
			} else {
				currentPosition.state = REFEREE.turn.colour;
				BOARD.buildGroups();
				const currentGroup = BOARD.findGroupByPosition(currentPosition);
				const deadEnemyGroup = BOARD.findDeadGroup(
					REFEREE.turn.colour === 'black' ? 'white' : 'black'
				);

				if (
					currentGroup.liberties === 0 &&
					deadEnemyGroup === 'no dead enemy'
				) {
					window.alert('Suicide! Invalid move');
					currentPosition.state = 'empty';
				} else if (deadEnemyGroup != 'no dead enemy') {
					activePlayer.prisoners += deadEnemyGroup.die();
					REFEREE.changeTurn();
				} else if (deadEnemyGroup == 'no dead enemy') {
					REFEREE.changeTurn();
				}
			}
		}

		function updatePlayerInfo() {
			document.getElementById('turn').innerHTML =
				REFEREE.turn.colour + "'s turn";
			document.getElementById('whitePrisoners').innerHTML =
				'black has ' + REFEREE.black.prisoners + ' prisoners.';
			document.getElementById('blackPrisoners').innerHTML =
				'white has ' + REFEREE.white.prisoners + ' prisoners';
		}

		/** */

		function getCursorPosition(canvas, event) {
			const rect = canvas.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			return new Point(x, y);
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
		REFEREE.turn = REFEREE.black;
		BOARD[1][2].state = 'white';
		BOARD[2][3].state = 'white';
		BOARD[3][2].state = 'white';
		BOARD[2][1].state = 'white';
		BOARD[1][1].state = 'black';
		BOARD[2][0].state = 'black';
		BOARD[3][1].state = 'black';
		artist.drawStones(BOARD, CTX);

		// DOUBLE CAPTURE
		// PLAYER_TURN = 'black';
		// BOARD[0][1].state = 'black';
		// BOARD[1][0].state = 'black';
		// BOARD[1][1].state = 'white';
		// BOARD[3][1].state = 'white';
		// BOARD[3][0].state = 'black';
		// BOARD[4][1].state = 'black';
		// BOARD[3][2].state = 'black';
		// BOARD[1][2].state = 'black';
		// drawStones(BOARD, CTX);
	});
</script>

<canvas id="canvas" width="500" height="500" style="border:1px solid" />

<p id="turn" />
<p id="whitePrisoners" />
<p id="blackPrisoners" />
