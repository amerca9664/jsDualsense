import { ErrorString } from '../constants/errorMagicStrings';

export class DSVibration {
	constructor(sendFunc) {
		this.setMotor = 0;
		this.sendVibration = sendFunc;
	}
	async setVibration(value) {
		const isInt = Number.isInteger(value);
		if (!isInt) {
			throw new TypeError(ErrorString.ERROR_TYPE_NUMBER);
		}

		const isInRange = value < 0 || value > 255;
		if (isInRange) {
			throw new RangeError(ErrorString.ERROR_RANGE);
		}
		this.setMotor = value;
		await this.sendVibration();
	}
}
