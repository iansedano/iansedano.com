export default class Board {
  constructor(size) {
    this._state = [];
    this.size = size;

    for (let i = 0; i < this.size; i++) {
      this._state[i] = [];
      for (let j = 0; j < this.size; j++) {
        this._state[i].push(new BoardPosition(i, j));
      }
    }

    return new Proxy(this, {
      get: (target, prop) => {
        if (!isNaN(Number(prop))) {
          return target._state[prop];
        } else if (prop === "length") {
          return target._state.length;
        } else {
          return target[prop];
        }
      },
    });
  }

  forEach(callback) {
    return this._state.forEach(callback);
  }

  getCardinals(position) {
    let N, E, S, W;

    const boardSize = this._state.length;

    // checking for edges
    if (position.bx == 0) {
      W = "edge";
    } else if (position.bx == boardSize - 1) {
      E = "edge";
    }

    if (position.by == boardSize - 1) {
      S = "edge";
    } else if (position.by == 0) {
      N = "edge";
    }

    // assigning positions if not edge
    if (N != "edge") N = this._state[position.bx][position.by - 1];
    if (E != "edge") E = this._state[position.bx + 1][position.by];
    if (S != "edge") S = this._state[position.bx][position.by + 1];
    if (W != "edge") W = this._state[position.bx - 1][position.by];

    return [N, E, S, W];
  }

  buildGroups() {
    this.groups = [];

    let positionsChecked = [];

    for (let i = 0; i < this.size; i++) {
      positionsChecked[i] = [];
      for (let j = 0; j < this.size; j++) {
        positionsChecked[i].push(false);
      }
    }

    this._state.forEach((row, i) => {
      row.forEach((position, j) => {
        if (positionsChecked[i][j] === false) {
          positionsChecked[i][j] = true;
          if (position.state != "empty") {
            let newGroup = new Group(this); // initalizing new group
            positionsChecked = newGroup.build(position, positionsChecked);
            this.groups.push(newGroup); // adding to group list
          }
        }
      });
    });

    return this.groups;
  }

  findDeadGroup(color) {
    var groupIndex = this.groups.findIndex((g) => g.liberties == 0 && g.colour == color);

    if (groupIndex == -1) {
      return "no dead enemy";
    } else if (groupIndex > -1) {
      return this.groups[groupIndex];
    }
  }

  findGroupByPosition(positionToFind) {
    var currentGroupIndex = -1;
    var groupFound = "";
    this.groups.forEach((g, index) => {
      let posIndex = g.positions.findIndex((pos) => pos == positionToFind);
      if (posIndex != -1) {
        currentGroupIndex = index;
        groupFound = this.groups[currentGroupIndex];
      }
    });
    if (currentGroupIndex == -1) {
      return "group not found";
    } else {
      return groupFound;
    }
  }
}

class BoardPosition {
  #state;

  constructor(bx, by) {
    this.bx = bx;
    this.by = by;
    this.#state = "empty";
  }

  set state(string) {
    if (string === "black" || string === "white" || string === "empty") {
      this.#state = string;
    } else {
      console.log("invalid state");
    }
  }

  get state() {
    return this.#state;
  }
}

class Group {
  constructor(board) {
    this.positions = [];
    this.liberties = 0;
    this.board = board;
  }

  build(position, checkedList) {
    this.positions.push(position);

    this.colour = position.state;
    this.enemy = this.colour === "white" ? "black" : "white";

    const groupMembersToCheck = [position];

    while (groupMembersToCheck.length !== 0) {
      this.board
        .getCardinals(groupMembersToCheck.pop())
        .filter((cardinal) => {
          return cardinal !== "edge" && !this.isPosInGroup(cardinal);
        })
        .forEach((cardinal) => {
          if (cardinal.state == "empty") {
            this.liberties += 1;
            checkedList[cardinal.bx][cardinal.by] = true;
          } else if (cardinal.state == this.colour) {
            this.positions.push(cardinal);
            groupMembersToCheck.push(cardinal);
            checkedList[cardinal.bx][cardinal.by] = true;
          } else return;
        });
    }

    return checkedList;
  }

  isPosInGroup(pos) {
    return this.positions.findIndex((p) => p == pos) !== -1;
  }

  die() {
    this.positions.forEach((pos) => (pos.state = "empty"));
    return this.positions.length;
  }
}
