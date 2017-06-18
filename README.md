# user-input

![](https://travis-ci.org/apexearth/user-input.svg)

User input tracking for keyboard, mouse, touch, and gamepad inputs.

## Usage

[![NPM](https://nodei.co/npm/user-input.png)](https://nodei.co/npm/user-input/)

### Example

    var input   = userInput()
        .withMouse()
        .withKeyboard()
        .withGamepad(0)
        .withTouch()
    
    input.keyboard('A') === 0
    // Press A
    input.keyboard('A') === 1
        
    input.mouse('mouse0') === 0
    // Press Left Mouse Button
    input.mouse('mouse0') === 1

    // Get instances of gamepads, in rendering loops.
    input.gamepad()
    
    input.touches        // Current touches
    input.changedTouches // Changed touches
    
    // Clear keyboard & mouse values back to zero.
    input.clear()
    
    // Set values for testing
    input.keyboard('A', 1)
    input.mouse('mouse0', 1)
    input.mouse('x', 500)
    
## Tests

- Mocha
   - Test functionality in Node.js