var C_ORIG = require("../consts/C_ORIG"),
    base64Encode = require("../base64/encode");


module.exports = hashFinish;


function hashFinish(bytes, saltb, minor, rounds) {
    var res = '';

    res += ("$2");
    if (minor >= 'a') {
        res += (minor);
    }
    res += ("$");
    if (rounds < 10) {
        res += ("0");
    }
    res += (rounds.toString());
    res += ("$");
    res += (base64Encode(saltb, saltb.length));
    res += (base64Encode(bytes, C_ORIG.length * 4 - 1));

    return res;
}
