const LedOptions = Object.freeze({
	Off: 0x0,
	PlayerLedBrightness: 0x1,
	UninterrumpableLed: 0x2,
	Both: 0x01 | 0x02, // 0x03
});

const PulseOptions = Object.freeze({
	Off: 0x0,
	FadeBlue: 0x1,
	FadeOut: 0x2,
});

const Brightness = Object.freeze({
	High: 0x0,
	Medium: 0x1,
	Low: 0x2,
});

const PlayerID = Object.freeze({
	PLAYER_1: 4,
	PLAYER_2: 10,
	PLAYER_3: 21,
	PLAYER_4: 27,
	ALL: 31,
});

const TriggerModes = Object.freeze({
	Off: 0x0, // no resistance
	Rigid: 0x1, // continuous resistance
	Pulse: 0x2, // section resistance
	Rigid_A: 0x1 | 0x20, // 0x21
	Rigid_B: 0x1 | 0x04, // 0x05
	Rigid_AB: 0x1 | 0x20 | 0x04, // 0x25
	Pulse_A: 0x2 | 0x20, // 0x22
	Pulse_B: 0x2 | 0x04, // 0x06
	Pulse_AB: 0x2 | 0x20 | 0x04, // 0x26
	Calibration: 0xfc,
});

const TrigerEffects = Object.freeze({
	Off: {
		Mode: TriggerModes.Off,
		Force: Array(7).fill(0),
	},
	Vibration: {
		Mode: TriggerModes.Pulse_AB,
		Force: [255, 3, 255, 255, 255, 63, 15],
	},
	Weapon: {
		Mode: TriggerModes.Rigid_AB,
		Force: [36, 0, 7, 0, 0, 0, 0],
	},
	Rigid: {
		Mode: TriggerModes.Rigid,
		Force: [0, 255, 0, 0, 0, 0, 0],
	},
});

const AudioSpkSelect = Object.freeze({
	Speaker: 0x30,
	EarSpeaker: 0x10,
});

const MicSelect = Object.freeze({
	Internal: 0xd,
	External: 0xe,
});

const ErrorString = {
	ERROR_DUPLICATED: 'Device already open',
	ERROR_OPEN: 'Device open failed',
	ERROR_NOT_OPEN: 'Device not connected',
	ERROR_TIMEOUT: 'Error reading data, connection timeout',
	ERROR_SEND: 'Error sending data',
	ERROR_CLOSE: 'Device already close',
};

const WarningString = {
	WARN_ALLOW: 'Device not authorized',
	WARN_USB: 'USB disconnected',
};

class ConnectionError extends Error {
	constructor(message) {
		super(message);
		this.name = 'ConnectionError';
	}
}
class ConnectionOpen extends Error {
	constructor(message) {
		super(message);
		this.name = 'ConnectionOpen';
	}
}

class ConnectionNotOpen extends Error {
	constructor(message) {
		super(message);
		this.name = 'ConnectionNotOpen';
	}
}

class ConnectionTimeOut extends Error {
	constructor(message) {
		super(message);
		this.name = 'ConnectionTimeOut';
	}
}

class ConnectionNotSend extends Error {
	constructor(message) {
		super(message);
		this.name = 'ConnectionNotSend';
	}
}

class ConnectionClose extends Error {
	constructor(message) {
		super(message);
		this.name = 'ConnectionClose';
	}
}

class HIDconnector {
	constructor() {
		this.device = null;
	}

	_initEventDisconnect() {
		//Registers a listener for the disconnect event from the HID API. If the connected device is disconnected, it attempts to close the connection and logs a warning.

		navigator.hid.addEventListener('disconnect', async event => {
			if (event.device === this.device) {
				if (this.device?.opened) {
					await this.closeDev();
				}

				console.warn(WarningString.WARN_USB);
			}
		});
	}

	async connect(CONECT_PARAMS) {
		//Prompts the user to select a HID device matching the provided filters. If a device is selected, it opens the connection and sets up the disconnect listener. Throws custom errors if the connection fails.
		const deviceIn = await navigator.hid.requestDevice({
			filters: CONECT_PARAMS,
		});

		if (deviceIn.length === 0) {
			console.warn(WarningString.WARN_ALLOW);
			return false;
		}
		this.device = deviceIn[0];
		try {
			await this.device.open();
			this._initEventDisconnect();
			return true;
		} catch (error) {
			if (error.name === 'InvalidStateError') {
				throw new ConnectionError(ErrorString.ERROR_DUPLICATED);
			} else {
				throw new ConnectionOpen(ErrorString.ERROR_OPEN);
			}
		}
	}

