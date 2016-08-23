var now = require("@nathanfaucett/now"),
    isFunction = require("@nathanfaucett/is_function"),
    C_ORIG = require("../consts/C_ORIG"),
    P_ORIG = require("../consts/P_ORIG"),
    S_ORIG = require("../consts/S_ORIG"),
    MAX_EXECUTION_TIME = require("../consts/MAX_EXECUTION_TIME"),
    BCRYPT_SALT_LEN = require("../consts/BCRYPT_SALT_LEN"),
    key = require("./key"),
    ekskey = require("./ekskey"),
    encipher = require("./encipher");


module.exports = crypt;


function crypt(b, salt, rounds, callback, progressCallback) {
    var cdata = C_ORIG.slice(),
        clen = cdata.length,
        P, S, i, j;

    if (!isFunction(callback)) {
        callback(new Error("Illegal callback type: " + typeof(callback)));
        return;
    }
    if (salt.length !== BCRYPT_SALT_LEN) {
        callback(new Error("Illegal salt length: " + salt.length + " != " + BCRYPT_SALT_LEN));
        return;
    }

    rounds = (1 << rounds) >>> 0;
    P = P_ORIG.slice();
    S = S_ORIG.slice();
    i = 0;

    ekskey(salt, b, P, S);

    (function next() {
        var start, ret;

        if (progressCallback) {
            progressCallback(i / rounds);
        }

        if (i < rounds) {
            start = now();

            while (i < rounds) {
                i = i + 1;
                key(b, P, S);
                key(salt, P, S);
                if (now() - start > MAX_EXECUTION_TIME) {
                    break;
                }
            }

            process.nextTick(next);
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

            callback(null, ret);
        }
    }());
}