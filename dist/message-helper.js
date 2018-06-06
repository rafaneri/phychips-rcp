"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crc16 = require('crc16');
var MessageHelper;
(function (MessageHelper) {
    var preamble = 0xBB;
    var endMark = 0x7E;
    function buildCommand(cmd) {
        cmd.unshift(preamble);
        cmd.push(endMark);
        cmd.push(crc16(new Buffer(cmd)));
        return new Buffer(cmd);
    }
    MessageHelper.buildCommand = buildCommand;
})(MessageHelper = exports.MessageHelper || (exports.MessageHelper = {}));
