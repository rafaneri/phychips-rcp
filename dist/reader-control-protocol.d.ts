import { Packet } from './packet';
export declare module ReaderControlProtocol {
    function startAutoRead2(): Packet;
    function stopAutoRead2(): Packet;
    function setPowerMode(arg: number): Packet;
    function setAntiCollisionMode(arg: number): Packet;
    /**
     * CMD > Get Anti-Collision Mode
     */
    function getAntiCollisionMode(): Packet;
    /**
     * CMD > Get Type C A/I Select Parameter
     */
    function getTypeCSelectParameter(): Packet;
    /**
     * CMD > Get Type C A/I Query Parameter
     */
    function getTypeCQueryParameter(): Packet;
    /**
     * CMD > Get Registry Item : Registry Version
     */
    function getRegistryItem(): Packet;
    /**
     * CMD > Get Reader Information : Model
     */
    function getReaderInformationModel(): Packet;
    /**
     * CMD > Get Reader Information : FW Version
     */
    function getReaderInformationFWVersion(): Packet;
    /**
     * CMD > Get Reader Information : Manufacturer
     */
    function getReaderInformationManufacturer(): Packet;
    /**
     * CMD > Get Reader Information : Detail
     */
    function getReaderInformationDetail(): Packet;
    /**
     * CMD > Get Reader Information
     */
    function getReaderInformation(arg: number): Packet;
    /**
     * CMD > Get Region
     */
    function getRegion(): Packet;
    /**
     * CMD > Get current RF Channel
     */
    function getCurrentRFChannel(): Packet;
    function getTemperature(): Packet;
}
