import {
	Brightness,
	LedOptions,
	PlayerID,
	PulseOptions,
} from '../constants/constOutReport';
import { validateArray, validateOutput } from './utils';

export class DSLight {
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