	async read() {
		//Waits for an inputreport event from the device. Resolves with the received data or rejects with a timeout error if no report is received within 1000ms.

		if (!this.device) {
			throw new ConnectionNotOpen(ErrorString.ERROR_NOT_OPEN);
		}

		const timeout = 1000;

		return new Promise((resolve, reject) => {
			const handler = event => {
				const { data } = event;
				clearTimeout(timer); // Cancel timeout
				this.device?.removeEventListener('inputreport', handler); // Prevent multiple calls
				resolve(data);
			};

			this.device?.addEventListener('inputreport', handler);

			const timer = setTimeout(() => {
				this.device?.removeEventListener('inputreport', handler);
				reject(new ConnectionTimeOut(ErrorString.ERROR_TIMEOUT));
			}, timeout);
		});
	}

	async send(reportId, data) {
		//Sends a report to the connected device using the specified reportId and data. Throws a custom error if the transmission fails.

		if (!this.device) {
			throw new ConnectionNotOpen(ErrorString.ERROR_NOT_OPEN);
		}

		try {
			await this.device.sendReport(reportId, data);
		} catch {
			throw new ConnectionNotSend(ErrorString.ERROR_SEND);
		}
	}

	async closeDev() {
		//Closes the connection to the HID device and resets the device property to null. Throws a custom error if closing fails.

		try {
			await this.device.close();
			this.device = null;
		} catch {
			throw new ConnectionClose(ErrorString.ERROR_CLOSE);
		}
	}
}

const CONECT_PARAMS_DUALSENSE = {
	vendorId: 0x054c,
	productId: 0x0ce6,
};
const CONECT_PARAMS_EDGE = {
	vendorId: 0x054c,
	productId: 0x0df2,
};

const BATTERY_STATE = {
	0: 'DISCHARGING',
	1: 'CHARGING',
	2: 'FULL',
	11: 'NOT_CHARGING',
	15: 'ERROR',
	10: 'VOLTAGE_OUT_OF_RANGE',
};

const state = {
	LX: 0,
	LY: 0,
	RX: 0,
	RY: 0,
	L2: 0,
	R2: 0,

	triangle: false,
	circle: false,
	cross: false,
	square: false,

	DpadUp: false,
	DpadDown: false,
	DpadLeft: false,
	DpadRight: false,

	R3: false,
	L3: false,
	options: false,
	share: false,
	R2Btn: false,
	L2Btn: false,
	R1: false,
	L1: false,

	ps: false,
	touchBtn: false,
	micBtn: false,

	leftStopper: 0,
	rightStopper: 0,
	L4: false,
	R4: false,
	L5: false,
	R5: false,

	trackPadTouch0: {
		ID: 0,
		isActive: false,
		X: 0,
		Y: 0,
	},
	trackPadTouch1: {
		ID: 0,
		isActive: false,
		X: 0,
		Y: 0,
	},

	accelerometer: {
		X: 0,
		Y: 0,
		Z: 0,
	},
	gyro: {
		Pitch: 0,
		Yaw: 0,
		Roll: 0,
	},
	battery: {
		State: 0,
		Level: 0,
	},
};

const toSigned16 = (low, high) => {
	const value = (high << 8) | low;
	return value > 0x7fff ? value - 0x10000 : value;
};

const setDPadState = dpadState => {
	state.DpadUp = false;
	state.DpadDown = false;
	state.DpadLeft = false;
	state.DpadRight = false;

	switch (dpadState) {
		case 0:
			state.DpadUp = true;
			break;
		case 1:
			state.DpadUp = true;
			state.DpadRight = true;
			break;
		case 2:
			state.DpadRight = true;
			break;
		case 3:
			state.DpadDown = true;
			state.DpadRight = true;
			break;
		case 4:
			state.DpadDown = true;
			break;
		case 5:
			state.DpadDown = true;
			state.DpadLeft = true;
			break;
		case 6:
			state.DpadLeft = true;
			break;
		case 7:
			state.DpadUp = true;
			state.DpadLeft = true;
			break;
	}
};

