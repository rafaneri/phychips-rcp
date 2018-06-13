import { Packet } from './../lib/packet';
import { expect } from 'chai';
import { Util } from '../lib/utils';

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

describe('from function test', () => {
    it('should be 0', () => {
        const result = Packet.from(Buffer.from([0xbb, 0x01, 0x35, 0x00, 0x01, 0x00, 0x7e, 0xcc, 0x60]));
        expect(result.args).to.deep.equals([0]);
    });
});
