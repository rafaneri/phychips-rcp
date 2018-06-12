import { MessageTypes } from './message-types';
import { MessageCode } from './message-code';
import { MessageHelper } from './message-helper';

export module ReaderControlProtocol {

    export function startAutoRead2(): Buffer {
        let header = [MessageTypes.MT_Command, 
            MessageCode.MC_START_AUTO_READ2];
        let args = [
            0x02, //Reserve: type B tag (0x01), type C Tag (0x02)
            0x00, //MTNU: maximum number of tag to read
            0x00, //MTIME: maximum elapsed time to tagging (sec)
            0x00, //RC(MSB)
            0x00 //RC(LSB) RC (16-bit): Repeat cycle (how many times reader perform inventory round).
        ];
        return MessageHelper.buildCommand(header, args);
    }

    export function stopAutoRead2(): Buffer {
        let header = [MessageTypes.MT_Command, 
            MessageCode.MC_STOP_AUTO_READ2
        ];
        return MessageHelper.buildCommand(header);
    }

    export function setPowerMode(arg:number): Buffer {
        let header = [MessageTypes.MT_Command, 
            MessageCode.MC_SET_READER_POWER_CONTROL
        ];
        let args = [arg];
        return MessageHelper.buildCommand(header, args);
    }

    export function getTemperature(): Buffer {
        let header = [MessageTypes.MT_Command, 
            MessageCode.MC_GET_TEMPERATURE
        ];
        return MessageHelper.buildCommand(header);
    }
    
}