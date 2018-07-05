"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_code_1 = require("./message-code");
var utils_1 = require("./utils");
var _ = require("lodash");
var Packet = /** @class */ (function () {
    function Packet(messageType, messageCode, args, response) {
        this.messageType = messageType;
        this.messageCode = messageCode;
        this.args = args;
        this.response = response;
        this.preamble = 0xBB;
        this.endMark = 0x7E;
        this.payload = [];
        this.bufferCommand = Buffer.from([]);
    }
    Packet.prototype.command = function () {
        if (this.bufferCommand.length === 0) {
            if (this.args === undefined) {
                this.args = [];
            }
            this.payload = utils_1.Util.intTo2Bytes(this.args.length);
            this.args = [this.messageType, this.messageCode].concat(this.payload).concat(this.args);
            this.args.push(this.endMark); // Push end mark
            var buffer = Buffer.from(this.args);
            var crc16Vet = utils_1.Util.toByteArray(utils_1.Util.crc16(buffer).toString(16)); // calculate crc16 of command without preamble
            this.args = this.args.concat(crc16Vet); // concat crc16 to cmd buffer
            this.args.unshift(this.preamble); // add preamble on the first position
            this.bufferCommand = Buffer.from(this.args);
        }
        return this.bufferCommand;
    };
    Packet.prototype.data_str = function () {
        if (this.args !== undefined && this.args.length > 0) {
            return utils_1.Util.Utf8ArrayToStr(Uint8Array.from(this.args));
        }
        else {
            return '';
        }
    };
    Packet.prototype.data_int = function () {
        if (this.args !== undefined && this.args.length > 0) {
            return parseInt(Buffer.from(this.args).toString('hex'), 16);
        }
        else {
            return 0;
        }
    };
    Packet.prototype.getEpc = function () {
        if (this.args !== undefined && this.args.length > 0) {
            return Buffer.from(this.args);
        }
        else {
            return Buffer.from([]);
        }
    };
    Packet.prototype.isValid = function () {
        if (this.bufferCommand.length < 8)
            return false;
        var bf = Buffer.from(this.bufferCommand.subarray(1, this.bufferCommand.length - 2));
        var orCk = [].slice.call(this.bufferCommand.subarray(this.bufferCommand.length - 2));
        var ck = utils_1.Util.toByteArray(utils_1.Util.crc16(bf).toString(16));
        return _.isEqual(ck, orCk);
    };
    Packet.prototype.hasError = function () {
        if (this.bufferCommand.length < 8)
            return false;
        return this.messageCode === message_code_1.MessageCode.MC_COMMAND_FAILURE;
    };
    Packet.from = function (buffer) {
        var payloadLength = buffer[3] + buffer[4];
        var args = buffer.subarray(5, 5 + payloadLength);
        while (args[args.length - 1] === 0 && args.length > 1) {
            args = args.subarray(0, args.length - 1);
        }
        var array = [].slice.call(args);
        var packet = new Packet(buffer[1], buffer[2], array);
        packet.payload = utils_1.Util.intTo2Bytes(payloadLength);
        packet.bufferCommand = buffer;
        return packet;
    };
    return Packet;
}());
exports.Packet = Packet;
