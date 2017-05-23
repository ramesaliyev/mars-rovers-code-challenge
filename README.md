# Mars Rovers Code Challenge

# Problem

A squad of robotic rovers are to be landed by NASA on a plateau on Mars. This plateau, which is curiously rectangular, must be navigated by the rovers so that their on-board cameras can get a complete view of the surrounding terrain to send back to Earth.

A rover's position and location is represented by a combination of x and y co-ordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North.

In order to control a rover, NASA sends a simple string of letters. The possible letters are 'L', 'R' and 'M'. 'L' and 'R' makes the rover spin 90 degrees left or right respectively, without moving from its current spot. 'M' means move forward one grid point, and maintain the same heading.
Assume that the square directly North from (x, y) is (x, y+1).

INPUT: The first input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0,0.
The rest of the input is information pertaining to the rovers that have been deployed. Each rover has two lines of input. The first line gives the rover's position, and the second line is a series of instructions telling the rover how to explore the plateau.

The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates and the rover's orientation.
Each rover will be finished sequentially, which means that the second rover won't start to move until the first one has finished moving.


Code :
```
const marsRover = new MarsRover(5,5);

marsRover.addRover(1,2,'N');
marsRover.sendCommand('LMLMLMLMM');

marsRover.addRover(3,3,'E');
marsRover.sendCommand('MMRMMRMRRM');

marsRover.getFinalPositions() // returns a list of two strings

// 1 3 N
// 5 1 E
```

# Installation & Test
#### Install Dependencies:
    npm i

#### Run Tests:
    npm t

# Some Notes
- Rovers won't move forward when they react to border of plateau or facing to another rover, but they can move after rotate.
- You can't add rover to out of plateau or on top of another rover. Failed `addRover` request will return false.
- Successful `addRover` will return index number of rover. It can be used later to activate rover for sending commands.
- Check tests for use examples.
