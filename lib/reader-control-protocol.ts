import { Packet } from './packet';
import { MessageTypes } from './message-types';
import { MessageCode } from './message-code';
import { MessageHelper } from './message-helper';

export module ReaderControlProtocol {

    export function startAutoRead2(): Packet {
        let args = [
            0x02, //Reserve: type B tag (0x01), type C Tag (0x02)
            0x00, //MTNU: maximum number of tag to read
            0x00, //MTIME: maximum elapsed time to tagging (sec)
            0x00, //RC(MSB)
            0x00 //RC(LSB) RC (16-bit): Repeat cycle (how many times reader perform inventory round).
        ];
        return new Packet(MessageTypes.MT_Command,
            MessageCode.MC_START_AUTO_READ2, args);
    }

    export function stopAutoRead2(): Packet {
        return new Packet(MessageTypes.MT_Command,
            MessageCode.MC_STOP_AUTO_READ2);
    }

    export function setPowerMode(arg: number): Packet {
        let args = [arg];
        return new Packet(MessageTypes.MT_Command,
            MessageCode.MC_SET_READER_POWER_CONTROL, args);
    }

    export function setAntiCollisionMode(arg: number): Packet {
        let args = [arg, 0x04, 0x07, 0x02];
        return new Packet(MessageTypes.MT_Command,
            MessageCode.MC_SET_ANTI_COLLISION_MODE, args);
    }

    export function getTemperature(): Packet {
        return new Packet(MessageTypes.MT_Command,
            MessageCode.MC_GET_TEMPERATURE);
    }

}