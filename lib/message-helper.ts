import { crc16 } from "./crc16";
import { Util } from "./utils";

export module MessageHelper {

    let preamble: number = 0xBB;
    let endMark: number = 0x7E;

    export function buildCommand(cmd: number[]): Buffer {
        cmd.push(endMark); // Push end mark

        let buffer = Buffer.from(cmd);
        let crc16Vet = Util.toByteArray(crc16(buffer).toString(16)); // calculate crc16 of command without preamble

        cmd = cmd.concat(crc16Vet); // concat crc16 to cmd buffer
        cmd.unshift(preamble); // add preamble on the first position

        return Buffer.from(cmd);
    }

    export function unwrapperResponse(response: Buffer): any {
        let payloadLength = response[3] + response[4];
        let payload = response.subarray(5, 5 + payloadLength);

        while (payload[payload.length - 1] === 0) {
            payload = payload.subarray(0, payload.length - 1);
        }

        return Util.Utf8ArrayToStr(payload);
    }

}