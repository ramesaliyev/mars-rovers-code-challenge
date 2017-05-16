/**
 * Get dependencies.
 */
const expect = require('chai').expect;
const MarsRover = require('../dist/MarsRover').default;

/**
 * Test
 */
describe('MarsRover', () => {
  it('should correctly follow the given commands', () => {
    const marsRover = new MarsRover(5, 5);

    marsRover.addRover(1,2,'N');
    marsRover.sendCommand('LMLMLMLMM');

    marsRover.addRover(3,3,'E');
    marsRover.sendCommand('MMRMMRMRRM');

    expect(
      marsRover.getFinalPositions()
    ).to.eql(
      ['1 3 N', '5 1 E']
    );
  });

  it('should not let rovers to go out of plateau borders', () => {
    const marsRover = new MarsRover(5, 5);

    marsRover.addRover(0,0,'N');
    marsRover.sendCommand('MMMMMM');

    marsRover.addRover(1,5,'S');
    marsRover.sendCommand('MMMMMM');

    marsRover.addRover(5,1,'W');
    marsRover.sendCommand('MMMMMM');

    marsRover.addRover(0,2,'E');
    marsRover.sendCommand('MMMMMM');

    expect(
      marsRover.getFinalPositions()
    ).to.eql(
      ['0 5 N', '1 0 S', '0 1 W', '5 2 E']
    );
  });

  it('should not let rovers to pass over each other', () => {
    const marsRover = new MarsRover(5, 5);

    marsRover.addRover(0,0,'N');
    marsRover.sendCommand('MRM');

    marsRover.addRover(1,0,'N');
    marsRover.sendCommand('MMM');

    marsRover.addRover(0,1,'E');
    marsRover.sendCommand('MMMLMRMRM');

    expect(
      marsRover.getFinalPositions()
    ).to.eql(
      ['1 1 E', '1 0 N', '1 2 S']
    );
  });

  it('should not let you put a rover over another one or out of plateau', () => {
    const marsRover = new MarsRover(5, 5);

    const firstRoverIndex = marsRover.addRover(0,0,'N');
    marsRover.sendCommand('MRM');

    const secondRoverIndex = marsRover.addRover(1,1,'N');
    // Also when you failed to add rover, commands should not be executed.
    marsRover.sendCommand('MMM');

    const thirdRoverIndex = marsRover.addRover(6,6,'N');
    marsRover.sendCommand('MRM');

    const fourthRoverIndex = marsRover.addRover(0,6,'N');
    marsRover.sendCommand('MRM');

    const fifthRoverIndex = marsRover.addRover(6,0,'N');
    marsRover.sendCommand('MRM');

    expect( marsRover.getFinalPositions() ).to.eql( ['1 1 E'] );
    expect( firstRoverIndex ).to.be.equal( 0 );
    expect( secondRoverIndex ).to.be.equal( false );
    expect( thirdRoverIndex ).to.be.equal( false );
    expect( fourthRoverIndex ).to.be.equal( false );
    expect( fifthRoverIndex ).to.be.equal( false );
  });

  it('should let you activate a rover and send command to it', () => {
    const marsRover = new MarsRover(5, 5);

    const firstRoverIndex = marsRover.addRover(1,2,'N');
    marsRover.sendCommand('LMLMLMLMM');

    const secondRoverIndex = marsRover.addRover(3,3,'E');
    marsRover.sendCommand('MMRMMRMRRM');

    const isFirstRoverActivated = marsRover.activateRover(firstRoverIndex);
    marsRover.sendCommand('M');

    const isSecondRoverActivated = marsRover.activateRover(secondRoverIndex);
    marsRover.sendCommand('MMRM');

    // You cant activate non-exist rover.
    const isNinthRoverActivated = marsRover.activateRover(9);
    marsRover.sendCommand('MMRM');

    expect( marsRover.getFinalPositions() ).to.eql( ['1 4 N', '5 0 S'] );
    expect( isFirstRoverActivated ).to.be.equal( true );
    expect( isSecondRoverActivated ).to.be.equal( true );
    expect( isNinthRoverActivated ).to.be.equal( false );
  });
});
