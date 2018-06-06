export function crc16(data: Buffer, offset: number = 0, length: number = 0): number {
    if (length == 0) {
        length = data.length;
    }
    if (data == null || offset < 0 || offset > data.length - 1 || offset + length > data.length) {
        return 0;
    }

    let crc = 0xFFFF;
    for (let i = 0; i < length; ++i) {
        crc ^= data[offset + i] << 8;
        for (let j = 0; j < 8; ++j) {
            crc = (crc & 0x8000) > 0 ? (crc << 1) ^ 0x1021 : crc << 1;
        }
    }
    return crc & 0xFFFF;
}