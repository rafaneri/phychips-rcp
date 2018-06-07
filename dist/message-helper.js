"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crc16_1 = require("./crc16");
var utils_1 = require("./utils");
var MessageHelper;
(function (MessageHelper) {
    var preamble = 0xBB;
    var endMark = 0x7E;
    function buildCommand(cmd) {
        cmd.push(endMark); // Push end mark
        var buffer = Buffer.from(cmd);
        var crc16Vet = utils_1.Util.toByteArray(crc16_1.crc16(buffer).toString(16)); // calculate crc16 of command without preamble
        cmd = cmd.concat(crc16Vet); // concat crc16 to cmd buffer
        cmd.unshift(preamble); // add preamble on the first position
        return Buffer.from(cmd);
    }
    MessageHelper.buildCommand = buildCommand;
})(MessageHelper = exports.MessageHelper || (exports.MessageHelper = {}));
