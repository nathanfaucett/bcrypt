var encipher = require("./encipher"),
    streamToWord = require("./streamToWord"),
    Word = require("./Word");


var WORD = new Word(),
    LR = [0, 0];


module.exports = key;


function key(key, P, S) {
    var offset = 0,
        lr = LR,
        plen = P.length,
        slen = S.length,
        w = WORD,
        sw, i;

    lr[0] = 0;
    lr[1] = 0;

    i = 0;
    while (i < plen) {
        sw = streamToWord(key, offset, w);
        offset = sw.offp;
        P[i] = P[i] ^ sw.key;
        i++;
    }

    i = 0;
    while (i < plen) {
        lr = encipher(lr, 0, P, S);
        P[i] = lr[0];
        P[i + 1] = lr[1];
        i += 2;
    }

    i = 0;
    while (i < slen) {
        lr = encipher(lr, 0, P, S);
        S[i] = lr[0];
        S[i + 1] = lr[1];
        i += 2;
    }
}
