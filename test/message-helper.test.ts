import { expect } from 'chai';
import { MessageHelper } from '../lib/message-helper';
import { Util } from '../lib/utils';
import { MessageTypes } from '../lib/message-types';
import { MessageCode } from '../lib/message-code';

describe('buildCommand function test', () => {
    it('should be a Buffer', () => {
        let args = [
            0x02, //Reserve: type B tag (0x01), type C Tag (0x02)
            0x00, //MTNU: maximum number of tag to read
            0x00, //MTIME: maximum elapsed time to tagging (sec)
            0x00, //RC(MSB)
            0x00 //RC(LSB) RC (16-bit): Repeat cycle (how many times reader perform inventory round).
        ];
        const result = MessageHelper.buildCommand([MessageTypes.MT_Command,
        MessageCode.MC_START_AUTO_READ2], args);
        expect(result).to.be.instanceof(Buffer);
    });
    it('should return BB0036000502000000007E220D', () => {
        let args = [
            0x02, //Reserve: type B tag (0x01), type C Tag (0x02)
            0x00, //MTNU: maximum number of tag to read
            0x00, //MTIME: maximum elapsed time to tagging (sec)
            0x00, //RC(MSB)
            0x00 //RC(LSB) RC (16-bit): Repeat cycle (how many times reader perform inventory round).
        ];
        const result = MessageHelper.buildCommand([MessageTypes.MT_Command,
        MessageCode.MC_START_AUTO_READ2], args);
        expect(result).to.deep.equal(Buffer.from([0xBB, 0x00, 0x36, 0x00, 0x05, 0x02, 0x00, 0x00, 0x00, 0x00, 0x7E, 0x22, 0x0D]));
    });
    it('should return BB003700007EF391', () => {
        const result = MessageHelper.buildCommand([MessageTypes.MT_Command,
            MessageCode.MC_STOP_AUTO_READ2]);
        expect(result).to.deep.equal(Buffer.from([0xBB, 0x00, 0x37, 0x00, 0x00, 0x7E, 0xF3, 0x91]));
    });
});

describe('unwrapperResponse function test', () => {
    it('should be Empty', () => {
        const result = MessageHelper.unwrapperResponse(Buffer.from([0xBB, 0x02, 0x7E]));
        expect(result).to.length(0);
    });
    it('should be PRM92X', () => {
        const result = MessageHelper.unwrapperResponse(Buffer.from([0xBB, 0x01, 0x03, 0x00, 0x0A, 0x50, 0x52, 0x4D, 0x39, 0x32, 0x58, 0x00, 0x00, 0x00, 0x00, 0x7E, 0x9C, 0xEE]));
        expect(MessageHelper.getStringData(result)).to.equals("PRM92X");
    });
    it('should be PR9200_v1.5.3', () => {
        const result = MessageHelper.unwrapperResponse(Buffer.from([0xBB, 0x01, 0x03, 0x00, 0x1E, 0x50, 0x52, 0x39, 0x32, 0x30, 0x30, 0x5F, 0x76, 0x31, 0x2E, 0x35, 0x2E, 0x33, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7E, 0xCC, 0x7A]));
        expect(MessageHelper.getStringData(result)).to.equals("PR9200_v1.5.3");
    });
});

describe('unwrapperNotification function test', () => {
    it('should be Empty', () => {
        const result = MessageHelper.unwrapperNotification(Buffer.from([0xBB, 0x00, 0x7E]));
        expect(result).to.length(0);
    });
    it('should be 0x1F', () => {
        const result = MessageHelper.unwrapperNotification(Buffer.from([0xBB, 0x02, 0x2A, 0x00, 0x01, 0x1F, 0x7E, 0x70, 0xE6]));
        expect(MessageHelper.getStringData(result)).to.equals("\u001f");
    });
});