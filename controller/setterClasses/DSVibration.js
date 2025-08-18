export class DSVibration {
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
