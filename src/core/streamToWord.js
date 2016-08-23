module.exports = streamToWord;


function streamToWord(data, offp, w) {
    var length = data.length,
        i, word;

    for (i = 0, word = 0; i < 4; i++) {
        word = (word << 8) | (data[offp] & 0xff);
        offp = (offp + 1) % length;
    }

    w.key = word;
    w.offp = offp;

    return w;
}