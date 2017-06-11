var keyboardInput = require("user-input-keyboard")
var mouseInput    = require("user-input-mouse")
var gamepadInput  = require("user-input-gamepad")

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
            if (arr[i].set) {
                arr[i].set(key, value / arr.length)
            } else {
                arr[i][key] = value / arr.length
            }
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
        addKeyboard: function (target, options) {
            obj._keyboard.push(keyboardInput(target, options))
            return obj
        },

        _gamepad:   [],
        gamepad:    function () {
            return obj._gamepad()
        },
        addGamepad: function (target) {
            target       = target || 0
            obj._gamepad = gamepadInput.bind(null, target)
            return obj
        },

        clear: function () {
            for (var i = 0; i < this._mouse.length; i++) {
                this._mouse[i].clear();
            }
            for (i = 0; i < this._keyboard.length; i++) {
                this._keyboard[i].clear();
            }
        }
    }
    obj.withMouse    = obj.addMouse
    obj.withKeyboard = obj.addKeyboard
    obj.withGamepad  = obj.addGamepad
    return obj;
}
