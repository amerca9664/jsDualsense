import { AudioSpkSelect, MicSelect } from '../constants/constOutReport';
import { ErrorString } from '../constants/errorMagicStrings';
import { validateOutput } from './utils';

export class DSAudio {
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
			throw new TypeError(ErrorString.ERROR_TYPE_BOOLEAN);
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
			throw new TypeError(ErrorString.ERROR_TYPE_BOOLEAN);
		}

		this.setMicrophoneLED(state); // set led accordingly
		this.microphone_mute = state;
		await this.sendAudio();
	}
}
