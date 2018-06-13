/// <reference types="node" />
export declare module MessageHelper {
    function buildCommand(header: number[], args?: number[]): Buffer;
    function unwrapperResponse(response: Buffer): Buffer;
    function unwrapperNotification(notification: Buffer): Buffer;
    function getStringData(args: Buffer): string;
}
