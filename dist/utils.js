"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util;
(function (Util) {
    function toByteArray(hexString) {
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
    Util.toByteArray = toByteArray;
    function intTo2Bytes(lenght) {
        var bytes = new Array(1);
        bytes[1] = lenght & (255);
        lenght = lenght >> 8;
        bytes[0] = lenght & (255);
        return bytes;
    }
    Util.intTo2Bytes = intTo2Bytes;
    // http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt
    /* utf.js - UTF-8 <=> UTF-16 convertion
     *
     * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
     * Version: 1.0
     * LastModified: Dec 25 1999
     * This library is free.  You can redistribute it and/or modify it.
     */
    function Utf8ArrayToStr(array) {
        var out, i, len, c;
        var char2, char3;
        out = "";
        len = array.length;
        i = 0;
        while (i < len) {
            c = array[i++];
            var c4 = c >> 4;
            if (c4 === 0 || c4 === 1 || c4 === 2 || c4 === 3 || c4 === 4 || c4 === 5 || c4 === 6 || c4 === 7) {
                // 0xxxxxxx
                out += String.fromCharCode(c);
            }
            else if (c4 === 12 || c4 === 13) {
                // 110x xxxx   10xx xxxx
                char2 = array[i++];
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
            }
            if (c4 === 14) {
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
            }
        }
        return out;
    }
    Util.Utf8ArrayToStr = Utf8ArrayToStr;
    function crc16(data, offset) {
        if (offset === void 0) { offset = 0; }
        if (data == null || offset < 0 || offset > data.length - 1) {
            return 0;
        }
        var crc = 0xFFFF;
        for (var i = 0; i < data.length; ++i) {
            crc ^= data[offset + i] << 8;
            for (var j = 0; j < 8; ++j) {
                crc = (crc & 0x8000) > 0 ? (crc << 1) ^ 0x1021 : crc << 1;
            }
        }
        return crc & 0xFFFF;
    }
    Util.crc16 = crc16;
})(Util = exports.Util || (exports.Util = {}));
