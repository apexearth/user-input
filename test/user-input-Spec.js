var expect = require("expect")
var userInput = require("../src/user-input.js")
var gamepadInput = require("user-input-gamepad")

describe("user-input.js", function () {

    it("can be created without inputs", function () {
        var input = userInput()
        expect(input._keyboard.length).toEqual(0)
        expect(input._mouse.length).toEqual(0)
    })

    it("can be created without inputs", function () {
        var input = userInput()
        expect(input._keyboard.length).toEqual(0)

        input.addKeyboard()
        expect(input._keyboard.length).toEqual(1)
    })

    it("shows values for it's input", function () {
        var input = userInput().withKeyboard()

        expect(input.keyboard('A')).toEqual(0)

        input._keyboard[0]._input.emit('keydown', 'A')
        expect(input.keyboard('A')).toEqual(1)

        input._keyboard[0]._input.emit('keyup', 'A')
        expect(input.keyboard('A')).toEqual(0)
    })

    it("shows summed values for multiple inputs", function () {
        var input = userInput()
            .withKeyboard()
            .withKeyboard()

        expect(input.keyboard('A')).toEqual(0)

        input._keyboard[0]._input.emit('keydown', 'A')
        expect(input.keyboard('A')).toEqual(1)

        input._keyboard[1]._input.emit('keydown', 'A')
        expect(input.keyboard('A')).toEqual(2)

        input._keyboard[0]._input.emit('keyup', 'A')
        expect(input.keyboard('A')).toEqual(1)

        input._keyboard[1]._input.emit('keyup', 'A')
        expect(input.keyboard('A')).toEqual(0)
    })

    it("can add both mouse and keyboard inputs", function () {
        var input = userInput()
            .withKeyboard()
            .withMouse()

        expect(input.keyboard('A')).toEqual(0)

        input._keyboard[0]._input.emit('keydown', 'A')
        expect(input.keyboard('A')).toEqual(1)

        input._mouse[0]._input.emit('mousedown', {button: 0})
        expect(input.mouse('mouse0')).toEqual(1)

        input._keyboard[0]._input.emit('keyup', 'A')
        expect(input.keyboard('A')).toEqual(0)

        input._mouse[0]._input.emit('mouseup', {button: 0})
        expect(input.mouse('mouse0')).toEqual(0)
    })

    it("can receive gamepad input", function () {
        var input = userInput()
            .withGamepad()

        gamepadInput.mocks.push({
            buttons: []
        })
        var gamepad = input.gamepad()
        expect(gamepad.buttons).toExist()
    })

    it("provides users the ability to set values easily", function () {
        var input = userInput().withKeyboard()

        expect(input.keyboard('A')).toEqual(0)

        input.keyboard('A', 1)
        expect(input.keyboard('A')).toEqual(1)

        input.keyboard('A', 0)
        expect(input.keyboard('A')).toEqual(0)

    })

    it("can clear values on keyboard and mouse inputs", function () {
        var input = userInput().withKeyboard().withMouse()

        input.keyboard('A', 1)
        expect(input.keyboard('A')).toEqual(1)

        input._mouse[0]._input.emit('mousedown', {clientX: 5, clientY: 10, button: 0})
        expect(input.mouse('mouse0')).toEqual(1)
        expect(input.mouse('x')).toEqual(5)
        expect(input.mouse('y')).toEqual(10)

        input.clear();
        expect(input.keyboard('A')).toEqual(0)
        expect(input.mouse('mouse0')).toEqual(0)
        expect(input.mouse('x')).toEqual(0)
        expect(input.mouse('y')).toEqual(0)
    })
})