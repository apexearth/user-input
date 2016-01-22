var expect        = require("expect")
var userInput     = require("../src/user-input.js")
var keyboardInput = require("user-input-keyboard")

describe("user-input.js", function () {

    it("can be created without inputs", function () {
        var input = userInput()
        expect(input._inputs.length).toEqual(0)
    })

    it("can be created with inputs", function () {
        var kInput = keyboardInput()
        var input  = userInput(kInput)

        expect(input._inputs.indexOf(kInput) >= 0).toEqual(true)
    })

    it("shows values for it's input", function () {
        var kInput = keyboardInput()
        var input  = userInput(kInput)

        expect(input('A')).toEqual(0)

        kInput._input.emit('keydown', 'A')
        expect(input('A')).toEqual(1)

        kInput._input.emit('keyup', 'A')
        expect(input('A')).toEqual(0)
    })

    it("shows summed values for multiple inputs", function () {
        var kInput1 = keyboardInput()
        var kInput2 = keyboardInput()
        var input   = userInput([kInput1, kInput2])

        expect(input('A')).toEqual(0)

        kInput1._input.emit('keydown', 'A')
        expect(input('A')).toEqual(1)

        kInput2._input.emit('keydown', 'A')
        expect(input('A')).toEqual(2)

        kInput1._input.emit('keyup', 'A')
        expect(input('A')).toEqual(1)

        kInput2._input.emit('keyup', 'A')
        expect(input('A')).toEqual(0)
    })

})