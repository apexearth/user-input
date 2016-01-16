var expect    = require("expect")
var UserInput = require("../src/user-input.js")

describe("user-input.js", function () {

    it("requires input", function () {
        expect(function () {
            new UserInput()
        }).toThrow("An input is required.")
    })

    it("has default members", function () {
        var input = new UserInput({});
        expect(input.values).toExist();
        expect(input.input).toExist();
    })

})