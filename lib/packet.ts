import { MessageCode } from './message-code';
import { MessageTypes } from "./message-types";
import { Util } from './utils';
import _ = require('lodash');

export class Packet {

    private preamble: number = 0xBB;
    private endMark: number = 0x7E;
    private bufferCommand: Buffer;
    public payload: number[] = [];

    constructor(
        public messageType: MessageTypes,
        public messageCode: MessageCode,
        public args?: number[],
        public response?: Buffer) {
        this.bufferCommand = Buffer.from([]);
    }

    command(): Buffer {
        if (this.bufferCommand.length === 0) {
            if (this.args === undefined) {
                this.args = [];
            }
            this.payload = Util.intTo2Bytes(this.args.length)
            this.args = [this.messageType, this.messageCode].concat(this.payload).concat(this.args);

            this.args.push(this.endMark); // Push end mark

            let buffer = Buffer.from(this.args);
            let crc16Vet = Util.toByteArray(Util.crc16(buffer).toString(16)); // calculate crc16 of command without preamble

            this.args = this.args.concat(crc16Vet); // concat crc16 to cmd buffer
            this.args.unshift(this.preamble); // add preamble on the first position

            this.bufferCommand = Buffer.from(this.args);
        }
        return this.bufferCommand;
    }

    data_str(): string {
        if (this.args !== undefined && this.args.length > 0) {
            return Util.Utf8ArrayToStr(Uint8Array.from(this.args));
        } else {
            return '';
        }
    }

    data_int(): number {
        if (this.args !== undefined && this.args.length > 0) {
            return parseInt(Buffer.from(this.args).toString('hex'), 16);
        } else {
            return 0;
        }
    }

    getEpc(): Buffer {
        if (this.args !== undefined && this.args.length > 0) {
            // REMOVE THE PC Bytes
            const epc = this.args;
            epc.splice(0, 2);
            return Buffer.from(epc);
        } else {
            return Buffer.from([]);
        }
    }

    isValid(): boolean {
        if (this.bufferCommand.length < 8)
            return false;

        let bf = Buffer.from(this.bufferCommand.subarray(1, this.bufferCommand.length - 2));
        let orCk = [].slice.call(this.bufferCommand.subarray(this.bufferCommand.length - 2));
        let ck = Util.toByteArray(Util.crc16(bf).toString(16));

        return _.isEqual(ck, orCk);
    }

    hasError(): boolean {
        if (this.bufferCommand.length < 8)
            return false;

        return this.messageCode === MessageCode.MC_COMMAND_FAILURE;
    }

    static from(buffer: Buffer): Packet {
        let payloadLength = buffer[3] + buffer[4];
        let args = buffer.subarray(5, 5 + payloadLength);

        while (args[args.length - 1] === 0 && args.length > 1) {
            args = args.subarray(0, args.length - 1);
        }

        let array = [].slice.call(args);
        let packet = new Packet(buffer[1], buffer[2], array);
        packet.payload = Util.intTo2Bytes(payloadLength);
        packet.bufferCommand = buffer;
        return packet;
    }

}