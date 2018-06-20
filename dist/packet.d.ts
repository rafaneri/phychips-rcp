/// <reference types="node" />
import { MessageCode } from './message-code';
import { MessageTypes } from "./message-types";
export declare class Packet {
    messageType: MessageTypes;
    messageCode: MessageCode;
    args?: number[] | undefined;
    response?: Buffer | undefined;
    private preamble;
    private endMark;
    private bufferCommand;
    payload: number[];
    constructor(messageType: MessageTypes, messageCode: MessageCode, args?: number[] | undefined, response?: Buffer | undefined);
    command(): Buffer;
    data_str(): string;
    data_int(): number;
    isValid(): boolean;
    hasError(): boolean;
    static from(buffer: Buffer): Packet;
}
