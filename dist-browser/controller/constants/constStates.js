export const state = {
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
