/// <reference types="node" />
export declare module MessageHelper {
    function buildCommand(header: number[], args?: number[]): Buffer;
    function unwrapperResponse(response: Buffer): any;
    function unwrapperNotification(notification: Buffer): any;
}
