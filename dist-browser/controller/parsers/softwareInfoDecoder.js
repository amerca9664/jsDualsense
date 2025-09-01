import { buf2hex, reverse_str } from './featReportParser';

const decoder = new TextDecoder();

function sliceHexInfo(data, start, end, reverseBit = false) {
	const sliceData = data.buffer.slice(start, end);
	const formatData = buf2hex(sliceData, reverseBit);

	return reverse_str(formatData);
}

const convertStringHexToInt = number => parseInt(number, 16).toString();

export const softwareInfoDecoder = softInfo => {
	const sliceInfoBDate = softInfo.buffer.slice(1, 20);
	const softInfoBDate = decoder.decode(sliceInfoBDate);
	const fwBuildDate = softInfoBDate.slice(0, 11);
	const fwBuildHour = softInfoBDate.slice(11, 20);
	const fw_build_date = `${fwBuildDate} ${fwBuildHour}`;

	const fwTypeformat = sliceHexInfo(softInfo, 20, 22, true);
	const fw_type = `0x${fwTypeformat}`;

	const swTypeformat = sliceHexInfo(softInfo, 22, 24, true);
	const sw_type = `0x${swTypeformat}`;

	const hWInformat = sliceHexInfo(softInfo, 24, 28, true);
	const hw_info = `0x${hWInformat}`;

	const mainFwVerInformat = sliceHexInfo(softInfo, 28, 32, true);

	const mayorMainFwVerSlice = mainFwVerInformat.slice(0, 2);
	const mayorMainFwVer = convertStringHexToInt(mayorMainFwVerSlice);
	const featMainFwVerSlice = mainFwVerInformat.slice(2, 4);
	const featMainFwVer = convertStringHexToInt(featMainFwVerSlice);
	const minorMainFwVerSlice = mainFwVerInformat.slice(4, 8);
	const minorMainFwVer = convertStringHexToInt(minorMainFwVerSlice);
	const main_fw_version = `${mayorMainFwVer}.${featMainFwVer}.${minorMainFwVer}`;

	const deviceInfoSlice = sliceHexInfo(softInfo, 32, 44, true);
	const device_info = `0x${deviceInfoSlice}`;

	const updVersionSlice = sliceHexInfo(softInfo, 44, 46, true);
	const mayorUpdVersionSlice = updVersionSlice.slice(0, 2);
	const minorUpdVersionSlice = updVersionSlice.slice(2, 4);
	const update_version = `${mayorUpdVersionSlice}.${minorUpdVersionSlice}`;

	const slbFwversionSlice = sliceHexInfo(softInfo, 48, 52, true);
	const mayorSlbFwversionSlice = convertStringHexToInt(
		slbFwversionSlice.slice(0, 2),
	);
	const featSlbFwversionSlice = convertStringHexToInt(
		slbFwversionSlice.slice(2, 4),
	);
	const minorSlbFwversionSlice = convertStringHexToInt(
		slbFwversionSlice.slice(6, 8),
	);
	const sbl_fw_version = `${mayorSlbFwversionSlice}.${featSlbFwversionSlice}.${minorSlbFwversionSlice}`;

	const softwareInfo = {
		fw_build_date,
		fw_type,
		sw_type,
		hw_info,
		device_info,
		update_version,
		sbl_fw_version,
		main_fw_version,
	};

	return softwareInfo;
};
