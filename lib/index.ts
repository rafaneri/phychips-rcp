import { MessageTypes } from './message-types';
import { MessageCode } from './message-code';
import { MessageHelper } from './message-helper';

export module RCP {

    export function startAutoRead2(): Buffer {
        let cmd = [MessageTypes.MT_00, 
            MessageCode.MC_START_AUTO_READ2, 
            0x00, //PL (MSB)
            0x05, //PL (LSB)
            0x02, //Reserve: type B tag (0x01), type C Tag (0x02)
            0x00, //MTNU: maximum number of tag to read
            0x00, //MTIME: maximum elapsed time to tagging (sec)
            0x00, //RC(MSB)
            0x00 //RC(LSB) RC (16-bit): Repeat cycle (how many times reader perform inventory round).
        ];
        return MessageHelper.buildCommand(cmd);
    }

    export function stopAutoRead2(): Buffer {
        let cmd = [MessageTypes.MT_00, 
            MessageCode.MC_STOP_AUTO_READ2, 
            0x00, //PL (MSB)
            0x00, //PL (LSB)
        ];
        return MessageHelper.buildCommand(cmd);
    }
    
}
