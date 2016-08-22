var Promise = require("@nathanfaucett/promise_polyfill"),
    isString = require("@nathanfaucett/is_string"),
    isFunction = require("@nathanfaucett/is_function"),
    safeStringCompare = require("./core/safeStringCompare"),
    hash = require("./hash");


module.exports = compare;


function compare(s, hashStr, callback, progressCallback) {

    function asyncFn(callback) {
        if (!isString(s) || !isString(hashStr)) {
            callback(new Error("Illegal arguments: " + (typeof s) + ', ' + (typeof hash)));
            return;
        }
        if (hashStr.length !== 60) {
            callback(null, false);
            return;
        }
        hash(s, hashStr.substr(0, 29), function onHash(error, comp) {
            if (error) {
                callback(error);
            } else {
                callback(null, safeStringCompare(comp, hashStr));
            }
        }, progressCallback);
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
