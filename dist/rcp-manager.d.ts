/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class RcpManager extends EventEmitter {
    private preamble;
    private endMark;
    private byteRxPkt;
    private rcpReceivedPacket;
    private rcpReceivedPacketCrcError;
    private static instance;
    private constructor();
    static getInstance(): RcpManager;
    dataReceived(data: Buffer): void;
    private parseRxData;
}
