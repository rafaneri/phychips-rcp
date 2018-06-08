import { expect } from 'chai';
import { Util } from '../lib/utils';

describe('Utf8ArrayToStr function test', () => {
    it('should be empty - test case 7', () => {
        const result = Util.Utf8ArrayToStr(Buffer.from([0x00, 112]));
        expect(result).to.equals("\u0000p");
    });
    it('should be empty - test case 13', () => {
        const result = Util.Utf8ArrayToStr(Buffer.from([102, 208]));
        expect(result).to.equals("fЀ");
    });
    it('should be empty - test case 14', () => {
        const result = Util.Utf8ArrayToStr(Buffer.from([224]));
        expect(result).to.equals("\u0000");
    });
});