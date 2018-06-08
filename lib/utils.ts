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

}