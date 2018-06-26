import { Packet } from './packet';
import { Util } from ".";
import { EventEmitter } from 'events';

export class RcpManager extends EventEmitter {
    private preamble: number = 0xBB;
    private endMark: number = 0x7E;
    private byteRxPkt: Buffer;
    private rcpReceivedPacket: boolean;
    private rcpReceivedPacketCrcError: boolean;
    private static instance: RcpManager;

    constructor() {
        super();
        this.byteRxPkt = Buffer.from([]);
        this.rcpReceivedPacket = false;
        this.rcpReceivedPacketCrcError = false;
    }

    dataReceived(data: Buffer): void {
        if (data.length != 0) {
            this.byteRxPkt = Buffer.concat([this.byteRxPkt, data], this.byteRxPkt.length + data.length);
            let num = 0;
            for (num = 0; num < this.byteRxPkt.length && this.byteRxPkt[num] != this.preamble; num++) {
            }
            if (num != 0) {
                this.byteRxPkt = Buffer.from(this.byteRxPkt.subarray(num, this.byteRxPkt.length - num));
            }

            while (true) {
                if (this.byteRxPkt.length > 8) {
                    let num2 = (this.byteRxPkt[3] << 8) + this.byteRxPkt[4];
                    if (this.byteRxPkt[num2 + 5] == this.endMark) {
                        this.rcpReceivedPacket = true;
                        let bytePkt2 = Buffer.from(this.byteRxPkt.subarray(0, num2 + 8));
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
    }

    private parseRxData(buffer: Buffer): void {
        switch (buffer[1]) {
            case 1:
            case 2:
            case 3:
            case 4:
                this.emit('packet', Packet.from(buffer));
                break;
        }
    }
}