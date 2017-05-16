/**
 * Single Rover Class
 */
class Rover {
  /**
   * Keep data.
   */
  constructor(x, y, facing) {
    this.pos = {
      x, y
    };
    
    this.facing = facing;
  }
  
  /**
   * Rotate to given direction. L or R.
   */
  rotate(to) {
    this.facing = Rover.rotateMap[this.facing][to];
  }
  
  /**
   * Move one step forward.
   */
  move(predicate) {
    const moveBy = Rover.moveMap[this.facing],
          nextPos = { x: this.pos.x, y: this.pos.y };

    // Set next pos.
    nextPos[moveBy.plane] += moveBy.amount;
    
    // Check if move is legal.
    const isLegal = predicate(nextPos);

    // Update position if move is legal.
    if (isLegal) {
      this.pos = nextPos;
    }
  }
  
  /**
   * Get current state.
   */
  getState() {
    return {
      pos: this.pos,
      facing: this.facing
    }
  }
}

/**
 * Rotate map by compass directions.
 */
Rover.rotateMap = {
  N: { L: 'W', R: 'E' },
  E: { L: 'N', R: 'S' },
  S: { L: 'E', R: 'W' },
  W: { L: 'S', R: 'N' }
};

/**
 * Move map by compass directions.
 */
Rover.moveMap = {
  N: { plane: 'y', amount: +1 },
  S: { plane: 'y', amount: -1 },
  E: { plane: 'x', amount: +1 },
  W: { plane: 'x', amount: -1 }
};

/**
 * Export Rover.
 */
export default Rover;
