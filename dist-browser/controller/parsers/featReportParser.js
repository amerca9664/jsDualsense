const decoder = new TextDecoder();

const alloc_req = (id, data = [], device) => {
	let len = 0;

	const fr = device.collections[0].featureReports;

	fr.forEach(e => {
		if (e.reportId === id) {
			len = e.items[0].reportCount;
		}
	});
	const cerosArray = new Array(len - data.length).fill(0);
	const dataFilled = data.concat(cerosArray);

	const out = new Uint8Array(dataFilled);

	return out;
};

const buf2hex = (buffer, reverse = false) => {
	const convertUint = [...new Uint8Array(buffer)];

	const bufHex = convertUint.map(x => {
		const toStringHex = x.toString(16);

		const adFirstCero = toStringHex.padStart(2, '0');
		if (reverse) {
			return reverse_str(adFirstCero);
		}

		return adFirstCero;
	});

	const stringHex = bufHex.join('');

	return stringHex;
};

const reverse_str = s => s.split('').reverse().join('');

const decoderData = async (data, length, decodeAscii = true) => {
	const pcba_id = data;

	// if (
	// 	pcba_id.getUint8(1) !== base ||
	// 	pcba_id.getUint8(2) !== num ||
	// 	pcba_id.getUint8(3) !== 2
	// ) {
	// 	return;
	// }
	const bufferToDecode = pcba_id.buffer.slice(4, 4 + length);
	if (decodeAscii) {
		const decodeData = decoder.decode(bufferToDecode);
		return decodeData;
	} else {
		const decodeHexData = buf2hex(bufferToDecode);
		return decodeHexData;
		//return buf2hex(bufferToDecode)
	}
};

export { alloc_req, decoderData, reverse_str, buf2hex };
