import { TriggerModes } from '../constants/constOutReport';
import { validateArray, validateOutput } from './utils';

export class DSTrigger {
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
