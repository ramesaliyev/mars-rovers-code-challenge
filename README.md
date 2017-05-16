# Mars Rovers Challenge

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
