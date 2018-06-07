"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function crc16(data, offset) {
    if (offset === void 0) { offset = 0; }
    if (data == null || offset < 0 || offset > data.length - 1) {
        return 0;
    }
    var crc = 0xFFFF;
    for (var i = 0; i < data.length; ++i) {
        crc ^= data[offset + i] << 8;
        for (var j = 0; j < 8; ++j) {
            crc = (crc & 0x8000) > 0 ? (crc << 1) ^ 0x1021 : crc << 1;
        }
    }
    return crc & 0xFFFF;
}
exports.crc16 = crc16;
