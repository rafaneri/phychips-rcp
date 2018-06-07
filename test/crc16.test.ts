import { expect } from 'chai';
import { crc16 } from '../lib/crc16';

describe('crc16 function test', () => {
    it('should be a 0', () => {
        const result = crc16(Buffer.from([0x00]), -1, 0);
        expect(result).to.equals(0);
    });
});