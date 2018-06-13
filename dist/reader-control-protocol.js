"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var packet_1 = require("./packet");
var message_types_1 = require("./message-types");
var message_code_1 = require("./message-code");
var ReaderControlProtocol;
(function (ReaderControlProtocol) {
    function startAutoRead2() {
        var args = [
            0x02,
            0x00,
            0x00,
            0x00,
            0x00 //RC(LSB) RC (16-bit): Repeat cycle (how many times reader perform inventory round).
        ];
        return new packet_1.Packet(message_types_1.MessageTypes.MT_Command, message_code_1.MessageCode.MC_START_AUTO_READ2, args);
    }
    ReaderControlProtocol.startAutoRead2 = startAutoRead2;
    function stopAutoRead2() {
        return new packet_1.Packet(message_types_1.MessageTypes.MT_Command, message_code_1.MessageCode.MC_STOP_AUTO_READ2);
    }
    ReaderControlProtocol.stopAutoRead2 = stopAutoRead2;
    function setPowerMode(arg) {
        var args = [arg];
        return new packet_1.Packet(message_types_1.MessageTypes.MT_Command, message_code_1.MessageCode.MC_SET_READER_POWER_CONTROL, args);
    }
    ReaderControlProtocol.setPowerMode = setPowerMode;
    function setAntiCollisionMode(arg) {
        var args = [arg, 0x04, 0x07, 0x02];
        return new packet_1.Packet(message_types_1.MessageTypes.MT_Command, message_code_1.MessageCode.MC_SET_ANTI_COLLISION_MODE, args);
    }
    ReaderControlProtocol.setAntiCollisionMode = setAntiCollisionMode;
    function getTemperature() {
        return new packet_1.Packet(message_types_1.MessageTypes.MT_Command, message_code_1.MessageCode.MC_GET_TEMPERATURE);
    }
    ReaderControlProtocol.getTemperature = getTemperature;
})(ReaderControlProtocol = exports.ReaderControlProtocol || (exports.ReaderControlProtocol = {}));
