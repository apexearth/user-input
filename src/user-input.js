var keyboardInput = require("user-input-keyboard")
var mouseInput    = require("user-input-mouse")

module.exports = userInput

function userInput() {
    function aggregate(arr, key) {
        var value = 0;
        for (var i = 0; i < arr.length; i++) {
            value += arr[i][key] || 0;
        }
        return value;
    }

    var obj          = {
        _mouse:      [],
        mouse:       function (key) {
            return aggregate(obj._mouse, key)
        },
        addMouse:    function (target) {
            obj._mouse.push(mouseInput(target))
            return obj
        },
        _keyboard:   [],
        keyboard:    function (key) {
            return aggregate(obj._keyboard, key)
        },
        addKeyboard: function (target) {
            obj._keyboard.push(keyboardInput(target))
            return obj
        }
    }
    obj.withMouse    = obj.addMouse
    obj.withKeyboard = obj.addKeyboard
    return obj;
}
