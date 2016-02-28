var keyboardInput = require("user-input-keyboard")
var mouseInput    = require("user-input-mouse")

module.exports = userInput

function userInput() {
    function sum(arr, key) {
        var value = 0;
        for (var i = 0; i < arr.length; i++) {
            value += arr[i][key] || 0;
        }
        return value;
    }

    function set(arr, key, value) {
        for (var i = 0; i < arr.length; i++) {
            arr[i][key] = value / arr.length
        }
    }

    function handle(arr, key, value) {
        if (value !== undefined) {
            return set(arr, key, value)
        } else {
            return sum(arr, key)
        }
    }

    var obj          = {

        _mouse:   [],
        mouse:    function (key, value) {
            return handle(obj._mouse, key, value)
        },
        addMouse: function (target) {
            obj._mouse.push(mouseInput(target))
            return obj
        },

        _keyboard:   [],
        keyboard:    function (key, value) {
            return handle(obj._keyboard, key, value)
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
