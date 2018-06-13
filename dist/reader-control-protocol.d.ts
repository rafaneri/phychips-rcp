import { Packet } from './packet';
export declare module ReaderControlProtocol {
    function startAutoRead2(): Packet;
    function stopAutoRead2(): Packet;
    function setPowerMode(arg: number): Packet;
    function setAntiCollisionMode(arg: number): Packet;
    function getTemperature(): Packet;
}
