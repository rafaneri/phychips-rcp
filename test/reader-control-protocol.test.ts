import { Packet } from './../lib/packet';
import { expect } from 'chai';
import { ReaderControlProtocol } from '../lib';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('startAutoRead2 function test', () => {
    it('should be a Packet', () => {
        const result = ReaderControlProtocol.startAutoRead2();
        expect(result).to.be.instanceof(Packet);
    });
    it('should return BB0036000502000000007E220D', () => {
        const result = ReaderControlProtocol.startAutoRead2();
        expect(result.command()).to.deep.equal(Buffer.from([0xBB, 0x00, 0x36, 0x00, 0x05, 0x02, 0x00, 0x00, 0x00, 0x00, 0x7E, 0x22, 0x0D]));
    });
});

describe('stopAutoRead2 function test', () => {
    it('should be a Packet', () => {
        const result = ReaderControlProtocol.stopAutoRead2();
        expect(result).to.be.instanceof(Packet);
    });
    it('should return BB003700007EF391', () => {
        const result = ReaderControlProtocol.stopAutoRead2();
        expect(result.command()).to.deep.equal(Buffer.from([0xBB, 0x00, 0x37, 0x00, 0x00, 0x7E, 0xF3, 0x91]));
    });
});

describe('setPowerMode function test', () => {
    it('should be a Packet', () => {
        const result = ReaderControlProtocol.setPowerMode(0x00);
        expect(result).to.be.instanceof(Packet);
    });
    it('should return BB00010001007E0C28', () => {
        const result = ReaderControlProtocol.setPowerMode(0x00);
        expect(result.command()).to.deep.equal(Buffer.from([0xBB, 0x00, 0x01, 0x00, 0x01, 0x00, 0x7E, 0x0C, 0x28]));
    });
    it('should return BB00010001017E3F19', () => {
        const result = ReaderControlProtocol.setPowerMode(0x01);
        expect(result.command()).to.deep.equal(Buffer.from([0xBB, 0x00, 0x01, 0x00, 0x01, 0x01, 0x7E, 0x3F, 0x19]));
    });
});

describe('setAntiCollisionMode function test', () => {
    it('should be a Packet', () => {
        const result = ReaderControlProtocol.setAntiCollisionMode(0x01);
        expect(result).to.be.instanceof(Packet);
    });
    it('should return BB00010001007E0C28', () => {
        const result = ReaderControlProtocol.setAntiCollisionMode(0x01);
        expect(result.command()).to.deep.equal(Buffer.from([0xBB, 0x00, 0x35, 0x00, 0x04, 0x01, 0x04, 0x07, 0x02, 0x7E, 0x0C, 0xBA]));
    });
});

describe('getTemperature function test', () => {
    it('should be a Packet', () => {
        const result = ReaderControlProtocol.getTemperature();
        expect(result).to.be.instanceof(Packet);
    });
});
