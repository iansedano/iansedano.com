export class Referee {
  constructor() {
    this.white = new Player("white");
    this.black = new Player("black");
    this.turn = this.black;
  }

  changeTurn() {
    this.turn = this.turn === this.black ? this.white : this.black;
  }
}

export class Player {
  constructor(colour) {
    this.colour = colour;
    this.prisoners = 0;
  }
}
