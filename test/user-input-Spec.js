var expect    = require("expect")
var userInput = require("../src/user-input.js")

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
})