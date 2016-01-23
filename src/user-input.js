module.exports = userInput

function userInput(input) {
    var func      = function (key) {
        var value = 0;
        for (var i = 0; i < func._inputs.length; i++) {
            value += func._inputs[i][key] || 0;
        }
        return value;
    }
    func._inputs  = input ? [].concat(input) : []
    func.addInput = function (input) {
        func._inputs.push(input)
    }
    return func;
}
