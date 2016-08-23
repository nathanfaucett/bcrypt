var BASE64_INDEX = require("./BASE64_INDEX");


var stringFromCharCode = String.fromCharCode;


module.exports = base64Decode;


function base64Decode(s, len) {
    var off = 0,
        slen = s.length,
        olen = 0,
        rs = [],
        c1, c2, c3, c4, o, code, res;

    if (len <= 0) {
        throw new Error("Illegal len: " + len);
    }

    while (off < slen - 1 && olen < len) {
        code = s.charCodeAt(off++);
        c1 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
        code = s.charCodeAt(off++);
        c2 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
        if (c1 === -1 || c2 === -1) {
            break;
        }
        o = (c1 << 2) >>> 0;
        o |= (c2 & 0x30) >> 4;
        rs[rs.length] = stringFromCharCode(o);
        if (++olen >= len || off >= slen) {
            break;
        }
        code = s.charCodeAt(off++);
        c3 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
        if (c3 === -1) {
            break;
        }
        o = ((c2 & 0x0f) << 4) >>> 0;
        o |= (c3 & 0x3c) >> 2;
        rs[rs.length] = stringFromCharCode(o);
        if (++olen >= len || off >= slen) {
            break;
        }
        code = s.charCodeAt(off++);
        c4 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
        o = ((c3 & 0x03) << 6) >>> 0;
        o |= c4;
        rs[rs.length] = stringFromCharCode(o);
        ++olen;
    }
    res = [];
    for (off = 0; off < olen; off++) {
        res[res.length] = rs[off].charCodeAt(0);
    }
    return res;
}