var isNumber = require("@nathanfaucett/is_number"),
    getRandomBytes = require("@nathanfaucett/get_random_bytes"),
    BCRYPT_SALT_LEN = require("./consts/BCRYPT_SALT_LEN"),
    GENSALT_DEFAULT_LOG2_ROUNDS = require("./consts/GENSALT_DEFAULT_LOG2_ROUNDS"),
    base64Encode = require("./base64/encode");


module.exports = genSaltSync;


function genSaltSync(rounds, seedLength) {
    var salt;

    rounds = rounds || GENSALT_DEFAULT_LOG2_ROUNDS;

    if (!isNumber(rounds)) {
        throw new Error("Illegal arguments: " + (typeof rounds) + ", " + (typeof seedLength));
    }

    if (rounds < 4) {
        rounds = 4;
    } else if (rounds > 31) {
        rounds = 31;
    }

    salt = '';
    salt += ("$2a$");
    if (rounds < 10) {
        salt += ("0");
    }

    salt += (rounds.toString());
    salt += ('$');

    salt += (base64Encode(getRandomBytes(BCRYPT_SALT_LEN), BCRYPT_SALT_LEN));

    return salt;
}