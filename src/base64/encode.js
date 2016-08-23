var BASE64_CODE = require("./BASE64_CODE");


module.exports = base64Encode;


function base64Encode(b, len) {
    var off = 0,
        rs = '',
        c1, c2;

    if (len <= 0 || len > b.length) {
        throw new Error("Illegal len: " + len);
    }

    while (off < len) {
        c1 = b[off++] & 0xff;
        rs += (BASE64_CODE[(c1 >> 2) & 0x3f]);
        c1 = (c1 & 0x03) << 4;
        if (off >= len) {
            rs += (BASE64_CODE[c1 & 0x3f]);
            break;
        }
        c2 = b[off++] & 0xff;
        c1 |= (c2 >> 4) & 0x0f;
        rs += (BASE64_CODE[c1 & 0x3f]);
        c1 = (c2 & 0x0f) << 2;
        if (off >= len) {
            rs += (BASE64_CODE[c1 & 0x3f]);
            break;
        }
        c2 = b[off++] & 0xff;
        c1 |= (c2 >> 6) & 0x03;
        rs += (BASE64_CODE[c1 & 0x3f]);
        rs += (BASE64_CODE[c2 & 0x3f]);
    }

    return rs;
}