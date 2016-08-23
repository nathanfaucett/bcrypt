var isString = require("@nathanfaucett/is_string");


module.exports = getSalt;


function getSalt(hash) {
    if (!isString(hash)) {
        throw new Error("Illegal arguments: " + (typeof hash));
    }
    if (hash.length !== 60) {
        throw new Error("Illegal hash length: " + hash.length + " != 60");
    }
    return hash.substring(0, 29);
}