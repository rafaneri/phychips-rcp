import { Util } from "./utils";
import { MessageTypes } from "./message-types";

export module MessageHelper {

    let preamble: number = 0xBB;
    let endMark: number = 0x7E;

    export function buildCommand(header: number[], args: number[] = []): Buffer {
        args = header.concat(Util.intTo2Bytes(args.length)).concat(args);

        args.push(endMark); // Push end mark

        let buffer = Buffer.from(args);
        let crc16Vet = Util.toByteArray(Util.crc16(buffer).toString(16)); // calculate crc16 of command without preamble

        args = args.concat(crc16Vet); // concat crc16 to cmd buffer
        args.unshift(preamble); // add preamble on the first position

        return Buffer.from(args);
    }

    export function unwrapperResponse(response: Buffer): Buffer {
        if (response.length < 2 || response[1] != MessageTypes.MT_Response) {
            return Buffer.from([]);
        }

        return unwrapperPacket(response);
    }

    export function unwrapperNotification(notification: Buffer): Buffer {
        if (notification.length < 2 || notification[1] != MessageTypes.MT_Notification) {
            return Buffer.from([]);
        }

        return unwrapperPacket(notification);
    }

    export function getStringData(args: Buffer) : string {
        return Util.Utf8ArrayToStr(args);
    }

    function unwrapperPacket(packet: Buffer): Buffer {
        let payloadLength = packet[3] + packet[4];
        let payload = packet.subarray(5, 5 + payloadLength);

        while (payload[payload.length - 1] === 0) {
            payload = payload.subarray(0, payload.length - 1);
        }

        return Buffer.from(payload);
    }

}