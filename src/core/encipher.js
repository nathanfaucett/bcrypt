var BLOWFISH_NUM_ROUNDS = require("../consts/BLOWFISH_NUM_ROUNDS");


module.exports = encipher;


function encipher(lr, off, P, S) {
    var l = lr[off],
        r = lr[off + 1],
        i = 0,
        k = BLOWFISH_NUM_ROUNDS - 1,
        n;

    l ^= P[0];
    while (i < k) {
        // Feistel substitution on left word
        n = S[(l >> 24) & 0xff];
        n += S[0x100 | ((l >> 16) & 0xff)];
        n ^= S[0x200 | ((l >> 8) & 0xff)];
        n += S[0x300 | (l & 0xff)];
        r ^= n ^ P[++i];
        // Feistel substitution on right word
        n = S[(r >> 24) & 0xff];
        n += S[0x100 | ((r >> 16) & 0xff)];
        n ^= S[0x200 | ((r >> 8) & 0xff)];
        n += S[0x300 | (r & 0xff)];
        l ^= n ^ P[++i];
    }

    lr[off] = r ^ P[BLOWFISH_NUM_ROUNDS + 1];
    lr[off + 1] = l;

    return lr;
}