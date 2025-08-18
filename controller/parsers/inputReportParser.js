import { BATTERY_STATE } from '../constants/constBatteryStates';
import { state } from '../constants/constStates';

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
		default:
			// Todos los valores ya están en false
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

export { inputParser };
