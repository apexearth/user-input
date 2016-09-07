# user-input

![](https://travis-ci.org/apexearth/user-input.svg)
![](http://img.shields.io/npm/v/user-input.svg?style=flat)
![](http://img.shields.io/npm/dm/user-input.svg?style=flat)
![](http://img.shields.io/npm/l/user-input.svg?style=flat)

User input tracking for multiple inputs.

## Usage

[![NPM](https://nodei.co/npm/user-input.png)](https://nodei.co/npm/user-input/)

### Example

    var input   = userInput()
        .withMouse()
        .withKeyboard()
        .withGamepad(0)
    
    input.keyboard('A') === 0
    // Press A
    input.keyboard('A') === 1
        
    input.mouse('mouse0') === 0
    // Press Left Mouse Button
    input.mouse('mouse0') === 1

    // Get instances of gamepads, in rendering loops.
    input.gamepad()
    
    // Clear keyboard & mouse values back to zero.
    input.clear()
    
## Tests

- Mocha
   - Test functionality in Node.js