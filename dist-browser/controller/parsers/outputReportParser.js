export function outParser() {
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
