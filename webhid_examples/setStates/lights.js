import {
	jsDualsense,
	LedOptions,
	PulseOptions,
	Brightness,
	PlayerID,
} from 'jsdualsense';

const ds = new jsDualsense();

await ds.start(); // Connect

// Change color to red and config other led options
await dualsense.setLight.setColorI([255, 0, 0]);
await dualsense.setLight.setLedOption(LedOptions.Both);
await dualsense.setLight.setPulseOptions(PulseOptions.FadeBlue);
await dualsense.setLight.setBrightness(Brightness.High);
await dualsense.setLight.setPlayerNumber(PlayerID.PLAYER_2);

await ds.finish(); // Disconnect
