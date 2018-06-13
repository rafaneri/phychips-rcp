"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var PacketHelper = /** @class */ (function () {
    function PacketHelper() {
    }
    PacketHelper.fromArgs = function (header, args) {
        if (args === void 0) { args = []; }
        args = header.concat(utils_1.Util.intTo2Bytes(args.length)).concat(args);
        args.push(endMark); // Push end mark
        var buffer = Buffer.from(args);
        var crc16Vet = utils_1.Util.toByteArray(utils_1.Util.crc16(buffer).toString(16)); // calculate crc16 of command without preamble
        args = args.concat(crc16Vet); // concat crc16 to cmd buffer
        args.unshift(preamble); // add preamble on the first position
        return Buffer.from(args);
    };
    return PacketHelper;
}());
exports.PacketHelper = PacketHelper;
