import { ErrorString, WarningString } from './constants/errorMagicStrings'; // Import error message strings
import {
	ConnectionClose,
	ConnectionError,
	ConnectionNotOpen,
	ConnectionNotSend,
	ConnectionOpen,
	ConnectionTimeOut,
} from './errorsInConnection'; // Import error types

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

	async receiveFeature(reportId) {
		if (typeof reportId !== 'number') {
			throw new TypeError(ErrorString.ERROR_TYPE_NUMBER);
		}

		const data = await this.device.receiveFeatureReport(reportId);
		return data;
	}

	async sendFeature(reportId, data) {
		if (typeof reportId !== 'number') {
			throw new TypeError(ErrorString.ERROR_TYPE_NUMBER);
		}

		if (!ArrayBuffer.isView(data)) {
			throw new TypeError(ErrorString.ERROR_TYPE_BUFFER);
		}

		try {
			await this.device.sendFeatureReport(reportId, data);
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

export { HIDconnector };
