"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_types_1 = require("./message-types");
var message_code_1 = require("./message-code");
var message_helper_1 = require("./message-helper");
var RCP;
(function (RCP) {
    function startAutoRead2() {
        var cmd = [message_types_1.MessageTypes.MT_00,
            message_code_1.MessageCode.MC_START_AUTO_READ2,
            0x00,
            0x05,
            0x02,
            0x00,
            0x00,
            0x00,
            0x64 //RC(LSB)
        ];
        return message_helper_1.MessageHelper.buildCommand(cmd);
    }
    RCP.startAutoRead2 = startAutoRead2;
    function stopAutoRead2() {
        var cmd = [message_types_1.MessageTypes.MT_00,
            message_code_1.MessageCode.MC_STOP_AUTO_READ2,
            0x00,
            0x00,
        ];
        return message_helper_1.MessageHelper.buildCommand(cmd);
    }
    RCP.stopAutoRead2 = stopAutoRead2;
})(RCP = exports.RCP || (exports.RCP = {}));