const inputParser = data => {
	const reportList = Array.from(new Uint8Array(data.buffer));
	state.LX = reportList[0];
	state.LY = reportList[1];
	state.RX = reportList[2];
	state.RY = reportList[3];
	state.L2 = reportList[4];
	state.R2 = reportList[5];

	const buttonState = reportList[7];
	state.triangle = (buttonState & (1 << 7)) !== 0;
	state.circle = (buttonState & (1 << 6)) !== 0;
	state.cross = (buttonState & (1 << 5)) !== 0;
	state.square = (buttonState & (1 << 4)) !== 0;

	const dpad_state = buttonState & 0x0f;
	setDPadState(dpad_state);

	const misc = reportList[8];
	state.R3 = (misc & (1 << 7)) !== 0;
	state.L3 = (misc & (1 << 6)) !== 0;
	state.options = (misc & (1 << 5)) !== 0;
	state.share = (misc & (1 << 4)) !== 0;
	state.R2Btn = (misc & (1 << 3)) !== 0;
	state.L2Btn = (misc & (1 << 2)) !== 0;
	state.R1 = (misc & (1 << 1)) !== 0;
	state.L1 = (misc & (1 << 0)) !== 0;

	const misc2 = reportList[9];
	const stoppers = reportList[49];

	state.ps = (misc2 & (1 << 0)) !== 0;
	state.touchBtn = (misc2 & 0x02) !== 0;
	state.micBtn = (misc2 & 0x04) !== 0;

	//botones edge
	state.leftStopper = stoppers & 0x20 ? 2 : stoppers & 0x10 ? 1 : 0;
	state.rightStopper = stoppers & 0x80 ? 2 : stoppers & 0x40 ? 1 : 0;

	state.L4 = (misc2 & 0x10) !== 0;
	state.R4 = (misc2 & 0x20) !== 0;
	state.L5 = (misc2 & 0x40) !== 0;
	state.R5 = (misc2 & 0x80) !== 0;
	//termina botones

	//trackpad
	state.trackPadTouch0.ID = reportList[32] & 0x7f;
	state.trackPadTouch0.isActive = (reportList[32] & 0x80) === 0;
	state.trackPadTouch0.X = ((reportList[34] & 0x0f) << 8) | reportList[33];
	state.trackPadTouch0.Y =
		(reportList[35] << 4) | ((reportList[34] & 0xf0) >> 4);

	state.trackPadTouch1.ID = reportList[36] & 0x7f;
	state.trackPadTouch1.isActive = (reportList[36] & 0x80) === 0;
	state.trackPadTouch1.X = ((reportList[38] & 0x0f) << 8) | reportList[37];
	state.trackPadTouch1.Y =
		(reportList[39] << 4) | ((reportList[38] & 0xf0) >> 4);

	//GYRO
	state.gyro.Pitch = toSigned16(reportList[15], reportList[16]);
	state.gyro.Yaw = toSigned16(reportList[17], reportList[18]);
	state.gyro.Roll = toSigned16(reportList[19], reportList[20]);

	//ACCELEROMETER
	state.accelerometer.X = toSigned16(reportList[21], reportList[22]);
	state.accelerometer.Y = toSigned16(reportList[23], reportList[24]);
	state.accelerometer.Z = toSigned16(reportList[25], reportList[26]);

	//batery

	const battery = reportList[52]; // retrasado 1 posición

	// Estado de batería (parte alta del byte)
	const batteryState = (battery & 0xf0) >> 4;
	state.battery.State = BATTERY_STATE[batteryState]; // Puedes mapearlo si tienes una función BatteryState()

	// Nivel de batería (parte baja del byte)
	let battLevelRaw = battery & 0x0f;
	if (battLevelRaw > 8) battLevelRaw = 8;

	const battLevel = battLevelRaw / 8;
	state.battery.Level = battLevel * 100;

	return state;
};

