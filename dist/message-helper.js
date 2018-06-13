"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var message_types_1 = require("./message-types");
var MessageHelper;
(function (MessageHelper) {
    var preamble = 0xBB;
    var endMark = 0x7E;
    function buildCommand(header, args) {
        if (args === void 0) { args = []; }
        args = header.concat(utils_1.Util.intTo2Bytes(args.length)).concat(args);
        args.push(endMark); // Push end mark
        var buffer = Buffer.from(args);
        var crc16Vet = utils_1.Util.toByteArray(utils_1.Util.crc16(buffer).toString(16)); // calculate crc16 of command without preamble
        args = args.concat(crc16Vet); // concat crc16 to cmd buffer
        args.unshift(preamble); // add preamble on the first position
        return Buffer.from(args);
    }
    MessageHelper.buildCommand = buildCommand;
    function unwrapperResponse(response) {
        if (response.length < 2 || response[1] != message_types_1.MessageTypes.MT_Response) {
            return Buffer.from([]);
        }
        return unwrapperPacket(response);
    }
    MessageHelper.unwrapperResponse = unwrapperResponse;
    function unwrapperNotification(notification) {
        if (notification.length < 2 || notification[1] != message_types_1.MessageTypes.MT_Notification) {
            return Buffer.from([]);
        }
        return unwrapperPacket(notification);
    }
    MessageHelper.unwrapperNotification = unwrapperNotification;
    function getStringData(args) {
        return utils_1.Util.Utf8ArrayToStr(args);
    }
    MessageHelper.getStringData = getStringData;
    function unwrapperPacket(packet) {
        var payloadLength = packet[3] + packet[4];
        var payload = packet.subarray(5, 5 + payloadLength);
        while (payload[payload.length - 1] === 0) {
            payload = payload.subarray(0, payload.length - 1);
        }
        return Buffer.from(payload);
    }
})(MessageHelper = exports.MessageHelper || (exports.MessageHelper = {}));
