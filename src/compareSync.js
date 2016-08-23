var isString = require("@nathanfaucett/is_string"),
    safeStringCompare = require("./core/safeStringCompare"),
    hashSync = require("./hashSync");


module.exports = compareSync;


function compareSync(s, hash) {
    if (!isString(s) || !isString(hash)) {
        throw new Error("Illegal arguments: " + (typeof s) + ', ' + (typeof hash));
    }
    if (hash.length !== 60) {
        return false;
    } else {
        return safeStringCompare(hashSync(s, hash.substr(0, hash.length - 31)), hash);
    }
}