function outParser() {
	// flags determing what changes this packet will perform
	// 0x01 set the main motors (also requires flag 0x02); setting this by itself will allow rumble to gracefully terminate and then re-enable audio haptics, whereas not setting it will kill the rumble instantly and re-enable audio haptics.
	// 0x02 set the main motors (also requires flag 0x01; without bit 0x01 motors are allowed to time out without re-enabling audio haptics)
	// 0x04 set the right trigger motor
	// 0x08 set the left trigger motor
	// 0x10 modification of audio volume
	// 0x20 toggling of internal speaker while headset is connected
	// 0x40 modification of microphone volume

	this.outReport[0] = 0xff; // [1]

	// further flags determining what changes this packet will perform
	// 0x01 toggling microphone LED
	// 0x02 toggling audio/mic mute
	// 0x04 toggling LED strips on the sides of the touchpad
	// 0x08 will actively turn all LEDs off? Convenience flag? (if so, third parties might not support it properly)
	// 0x10 toggling white player indicator LEDs below touchpad
	// 0x20 ???
	// 0x40 adjustment of overall motor/effect power (index 37 - read note on triggers)
	// 0x80 ???
	this.outReport[1] = 0x1 | 0x2 | 0x4 | 0x10 | 0x40 | 0x80; // [2]

	this.outReport[2] = this.setVibrationR.setMotor; // right low freq motor 0-255 // [3]
	this.outReport[3] = this.setVibrationL.setMotor; // left low freq motor 0-255 // [4]

	this.outReport[4] = 0x50;
	this.outReport[5] = 0x5a;

	// 0x10 ACTIVA AUDIO EN AUDIFONOS, 0x30 ACTIVA BOCINA, 0x20 ACTIVA LOS 2
	this.outReport[7] = this.setAudio.output | this.setAudio.micOutput;

	// set Micrphone LED, setting doesnt effect microphone settings
	this.outReport[8] = this.setAudio.microphone_led; // [9]

	this.outReport[9] = this.setAudio.microphone_mute === true ? 0x10 : 0x00;

	// add right trigger mode + parameters to packet
	this.outReport[10] = this.setTriggerR.mode;
	this.outReport[11] = this.setTriggerR.forces[0];
	this.outReport[12] = this.setTriggerR.forces[1];
	this.outReport[13] = this.setTriggerR.forces[2];
	this.outReport[14] = this.setTriggerR.forces[3];
	this.outReport[15] = this.setTriggerR.forces[4];
	this.outReport[16] = this.setTriggerR.forces[5];
	this.outReport[19] = this.setTriggerR.forces[6];

	this.outReport[21] = this.setTriggerL.mode;
	this.outReport[22] = this.setTriggerL.forces[0];
	this.outReport[23] = this.setTriggerL.forces[1];
	this.outReport[24] = this.setTriggerL.forces[2];
	this.outReport[25] = this.setTriggerL.forces[3];
	this.outReport[26] = this.setTriggerL.forces[4];
	this.outReport[27] = this.setTriggerL.forces[5];
	this.outReport[30] = this.setTriggerL.forces[6];

	// boost en bocina
	this.outReport[37] = 0x7;

	this.outReport[38] = this.setLight.ledOption;
	this.outReport[41] = this.setLight.pulseOptions;
	this.outReport[42] = this.setLight.brightness;
	this.outReport[43] = this.setLight.playerNumber;

	this.outReport[44] = this.setLight.touchpadColor[0];
	this.outReport[45] = this.setLight.touchpadColor[1];
	this.outReport[46] = this.setLight.touchpadColor[2];
}

const validateOutput = (value, checkIn) => {
	const valuesToCheck = Object.values(checkIn);

	const numberExist = valuesToCheck.includes(value);

	if (!numberExist) {
		throw new TypeError('Property not exist, consult constOutReport.js');
	}
	return;
};

const validateArray = (array, maxLength) => {
	const isAArray = Array.isArray(array);
	if (!isAArray) {
		throw new TypeError('The parameter must be array');
	}

	const length = array.length !== maxLength;
	if (length) {
		throw new RangeError('The length have to be 7.');
	}

	const isInt = array.some(value => !Number.isInteger(value));
	if (isInt) {
		throw new TypeError('The parameters must be integers.');
	}

	const isInRange = array.some(value => value < 0 || value > 255);
	if (isInRange) {
		throw new RangeError('Values must be between 0 and 255.');
	}
};

class DSAudio {
	constructor(sendFunc) {
		/**
		 * initialize the limited Audio features of the controller
		 */
		this.microphone_mute = false;
		this.microphone_led = false;
		this.output = AudioSpkSelect.EarSpeaker;
		this.micOutput = MicSelect.internal;
		this.sendAudio = sendFunc;
	}

