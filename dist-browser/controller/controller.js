import { HIDconnector } from '../connectHID/connect';
import {
	CONECT_PARAMS_DUALSENSE,
	CONECT_PARAMS_EDGE,
} from './constants/constConnectsParam';
import { inputParser } from './parsers/inputReportParser';
import { outParser } from './parsers/outputReportParser';
import { DSAudio } from './setterClasses/DSAudio';
import { DSLight } from './setterClasses/DSLight';
import { DSTrigger } from './setterClasses/DSTrigger';
import { DSVibration } from './setterClasses/dsVibration';

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
