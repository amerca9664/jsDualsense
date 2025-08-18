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

export {
	LedOptions,
	PulseOptions,
	Brightness,
	PlayerID,
	TriggerModes,
	AudioSpkSelect,
	MicSelect,
	TrigerEffects,
};
