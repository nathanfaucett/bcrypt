var isString = require("@nathanfaucett/is_string");


module.exports = getRounds;


function getRounds(hash) {
    if (!isString(hash)) {
        throw new Error("Illegal arguments: " + (typeof hash));
    } else {
        return parseInt(hash.split("$")[2], 10);
    }
}