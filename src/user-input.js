module.exports = UserInput

function UserInput(input) {
    if (!input) throw Error("An input is required.")
    this.input  = input;
    this.values = [];
    this.value  = function (key) {
        return this.values[key] || 0;
    }
}
