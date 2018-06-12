"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_types_1 = require("./message-types");
var message_code_1 = require("./message-code");
var message_helper_1 = require("./message-helper");
var RCP;
(function (RCP) {
    function startAutoRead2() {
        var header = [message_types_1.MessageTypes.MT_Command,
            message_code_1.MessageCode.MC_START_AUTO_READ2];
        var args = [
            0x02,
            0x00,
            0x00,
            0x00,
            0x00 //RC(LSB) RC (16-bit): Repeat cycle (how many times reader perform inventory round).
        ];
        return message_helper_1.MessageHelper.buildCommand(header, args);
    }
    RCP.startAutoRead2 = startAutoRead2;
    function stopAutoRead2() {
        var header = [message_types_1.MessageTypes.MT_Command,
            message_code_1.MessageCode.MC_STOP_AUTO_READ2
        ];
        return message_helper_1.MessageHelper.buildCommand(header);
    }
    RCP.stopAutoRead2 = stopAutoRead2;
    function setPowerMode(arg) {
        var header = [message_types_1.MessageTypes.MT_Command,
            message_code_1.MessageCode.MC_SET_READER_POWER_CONTROL
        ];
        var args = [arg];
        return message_helper_1.MessageHelper.buildCommand(header, args);
    }
    RCP.setPowerMode = setPowerMode;
    function getTemperature() {
        var header = [message_types_1.MessageTypes.MT_Command,
            message_code_1.MessageCode.MC_GET_TEMPERATURE
        ];
        return message_helper_1.MessageHelper.buildCommand(header);
    }
    RCP.getTemperature = getTemperature;
})(RCP = exports.RCP || (exports.RCP = {}));
