/// <reference types="node" />
export declare module RCP {
    function startAutoRead2(): Buffer;
    function stopAutoRead2(): Buffer;
    function setPowerMode(arg: number): Buffer;
    function getTemperature(): Buffer;
}
