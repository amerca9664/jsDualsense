import { HIDconnector } from '../connectHID/connect';
import {
	CONECT_PARAMS_DUALSENSE,
	CONECT_PARAMS_EDGE,
} from './constants/constConnectsParam';
import { INFO_TO_GET } from './constants/constFeatureReport';
import { ErrorString } from './constants/errorMagicStrings';
import {
	alloc_req,
	decoderData,
	reverse_str,
} from './parsers/featReportParser';
import { inputParser } from './parsers/inputReportParser';
import { outParser } from './parsers/outputReportParser';
import { softwareInfoDecoder } from './parsers/softwareInfoDecoder';
import { DSAudio } from './setterClasses/DSAudio';
import { DSLight } from './setterClasses/DSLight';
import { DSTrigger } from './setterClasses/DSTrigger';
import { DSVibration } from './setterClasses/DSVibration';
import { validateOutput } from './setterClasses/utils';

const conexion = new HIDconnector();

class jsDualsense {
	constructor() {
		// 	Initializes the DualSense interface. Sets up connection parameters, output report buffer, device modules (light, audio, triggers, vibration), and a promise-based send queue to serialize output.
		this.CONECT_PARAMS = [CONECT_PARAMS_DUALSENSE, CONECT_PARAMS_EDGE];
		this.setLight = new DSLight(() => this.sendData());
		this.setAudio = new DSAudio(() => this.sendData());
		this.setTriggerL = new DSTrigger(() => this.sendData());
		this.setTriggerR = new DSTrigger(() => this.sendData());
		this.setVibrationL = new DSVibration(() => this.sendData());
		this.setVibrationR = new DSVibration(() => this.sendData());
		this.dataDecoded = undefined;
		this.output_report_length = 47;
		this.outReport = new Array(this.output_report_length).fill(0);

		this._sendQueue = Promise.resolve(); // ⏳ Mutex/Lock, starts queue
	}

	async start() {
		// 	Initiates connection to the DualSense device using predefined vendor/product filters.
		await conexion.connect(this.CONECT_PARAMS);
	}

	async readData() {
		// Reads raw input data from the device and decodes it using inputParser. Returns the parsed result.
		const data = await conexion.read();
		this.dataDecoded = inputParser(data);

		return this.dataDecoded;
	}

	async _enqueueSend() {
		// Mutex/Lock, Internal method that manages a promise-based queue to serialize calls to sendData. Ensures only one output report is sent at a time.
		let resolveNext;
		const next = new Promise(resolve => {
			resolveNext = resolve;
		});

		const previous = this._sendQueue;
		this._sendQueue = next;

		await previous;
		return resolveNext;
	}

	async sendData() {
		//	Prepares and sends the current output report to the device. Uses outParser to populate the report, wraps the transmission in a queue to prevent race conditions, and handles errors gracefully.
		const release = await this._enqueueSend(); // Mutex/Lock, save release to use later

		outParser.call(this);

		const dataView = new Uint8Array(this.outReport);
		try {
			await conexion.send(0x02, dataView);
		} catch (error) {
			console.error(error);
		} finally {
			release(); // 🔓 Mutex/Lock, release next in queue
		}
	}

	async sendFeatReport(reportId, sendArray) {
		if (typeof reportId !== 'number') {
			throw TypeError(ErrorString.ERROR_TYPE_NUMBER);
		}

		if (!ArrayBuffer.isView(sendArray)) {
			throw new TypeError(ErrorString.ERROR_TYPE_BUFFER);
		}

		const release = await this._enqueueSend();

		try {
			await conexion.sendFeature(reportId, sendArray);
		} catch (error) {
			console.error(error);
		} finally {
			release(); // 🔓 Mutex/Lock, release next in queue
		}
	}

	async readFeatReport(reportId) {
		if (typeof reportId !== 'number') {
			throw TypeError(ErrorString.ERROR_TYPE_NUMBER);
		}

		const readData = await conexion.receiveFeature(reportId);

		return readData;
	}

	async getInfo(typeInfo) {
		validateOutput(typeInfo, INFO_TO_GET);
		// if (
		// 	typeof base !== 'number' ||
		// 	typeof num !== 'number' ||
		// 	typeof length !== 'number'
		// ) {
		// 	throw TypeError(ErrorString.ERROR_TYPE_NUMBER);
		// }

		// if (typeof decodeAscii !== 'boolean') {
		// 	throw TypeError(ErrorString.ERROR_TYPE_BOOLEAN);
		// }

		const sendArray = await alloc_req(
			128,
			[typeInfo[0], typeInfo[1]],
			conexion.device,
		);
		await this.sendFeatReport(128, sendArray);

		const receiveData = await this.readFeatReport(129);

		const dataDecode = await decoderData(receiveData, typeInfo[2], typeInfo[3]);

		if (typeInfo[4]) {
			const reversedataDecode = reverse_str(dataDecode);

			return reversedataDecode;
		}

		return dataDecode;
	}

	async getSoftwareInfo() {
		const receiveData = await this.readFeatReport(0x20);
		const dataParser = softwareInfoDecoder(receiveData);

		return dataParser;
	}

	async finish() {
		// Gracefully shuts down the device by resetting light, vibration, and trigger effects to neutral values. Then closes the HID connection.
		if (conexion.device !== null) {
			await this.setLight.setColorI([0, 0, 0]);
			await this.setVibrationL.setVibration(0);
			await this.setVibrationR.setVibration(0);
			await this.setTriggerL.setEffect({
				Mode: 0,
				Force: Array(7).fill(0),
			});

			await this.setTriggerR.setEffect({
				Mode: 0,
				Force: Array(7).fill(0),
			});
		}
		await conexion.closeDev();
	}
}

export { jsDualsense };
