var Promise = require("@nathanfaucett/promise_polyfill"),
    isNumber = require("@nathanfaucett/is_number"),
    isFunction = require("@nathanfaucett/is_function"),
    GENSALT_DEFAULT_LOG2_ROUNDS = require("./consts/GENSALT_DEFAULT_LOG2_ROUNDS"),
    genSaltSync = require("./genSaltSync");


module.exports = genSalt;


function genSalt(rounds, seedLength, callback) {
    if (isFunction(seedLength)) {
        callback = seedLength;
        seedLength = undefined; // Not supported.
    }
    if (isFunction(rounds)) {
        callback = rounds;
        rounds = GENSALT_DEFAULT_LOG2_ROUNDS;
    }

    function asyncFn(callback) {
        process.nextTick(function onNextTick() {
            if (!isNumber(rounds)) {
                callback(new Error("Illegal arguments: " + (typeof rounds)));
                return;
            }

            try {
                callback(null, genSaltSync(rounds));
            } catch (error) {
                callback(error);
            }
        });
    }

    if (callback) {
        if (!isFunction(callback)) {
            throw new Error("Illegal callback: " + typeof(callback));
        } else {
            asyncFn(callback);
        }
    } else {
        return new Promise(function resolver(resolve, reject) {
            asyncFn(function onAsyncSalt(error, res) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(res);
            });
        });
    }
}
