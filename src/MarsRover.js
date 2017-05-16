/**
 * Get dependencies.
 */
import Rover from './Rover';

/**
 * Manager class for Rovers.
 */
class MarsRover {
  /**
   * Create initial data.
   */
  constructor(xSize, ySize) {
    this.size = {
      x: xSize,
      y: ySize
    };
    
    this.rovers = [];
    this.activeRover = null;

    this.isPositionAvailable = this.isPositionAvailable.bind(this);
    this.executeCommand = this.executeCommand.bind(this);
  }
  
  /**
   * Check for plateau borders and rover collisions.
   */
  isPositionAvailable(nextPos) {
    return (
      this.isPositionExist(nextPos) &&
      !this.getRoverByPosition(nextPos)
    );
  }

  /**
   * Check if given coordinates exist on plateau.
   */
  isPositionExist({ x, y }) {
    return (
      x > -1 && y > -1 &&
      x <= this.size.x &&
      y <= this.size.y
    );
  }

  /**
   *  Get rover which on given position.
   */
  getRoverByPosition({ x, y }) {
    return this.rovers.find(rover => {
      const state = rover.getState();

      return state.pos.x === x && state.pos.y === y;  
    });
  }

  /**
   * Add and activate rover.
   */ 
  addRover(x, y, facing) {
    this.activeRover = null;

    // Dont add rover over another one. 
    if (!this.isPositionAvailable({ x, y })) {
      return false;
    }

    // Create rover.
    const rover = new Rover(x, y, facing);
    
    this.rovers.push(rover);
    this.activeRover = rover;
    
    // This index number acts like an id,
    // and can be used to activate this rover later.
    return this.rovers.length - 1;
  }

  /**
   * Activate rover with given index number.
   */
  activateRover(index) {
    return !!(this.activeRover = this.rovers[index]);
  }
  
  /**
   * Execute single command.
   */
  executeCommand(command) {
    if (!this.activeRover) {
      return false;
    }

    if (command === 'M') {
      return this.activeRover.move(this.isPositionAvailable);
    }
    
    if (command === 'L' || command === 'R') {
      return this.activeRover.rotate(command);
    }
  }

  /**
   * Distribute command to active rover.
   */
  sendCommand(commandList) {
    [...commandList].forEach(this.executeCommand);
  }
  
  /**
   * Simply create array of rover position summaries.
   */
  getFinalPositions() {
    return this.rovers.map(rover => {
      const state = rover.getState();
      
      return `${state.pos.x} ${state.pos.y} ${state.facing}`;
    });
  }                            
}

/**
 * Export MarsRover.
 */
export default MarsRover;
