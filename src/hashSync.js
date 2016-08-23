var isString = require("@nathanfaucett/is_string"),
    isNumber = require("@nathanfaucett/is_number"),
    isNullOrUndefined = require("@nathanfaucett/is_null_or_undefined"),
    GENSALT_DEFAULT_LOG2_ROUNDS = require("./consts/GENSALT_DEFAULT_LOG2_ROUNDS"),
    genSaltSync = require("./genSaltSync"),
    coreHashSync = require("./core/hashSync");


module.exports = hashSync;


function hashSync(s, salt) {
    if (isNullOrUndefined(salt)) {
        salt = GENSALT_DEFAULT_LOG2_ROUNDS;
    }
    if (isNumber(salt)) {
        salt = genSaltSync(salt);
    }
    if (!isString(s) || !isString(salt)) {
        throw new Error("Illegal arguments: " + (typeof s) + ", " + (typeof salt));
    }

    return coreHashSync(s, salt);
}