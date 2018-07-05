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
    it('should return BB0036000502000A00007E4AA6', () => {
        const result = ReaderControlProtocol.startAutoRead2(0, 10);
        expect(result.command()).to.deep.equal(Buffer.from([0xBB, 0x00, 0x36, 0x00, 0x05, 0x02, 0x00, 0x0A, 0x00, 0x00, 0x7E, 0x4A, 0xA6]));
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

describe('getAntiCollisionMode function test', () => {
    it('should be a Packet', () => {
        const result = ReaderControlProtocol.getAntiCollisionMode();
        expect(result).to.be.instanceof(Packet);
    });
    it('should return BB01340001007E6631', () => {
        const result = ReaderControlProtocol.getAntiCollisionMode();
        expect(result.response).to.deep.equal(Buffer.from([0xBB, 0x01, 0x34, 0x00, 0x01, 0x00, 0x7E, 0x66, 0x31]));
    });
});

describe('getTypeCSelectParameter function test', () => {
    it('should be a Packet', () => {
        const result = ReaderControlProtocol.getTypeCSelectParameter();
        expect(result).to.be.instanceof(Packet);
    });
    it('should return BB010B0007010000000000007E34D9', () => {
        const result = ReaderControlProtocol.getTypeCSelectParameter();
        expect(result.response).to.deep.equal(Buffer.from([0xBB, 0x01, 0x0B, 0x00, 0x07, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7E, 0x34, 0xD9]));
    });
});

describe('getTypeCQueryParameter function test', () => {
    it('should be a Packet', () => {
        const result = ReaderControlProtocol.getTypeCQueryParameter();
        expect(result).to.be.instanceof(Packet);
    });
    it('should return BB010D0002E0207ED30A', () => {
        const result = ReaderControlProtocol.getTypeCQueryParameter();
        expect(result.response).to.deep.equal(Buffer.from([0xBB, 0x01, 0x0D, 0x00, 0x02, 0xE0, 0x20, 0x7E, 0xD3, 0x0A]));
    });
});

describe('getRegistryItem function test', () => {
    it('should be a Packet', () => {
        const result = ReaderControlProtocol.getRegistryItem();
        expect(result).to.be.instanceof(Packet);
    });
    it('should return BB01D4000200067E332D', () => {
        const result = ReaderControlProtocol.getRegistryItem();
        expect(result.response).to.deep.equal(Buffer.from([0xBB, 0x01, 0xD4, 0x00, 0x02, 0x00, 0x06, 0x7E, 0x33, 0x2D]));
    });
});

describe('getReaderInformationModel function test', () => {
    it('should be a Packet', () => {
        const result = ReaderControlProtocol.getReaderInformationModel();
        expect(result).to.be.instanceof(Packet);
    });
    it('should return BB0103000A50524D393258000000007E9CEE', () => {
        const result = ReaderControlProtocol.getReaderInformationModel();
        expect(result.response).to.deep.equal(Buffer.from([0xBB, 0x01, 0x03, 0x00, 0x0A, 0x50, 0x52, 0x4D, 0x39, 0x32, 0x58, 0x00, 0x00, 0x00, 0x00, 0x7E, 0x9C, 0xEE]));
    });
});

describe('getReaderInformationFWVersion function test', () => {
    it('should be a Packet', () => {
        const result = ReaderControlProtocol.getReaderInformationFWVersion();
        expect(result).to.be.instanceof(Packet);
    });
    it('should return BB0103001E5052393230305F76312E352E3300000000000000000000000000000000007ECC7A', () => {
        const result = ReaderControlProtocol.getReaderInformationFWVersion();
        expect(result.response).to.deep.equal(Buffer.from([0xBB, 0x01, 0x03, 0x00, 0x1E, 0x50, 0x52, 0x39, 0x32, 0x30, 0x30, 0x5F, 0x76, 0x31, 0x2E, 0x35, 0x2E, 0x33, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7E, 0xCC, 0x7A]));
    });
});

describe('getReaderInformationManufacturer function test', () => {
    it('should be a Packet', () => {
        const result = ReaderControlProtocol.getReaderInformationManufacturer();
        expect(result).to.be.instanceof(Packet);
    });
    it('should return BB010300095048594348495053007E537A', () => {
        const result = ReaderControlProtocol.getReaderInformationManufacturer();
        expect(result.response).to.deep.equal(Buffer.from([0xBB, 0x01, 0x03, 0x00, 0x09, 0x50, 0x48, 0x59, 0x43, 0x48, 0x49, 0x50, 0x53, 0x00, 0x7E, 0x53, 0x7A]));
    });
});

describe('getReaderInformationDetail function test', () => {
    it('should be a Packet', () => {
        const result = ReaderControlProtocol.getReaderInformationDetail();
        expect(result).to.be.instanceof(Packet);
    });
    it('should return BB00030001B07E56A6', () => {
        const result = ReaderControlProtocol.getReaderInformationDetail();
        expect(result.command()).to.deep.equal(Buffer.from([0xBB, 0x00, 0x03, 0x00, 0x01, 0xB0, 0x7E, 0x56, 0xA6]));
    });
});

describe('getRegion function test', () => {
    it('should be a Packet', () => {
        const result = ReaderControlProtocol.getRegion();
        expect(result).to.be.instanceof(Packet);
    });
    it('should return BB01060001527E4681', () => {
        const result = ReaderControlProtocol.getRegion();
        expect(result.response).to.deep.equal(Buffer.from([0xBB, 0x01, 0x06, 0x00, 0x01, 0x52, 0x7E, 0x46, 0x81]));
    });
});

describe('getCurrentRFChannel function test', () => {
    it('should be a Packet', () => {
        const result = ReaderControlProtocol.getCurrentRFChannel();
        expect(result).to.be.instanceof(Packet);
    });
    it('should return BB011100020D007E26EB', () => {
        const result = ReaderControlProtocol.getCurrentRFChannel();
        expect(result.response).to.deep.equal(Buffer.from([0xBB, 0x01, 0x11, 0x00, 0x02, 0x0D, 0x00, 0x7E, 0x26, 0xEB]));
    });
});

describe('getTemperature function test', () => {
    it('should be a Packet', () => {
        const result = ReaderControlProtocol.getTemperature();
        expect(result).to.be.instanceof(Packet);
    });
});
