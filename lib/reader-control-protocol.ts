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

    /**
     * CMD > Get Anti-Collision Mode
     */
    export function getAntiCollisionMode(): Packet {
        let packet = new Packet(MessageTypes.MT_Command,
            MessageCode.MC_GET_ANTI_COLLISION_MODE);
        let response = MessageHelper.buildCommand([MessageTypes.MT_Response,
        MessageCode.MC_GET_ANTI_COLLISION_MODE], [0x00]);
        packet.response = response;
        return packet;
    }

    /**
     * CMD > Get Type C A/I Select Parameter
     */
    export function getTypeCSelectParameter(): Packet {
        let packet = new Packet(MessageTypes.MT_Command,
            MessageCode.MC_GET_TYPE_SELECT_PARAMETERS);
        let response = MessageHelper.buildCommand([MessageTypes.MT_Response,
        MessageCode.MC_GET_TYPE_SELECT_PARAMETERS], [0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        packet.response = response;
        return packet;
    }

    /**
     * CMD > Get Type C A/I Query Parameter
     */
    export function getTypeCQueryParameter(): Packet {
        let packet = new Packet(MessageTypes.MT_Command,
            MessageCode.MC_GET_TYPE_QUERY_RELATED_PARAMETERS);

        let response = MessageHelper.buildCommand([MessageTypes.MT_Response,
        MessageCode.MC_GET_TYPE_QUERY_RELATED_PARAMETERS], [0xE0, 0x20]);
        
        packet.response = response;
        return packet;
    }

    /**
     * CMD > Get Registry Item : Registry Version
     */
    export function getRegistryItem(): Packet {
        let packet = new Packet(MessageTypes.MT_Command,
            MessageCode.MC_GET_REGISTRY_ITEM, [0x00, 0x00]);

        let response = MessageHelper.buildCommand([MessageTypes.MT_Response,
        MessageCode.MC_GET_REGISTRY_ITEM], [0x00, 0x06]);

        packet.response = response;
        return packet;
    }

    /**
     * CMD > Get Reader Information : Model
     */
    export function getReaderInformationModel(): Packet {
        let packet = getReaderInformation(0x00);

        let response = MessageHelper.buildCommand([MessageTypes.MT_Response,
        MessageCode.MC_GET_READER_INFORMATION], [0x50, 0x52, 0x4D, 0x39, 0x32, 0x58, 0x00, 0x00, 0x00, 0x00]);

        packet.response = response;
        return packet;
    }

    /**
     * CMD > Get Reader Information : FW Version
     */
    export function getReaderInformationFWVersion(): Packet {
        let packet = getReaderInformation(0x01);

        let response = MessageHelper.buildCommand([MessageTypes.MT_Response,
        MessageCode.MC_GET_READER_INFORMATION], [0x50, 0x52, 0x39, 0x32, 0x30, 0x30, 0x5F, 0x76, 0x31, 0x2E, 0x35, 0x2E, 0x33, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

        packet.response = response;
        return packet;
    }

    /**
     * CMD > Get Reader Information : Manufacturer
     */
    export function getReaderInformationManufacturer(): Packet {
        let packet = getReaderInformation(0x02);

        let response = MessageHelper.buildCommand([MessageTypes.MT_Response,
        MessageCode.MC_GET_READER_INFORMATION], [0x50, 0x48, 0x59, 0x43, 0x48, 0x49, 0x50, 0x53, 0x00]);

        packet.response = response;
        return packet;
    }

    /**
     * CMD > Get Reader Information : Detail
     */
    export function getReaderInformationDetail(): Packet {
        let packet = getReaderInformation(0xB0);

        return packet;
    }

    /**
     * CMD > Get Reader Information
     */
    export function getReaderInformation(arg: number): Packet {
        let packet = new Packet(MessageTypes.MT_Command,
            MessageCode.MC_GET_READER_INFORMATION, [arg]);
        return packet;
    }

    /**
     * CMD > Get Region
     */
    export function getRegion(): Packet {
        let packet = new Packet(MessageTypes.MT_Command,
            MessageCode.MC_GET_REGION);

        let response = MessageHelper.buildCommand([MessageTypes.MT_Response,
        MessageCode.MC_GET_REGION], [0x52]);

        packet.response = response;

        return packet;
    }

    /**
     * CMD > Get current RF Channel
     */
    export function getCurrentRFChannel(): Packet {
        let packet = new Packet(MessageTypes.MT_Command,
            MessageCode.MC_GET_CURRENT_RF_CHANNEL);

        let response = MessageHelper.buildCommand([MessageTypes.MT_Response,
        MessageCode.MC_GET_CURRENT_RF_CHANNEL], [0x0D, 0x00]);

        packet.response = response;

        return packet;
    }

    export function getTemperature(): Packet {
        return new Packet(MessageTypes.MT_Command,
            MessageCode.MC_GET_TEMPERATURE);
    }

}