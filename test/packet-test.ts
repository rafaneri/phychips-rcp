import { Packet } from './../lib/packet';
import { expect } from 'chai';
import { Util } from '../lib/utils';
import { MessageTypes } from '../lib/message-types';
import { MessageCode } from '../lib/message-code';

describe('data_str function test', () => {
    it('should be Empty', () => {
        const result = Packet.from(Buffer.from([0xBB, 0x02, 0x7E]));
        expect(result.data_str()).to.length(0);
    });
    it('should be PRM92X', () => {
        const result = Packet.from(Buffer.from([0xBB, 0x01, 0x03, 0x00, 0x0A, 0x50, 0x52, 0x4D, 0x39, 0x32, 0x58, 0x00, 0x00, 0x00, 0x00, 0x7E, 0x9C, 0xEE]));
        expect(result.data_str()).to.equals("PRM92X");
    });
    it('should be PR9200_v1.5.3', () => {
        const result = Packet.from(Buffer.from([0xBB, 0x01, 0x03, 0x00, 0x1E, 0x50, 0x52, 0x39, 0x32, 0x30, 0x30, 0x5F, 0x76, 0x31, 0x2E, 0x35, 0x2E, 0x33, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7E, 0xCC, 0x7A]));
        expect(result.data_str()).to.equals("PR9200_v1.5.3");
    });
});

describe('data_int function test', () => {
    it('should be Empty', () => {
        const result = Packet.from(Buffer.from([0xBB, 0x02, 0x7E]));
        expect(result.data_int()).to.equals(0);
    });
    it('should be 31', () => {
        const result = Packet.from(Buffer.from([0xBB, 0x02, 0x38, 0x00, 0x01, 0x1F, 0x7E, 0x30, 0xB7]));
        expect(result.data_int()).to.equals(31);
    });
});

describe('getEpc function test', () => {
    it('should be e2000016601601551580753d', () => {
        const result = Packet.from(Buffer.from([0xbb, 0x02, 0x22, 0x00, 0x0e, 0x30, 0x00, 0xe2, 0x00, 0x00, 0x16, 0x60, 0x16, 0x01, 0x55, 0x15, 0x80, 0x75, 0x3d, 0x7e, 0x5c, 0x46]));
        expect(result.getEpc()).to.deep.equals(Buffer.from([0xe2, 0x00, 0x00, 0x16, 0x60, 0x16, 0x01, 0x55, 0x15, 0x80, 0x75, 0x3d]));
    });
    it('should be Empty', () => {
        const result = Packet.from(Buffer.from([]));
        expect(result.getEpc()).to.deep.equals(Buffer.from([]));
    });
});

describe('from function test', () => {
    it('should be 0', () => {
        const result = Packet.from(Buffer.from([0xbb, 0x01, 0x35, 0x00, 0x01, 0x00, 0x7e, 0xcc, 0x60]));
        expect(result.args).to.deep.equals([0]);
    });
});

describe('command function test', () => {
    let args = [
        0x02, //Reserve: type B tag (0x01), type C Tag (0x02)
        0x00, //MTNU: maximum number of tag to read
        0x00, //MTIME: maximum elapsed time to tagging (sec)
        0x00, //RC(MSB)
        0x00 //RC(LSB) RC (16-bit): Repeat cycle (how many times reader perform inventory round).
    ];
    it('should be BB0036000502000000007E220D', () => {
        const result = new Packet(MessageTypes.MT_Command,
            MessageCode.MC_START_AUTO_READ2, args);
        result.command();
        expect(result.command()).to.deep.equal(Buffer.from([0xBB, 0x00, 0x36, 0x00, 0x05, 0x02, 0x00, 0x00, 0x00, 0x00, 0x7E, 0x22, 0x0D]));
    });
});

describe('isValid function test', () => {
    it('should be true', () => {
        const result = Packet.from(Buffer.from([0xbb, 0x01, 0xff, 0x00, 0x01, 0x0b, 0x7e, 0x65, 0x8c])).isValid();
        expect(result).to.equals(true);
    });
    it('should be false', () => {
        const result = Packet.from(Buffer.from([0xbb, 0x01, 0x35, 0x00, 0x01, 0x00, 0x7e, 0xcc, 0x60, 0xbb])).isValid();
        expect(result).to.equals(false);
    });
    it('should be false', () => {
        const result = Packet.from(Buffer.from([0xbb, 0x01, 0x35, 0x01, 0x35, 0x35])).isValid();
        expect(result).to.equals(false);
    });
});

describe('hasError function test', () => {
    it('should be true', () => {
        const result = Packet.from(Buffer.from([0xBB, 0x01, 0xFF, 0x00, 0x01, 0x0B, 0x7E, 0x65, 0x8C])).hasError();
        expect(result).to.equals(true);
    });
    it('should be false', () => {
        const result = Packet.from(Buffer.from([0xbb, 0x01, 0x35, 0x00, 0x01, 0x00, 0x7e, 0xcc, 0x60])).hasError();
        expect(result).to.equals(false);
    });
    it('should be false', () => {
        const result = Packet.from(Buffer.from([0xbb, 0x01, 0x35, 0x01, 0x35, 0x35])).hasError();
        expect(result).to.equals(false);
    });
});
