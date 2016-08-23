var C_ORIG = require("../consts/C_ORIG"),
    P_ORIG = require("../consts/P_ORIG"),
    S_ORIG = require("../consts/S_ORIG"),
    BCRYPT_SALT_LEN = require("../consts/BCRYPT_SALT_LEN"),
    key = require("./key"),
    ekskey = require("./ekskey"),
    encipher = require("./encipher");


module.exports = cryptSync;


function cryptSync(b, salt, rounds) {
    var cdata = C_ORIG.slice(),
        clen = cdata.length,
        P, S, i, j, ret;

    if (rounds < 4 || rounds > 31) {
        throw new Error("Illegal number of rounds (4-31): " + rounds);
    }

    if (salt.length !== BCRYPT_SALT_LEN) {
        throw new Error("Illegal salt length: " + salt.length + " != " + BCRYPT_SALT_LEN);
    }

    rounds = (1 << rounds) >>> 0;
    P = P_ORIG.slice();
    S = S_ORIG.slice();
    i = 0;

    ekskey(salt, b, P, S);

    while (true) {
        if (i < rounds) {
            while (i < rounds) {
                i = i + 1;
                key(b, P, S);
                key(salt, P, S);
            }
        } else {
            for (i = 0; i < 64; i++) {
                for (j = 0; j < (clen >> 1); j++) {
                    encipher(cdata, j << 1, P, S);
                }
            }
            ret = [];

            for (i = 0; i < clen; i++) {
                ret[ret.length] = ((cdata[i] >> 24) & 0xff) >>> 0;
                ret[ret.length] = ((cdata[i] >> 16) & 0xff) >>> 0;
                ret[ret.length] = ((cdata[i] >> 8) & 0xff) >>> 0;
                ret[ret.length] = (cdata[i] & 0xff) >>> 0;
            }

            return ret;
        }
    }
}