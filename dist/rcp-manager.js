"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var packet_1 = require("./packet");
var events_1 = require("events");
var RcpManager = /** @class */ (function (_super) {
    __extends(RcpManager, _super);
    function RcpManager() {
        var _this = _super.call(this) || this;
        _this.preamble = 0xBB;
        _this.endMark = 0x7E;
        _this.byteRxPkt = Buffer.from([]);
        _this.rcpReceivedPacket = false;
        _this.rcpReceivedPacketCrcError = false;
        return _this;
    }
    RcpManager.prototype.dataReceived = function (data) {
        if (data.length != 0) {
            this.byteRxPkt = Buffer.concat([this.byteRxPkt, data], this.byteRxPkt.length + data.length);
            var num = 0;
            for (num = 0; num < this.byteRxPkt.length && this.byteRxPkt[num] != this.preamble; num++) {
            }
            if (num != 0) {
                this.byteRxPkt = Buffer.from(this.byteRxPkt.subarray(num, this.byteRxPkt.length - num));
            }
            while (true) {
                if (this.byteRxPkt.length > 8) {
                    var num2 = (this.byteRxPkt[3] << 8) + this.byteRxPkt[4];
                    if (this.byteRxPkt[num2 + 5] == this.endMark) {
                        this.rcpReceivedPacket = true;
                        var bytePkt2 = Buffer.from(this.byteRxPkt.subarray(0, num2 + 8));
                        this.parseRxData(bytePkt2);
                        bytePkt2 = Buffer.from([]);
                        if (this.byteRxPkt.length - (num2 + 8) > 0) {
                            bytePkt2 = Buffer.from(this.byteRxPkt.subarray(num2 + 8, this.byteRxPkt.length - (num2 + 8)));
                        }
                        this.byteRxPkt = Buffer.from(bytePkt2);
                        continue;
                    }
                    this.byteRxPkt = Buffer.from([]);
                    continue;
                }
                return;
            }
        }
    };
    RcpManager.prototype.parseRxData = function (buffer) {
        switch (buffer[1]) {
            case 1:
            case 2:
            case 3:
            case 4:
                this.emit('packet', packet_1.Packet.from(buffer));
                break;
        }
    };
    return RcpManager;
}(events_1.EventEmitter));
exports.RcpManager = RcpManager;
