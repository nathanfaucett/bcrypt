module.exports = safeStringCompare;


function safeStringCompare(known, unknown) {
    var wrong = 0,
        i = -1,
        il = known.length - 1;

    while (i++ < il) {
        if (known.charCodeAt(i) !== unknown.charCodeAt(i)) {
            wrong++;
        }
    }

    return wrong === 0;
}
