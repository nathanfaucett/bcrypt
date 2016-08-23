var encipher = require("./encipher"),
    streamToWord = require("./streamToWord"),
    Word = require("./Word");


var WORD = new Word(),
    LR = [0, 0];


module.exports = ekskey;


function ekskey(data, key, P, S) {
    var offp = 0,
        lr = LR,
        w = WORD,
        plen = P.length,
        slen = S.length,
        sw, i;

    lr[0] = 0;
    lr[1] = 0;

    i = 0;
    while (i < plen) {
        sw = streamToWord(key, offp, w);
        offp = sw.offp;
        P[i] = P[i] ^ sw.key;
        i++;
    }
    offp = 0;
    i = 0;
    while (i < plen) {
        sw = streamToWord(data, offp, w);
        offp = sw.offp;
        lr[0] ^= sw.key;
        sw = streamToWord(data, offp, w);
        offp = sw.offp;
        lr[1] ^= sw.key;
        lr = encipher(lr, 0, P, S);
        P[i] = lr[0];
        P[i + 1] = lr[1];
        i += 2;
    }
    i = 0;
    while (i < slen) {
        sw = streamToWord(data, offp, w);
        offp = sw.offp;
        lr[0] ^= sw.key;
        sw = streamToWord(data, offp, w);
        offp = sw.offp;
        lr[1] ^= sw.key;
        lr = encipher(lr, 0, P, S);
        S[i] = lr[0];
        S[i + 1] = lr[1];
        i += 2;
    }
}