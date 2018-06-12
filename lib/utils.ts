export module Util {

    export function toByteArray(hexString: string): number[] {
        var result = [];

        while (hexString.length % 2 != 0) {
            hexString = '0' + hexString;
        }

        while (hexString.length >= 2) {
            result.push(parseInt(hexString.substring(0, 2), 16));
            hexString = hexString.substring(2, hexString.length);
        }
        return result;
    }

    export function intTo2Bytes(lenght: number): number[] {
        let bytes = new Array(1);

        bytes[1] = lenght & (255);
        lenght = lenght >> 8
        bytes[0] = lenght & (255);

        return bytes;
    }

    // http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt

    /* utf.js - UTF-8 <=> UTF-16 convertion
     *
     * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
     * Version: 1.0
     * LastModified: Dec 25 1999
     * This library is free.  You can redistribute it and/or modify it.
     */
    export function Utf8ArrayToStr(array: Uint8Array): string {
        var out, i, len, c;
        var char2, char3;

        out = "";
        len = array.length;
        i = 0;
        while (i < len) {
            c = array[i++];
            switch (c >> 4) {
                case 0: 
                case 1: 
                case 2: 
                case 3: case 4: case 5: case 6: case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12: case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = array[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }

        return out;
    }

    export function crc16(data: Buffer, offset: number = 0): number {
        if (data == null || offset < 0 || offset > data.length - 1) {
            return 0;
        }
    
        let crc = 0xFFFF;
        for (let i = 0; i < data.length; ++i) {
            crc ^= data[offset + i] << 8;
            for (let j = 0; j < 8; ++j) {
                crc = (crc & 0x8000) > 0 ? (crc << 1) ^ 0x1021 : crc << 1;
            }
        }
        return crc & 0xFFFF;
    }

}