var Promise = require("@nathanfaucett/promise_polyfill"),
    isString = require("@nathanfaucett/is_string"),
    isFunction = require("@nathanfaucett/is_function"),
    isNumber = require("@nathanfaucett/is_number"),
    coreHash = require("./core/hash"),
    genSalt = require("./genSalt");


module.exports = hash;


function hash(s, salt, callback, progressCallback) {

    function asyncFn(callback) {
        if (isString(s) && isNumber(salt)) {
            genSalt(salt, function onGenSalt(error, salt) {
                coreHash(s, salt, callback, progressCallback);
            });
        } else if (isString(s) && isString(salt)) {
            coreHash(s, salt, callback, progressCallback);
        } else {
            callback(new Error("Illegal arguments: " + (typeof s) + ', ' + (typeof salt)));
        }
    }

    if (callback) {
        if (!isFunction(callback)) {
            throw new Error("Illegal callback: " + typeof(callback));
        } else {
            asyncFn(callback);
        }
    } else {
        return new Promise(function resolver(resolve, reject) {
            asyncFn(function onDone(error, res) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(res);
            });
        });
    }
}
