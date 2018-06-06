import { crc16 } from "./crc16";
import { Util } from "./utils";

export module MessageHelper {

    let preamble: number = 0xBB;
    let endMark: number = 0x7E;

    export function buildCommand(cmd: number[]): Buffer {
        cmd.push(endMark); // Push end mark

        let buffer = new Buffer(cmd);
        let crc16Vet = Util.toByteArray(crc16(buffer).toString(16)); // calculate crc16 of command without preamble

        cmd = cmd.concat(crc16Vet); // concat crc16 to cmd buffer
        cmd.unshift(preamble); // add preamble on the first position

        return new Buffer(cmd);
    }

}