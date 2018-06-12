/// <reference types="node" />
export declare module Util {
    function toByteArray(hexString: string): number[];
    function intTo2Bytes(lenght: number): number[];
    function Utf8ArrayToStr(array: Uint8Array): string;
    function crc16(data: Buffer, offset?: number): number;
}