	async setAudioOutput(valueState) {
		validateOutput(valueState, AudioSpkSelect);
		this.output = valueState;
		await this.sendAudio();
	}

	async setMicOutput(valueStateMic) {
		validateOutput(valueStateMic, MicSelect);
		this.micOutput = valueStateMic;
		await this.sendAudio();
	}

	async setMicrophoneLED(value) {
		/**
		 * Activates or disables the microphone led.
		 * This doesnt change the mute/unmutes the microphone itself.
		 *
		 * Args:
		 *     value (bool): On or off microphone LED
		 *
		 * Raises:
		 *     Exception: false state for the led
		 */
		if (typeof value !== 'boolean') {
			throw new TypeError('The parameter must be boolean.');
		}
		this.microphone_led = value;
		await this.sendAudio();
	}

	async setMicrophoneState(state) {
		/**
		 * Set the microphone state and also sets the microphone led accordingly
		 *
		 * Args:
		 *     state (bool): desired state of the microphone
		 *
		 * Raises:
		 *     TypeError: state was not a bool
		 */
		if (typeof state !== 'boolean') {
			throw new TypeError('The parameter must be boolean.');
		}

		this.setMicrophoneLED(state); // set led accordingly
		this.microphone_mute = state;
		await this.sendAudio();
	}
}

class DSLight {
	constructor(sendFunc) {
		this.brightness = Brightness.Low;
		this.playerNumber = PlayerID.PLAYER_1;
		this.ledOption = LedOptions.Both;
		this.pulseOptions = PulseOptions.Off;
		this.touchpadColor = [0, 0, 0];
		this.sendLight = sendFunc;
	}

	async setLEDOption(option) {
		validateOutput(option, LedOptions);

		this.ledOption = option;
		await this.sendLight();
	}

	async setPulseOption(option) {
		validateOutput(option, PulseOptions);
		this.pulseOptions = option;
		await this.sendLight();
	}

	async setBrightness(brightness) {
		validateOutput(brightness, Brightness);
		this.brightness = brightness;
		await this.sendLight();
	}

	async setPlayerID(player) {
		validateOutput(player, PlayerID);
		this.playerNumber = player;
		await this.sendLight();
	}

	async setColorI(rgb) {
		validateArray(rgb, 3);

		this.touchpadColor = rgb;
		await this.sendLight();
	}
}

class DSTrigger {
	/**
	 * Dualsense trigger class. Allows for multiple TriggerModes and multiple forces
	 *
	
	 */
	constructor(sendFunc) {
		// trigger modes
		this.mode = TriggerModes.Off;

		// force parameters for the triggers
		this.forces = Array(7).fill(0);
		this.sendTriggers = sendFunc;
	}

	async setMode(mode) {
		validateOutput(mode, TriggerModes);
		this.mode = mode;
		await this.sendTriggers();
	}

	async setForce(force) {
		validateArray(force, 7);

		this.forces = force;
		await this.sendTriggers();
	}

	async setEffect(effect) {
		/**
		 * Select effect
		 */

		const checkObject =
			effect !== null &&
			typeof effect === 'object' &&
			Object.prototype.toString.call(effect) === '[object Object]';
		if (!checkObject) {
			throw new TypeError('Effect not exist, consult constOutReport.js');
		}

		if (typeof effect.Mode !== 'number') {
			throw new TypeError('You can do that, consult constOutReport.js');
		}
		validateArray(effect.Force, 7);
		this.mode = effect.Mode;
		this.forces = effect.Force;
		await this.sendTriggers();
	}
}

class DSVibration {
	constructor(sendFunc) {
		this.setMotor = 0;
		this.sendVibration = sendFunc;
	}
	async setVibration(value) {
		const isInt = Number.isInteger(value);
		if (!isInt) {
			throw new TypeError('The parameters must be integers.');
		}

		const isInRange = value < 0 || value > 255;
		if (isInRange) {
			throw new RangeError('Values must be between 0 and 255.');
		}
		this.setMotor = value;
		await this.sendVibration();
	}
}

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

export { AudioSpkSelect, Brightness, LedOptions, MicSelect, PlayerID, PulseOptions, TrigerEffects, TriggerModes, jsDualsense };
//# sourceMappingURL=bundle.js.map
