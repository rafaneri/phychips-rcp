import { expect } from 'chai';
import { Util } from '../lib/utils';

describe('Utf8ArrayToStr function test', () => {
    it('should be empty - test case 0', () => {
        const result = Util.Utf8ArrayToStr(Buffer.from([0x00, 0x00, 0x00]));
        expect(result).to.equals("\u0000\u0000\u0000");
    });
    it('should be empty - test case 1', () => {
        const result = Util.Utf8ArrayToStr(Buffer.from([0x00, 16]));
        expect(result).to.equals("\u0000\u0010");
    });
    it('should be empty - test case 2', () => {
        const result = Util.Utf8ArrayToStr(Buffer.from([0x00, 32]));
        expect(result).to.equals("\u0000 ");
    });
    it('should be empty - test case 3', () => {
        const result = Util.Utf8ArrayToStr(Buffer.from([0x00, 48]));
        expect(result).to.equals("\u00000");
    });
    it('should be empty - test case 4', () => {
        const result = Util.Utf8ArrayToStr(Buffer.from([0x00, 64]));
        expect(result).to.equals("\u0000@");
    });
    it('should be empty - test case 5', () => {
        const result = Util.Utf8ArrayToStr(Buffer.from([0x00, 80]));
        expect(result).to.equals("\u0000P");
    });
    it('should be empty - test case 6', () => {
        const result = Util.Utf8ArrayToStr(Buffer.from([0x00, 96]));
        expect(result).to.equals("\u0000`");
    });
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