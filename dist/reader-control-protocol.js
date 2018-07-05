"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var packet_1 = require("./packet");
var message_types_1 = require("./message-types");
var message_code_1 = require("./message-code");
var message_helper_1 = require("./message-helper");
var ReaderControlProtocol;
(function (ReaderControlProtocol) {
    function startAutoRead2(tag, sec) {
        if (tag === void 0) { tag = 0; }
        if (sec === void 0) { sec = 0; }
        var args = [
            0x02,
            tag,
            sec,
            0x00,
            0x00 //RC(LSB) RC (16-bit): Repeat cycle (how many times reader perform inventory round).
        ];
        return new packet_1.Packet(message_types_1.MessageTypes.MT_Command, message_code_1.MessageCode.MC_START_AUTO_READ2, args);
    }
    ReaderControlProtocol.startAutoRead2 = startAutoRead2;
    function stopAutoRead2() {
        return new packet_1.Packet(message_types_1.MessageTypes.MT_Command, message_code_1.MessageCode.MC_STOP_AUTO_READ2);
    }
    ReaderControlProtocol.stopAutoRead2 = stopAutoRead2;
    function setPowerMode(arg) {
        var args = [arg];
        return new packet_1.Packet(message_types_1.MessageTypes.MT_Command, message_code_1.MessageCode.MC_SET_READER_POWER_CONTROL, args);
    }
    ReaderControlProtocol.setPowerMode = setPowerMode;
    function setAntiCollisionMode(arg) {
        var args = [arg, 0x04, 0x07, 0x02];
        return new packet_1.Packet(message_types_1.MessageTypes.MT_Command, message_code_1.MessageCode.MC_SET_ANTI_COLLISION_MODE, args);
    }
    ReaderControlProtocol.setAntiCollisionMode = setAntiCollisionMode;
    /**
     * CMD > Get Anti-Collision Mode
     */
    function getAntiCollisionMode() {
        var packet = new packet_1.Packet(message_types_1.MessageTypes.MT_Command, message_code_1.MessageCode.MC_GET_ANTI_COLLISION_MODE);
        var response = message_helper_1.MessageHelper.buildCommand([message_types_1.MessageTypes.MT_Response,
            message_code_1.MessageCode.MC_GET_ANTI_COLLISION_MODE], [0x00]);
        packet.response = response;
        return packet;
    }
    ReaderControlProtocol.getAntiCollisionMode = getAntiCollisionMode;
    /**
     * CMD > Get Type C A/I Select Parameter
     */
    function getTypeCSelectParameter() {
        var packet = new packet_1.Packet(message_types_1.MessageTypes.MT_Command, message_code_1.MessageCode.MC_GET_TYPE_SELECT_PARAMETERS);
        var response = message_helper_1.MessageHelper.buildCommand([message_types_1.MessageTypes.MT_Response,
            message_code_1.MessageCode.MC_GET_TYPE_SELECT_PARAMETERS], [0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        packet.response = response;
        return packet;
    }
    ReaderControlProtocol.getTypeCSelectParameter = getTypeCSelectParameter;
    /**
     * CMD > Get Type C A/I Query Parameter
     */
    function getTypeCQueryParameter() {
        var packet = new packet_1.Packet(message_types_1.MessageTypes.MT_Command, message_code_1.MessageCode.MC_GET_TYPE_QUERY_RELATED_PARAMETERS);
        var response = message_helper_1.MessageHelper.buildCommand([message_types_1.MessageTypes.MT_Response,
            message_code_1.MessageCode.MC_GET_TYPE_QUERY_RELATED_PARAMETERS], [0xE0, 0x20]);
        packet.response = response;
        return packet;
    }
    ReaderControlProtocol.getTypeCQueryParameter = getTypeCQueryParameter;
    /**
     * CMD > Get Registry Item : Registry Version
     */
    function getRegistryItem() {
        var packet = new packet_1.Packet(message_types_1.MessageTypes.MT_Command, message_code_1.MessageCode.MC_GET_REGISTRY_ITEM, [0x00, 0x00]);
        var response = message_helper_1.MessageHelper.buildCommand([message_types_1.MessageTypes.MT_Response,
            message_code_1.MessageCode.MC_GET_REGISTRY_ITEM], [0x00, 0x06]);
        packet.response = response;
        return packet;
    }
    ReaderControlProtocol.getRegistryItem = getRegistryItem;
    /**
     * CMD > Get Reader Information : Model
     */
    function getReaderInformationModel() {
        var packet = getReaderInformation(0x00);
        var response = message_helper_1.MessageHelper.buildCommand([message_types_1.MessageTypes.MT_Response,
            message_code_1.MessageCode.MC_GET_READER_INFORMATION], [0x50, 0x52, 0x4D, 0x39, 0x32, 0x58, 0x00, 0x00, 0x00, 0x00]);
        packet.response = response;
        return packet;
    }
    ReaderControlProtocol.getReaderInformationModel = getReaderInformationModel;
    /**
     * CMD > Get Reader Information : FW Version
     */
    function getReaderInformationFWVersion() {
        var packet = getReaderInformation(0x01);
        var response = message_helper_1.MessageHelper.buildCommand([message_types_1.MessageTypes.MT_Response,
            message_code_1.MessageCode.MC_GET_READER_INFORMATION], [0x50, 0x52, 0x39, 0x32, 0x30, 0x30, 0x5F, 0x76, 0x31, 0x2E, 0x35, 0x2E, 0x33, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        packet.response = response;
        return packet;
    }
    ReaderControlProtocol.getReaderInformationFWVersion = getReaderInformationFWVersion;
    /**
     * CMD > Get Reader Information : Manufacturer
     */
    function getReaderInformationManufacturer() {
        var packet = getReaderInformation(0x02);
        var response = message_helper_1.MessageHelper.buildCommand([message_types_1.MessageTypes.MT_Response,
            message_code_1.MessageCode.MC_GET_READER_INFORMATION], [0x50, 0x48, 0x59, 0x43, 0x48, 0x49, 0x50, 0x53, 0x00]);
        packet.response = response;
        return packet;
    }
    ReaderControlProtocol.getReaderInformationManufacturer = getReaderInformationManufacturer;
    /**
     * CMD > Get Reader Information : Detail
     */
    function getReaderInformationDetail() {
        var packet = getReaderInformation(0xB0);
        return packet;
    }
    ReaderControlProtocol.getReaderInformationDetail = getReaderInformationDetail;
    /**
     * CMD > Get Reader Information
     */
    function getReaderInformation(arg) {
        var packet = new packet_1.Packet(message_types_1.MessageTypes.MT_Command, message_code_1.MessageCode.MC_GET_READER_INFORMATION, [arg]);
        return packet;
    }
    ReaderControlProtocol.getReaderInformation = getReaderInformation;
    /**
     * CMD > Get Region
     */
    function getRegion() {
        var packet = new packet_1.Packet(message_types_1.MessageTypes.MT_Command, message_code_1.MessageCode.MC_GET_REGION);
        var response = message_helper_1.MessageHelper.buildCommand([message_types_1.MessageTypes.MT_Response,
            message_code_1.MessageCode.MC_GET_REGION], [0x52]);
        packet.response = response;
        return packet;
    }
    ReaderControlProtocol.getRegion = getRegion;
    /**
     * CMD > Get current RF Channel
     */
    function getCurrentRFChannel() {
        var packet = new packet_1.Packet(message_types_1.MessageTypes.MT_Command, message_code_1.MessageCode.MC_GET_CURRENT_RF_CHANNEL);
        var response = message_helper_1.MessageHelper.buildCommand([message_types_1.MessageTypes.MT_Response,
            message_code_1.MessageCode.MC_GET_CURRENT_RF_CHANNEL], [0x0D, 0x00]);
        packet.response = response;
        return packet;
    }
    ReaderControlProtocol.getCurrentRFChannel = getCurrentRFChannel;
    function getTemperature() {
        return new packet_1.Packet(message_types_1.MessageTypes.MT_Command, message_code_1.MessageCode.MC_GET_TEMPERATURE);
    }
    ReaderControlProtocol.getTemperature = getTemperature;
})(ReaderControlProtocol = exports.ReaderControlProtocol || (exports.ReaderControlProtocol = {}));
