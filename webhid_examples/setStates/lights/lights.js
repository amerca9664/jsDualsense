// Local import for development or internal use
import {
	Brightness,
	jsDualsense,
	LedOptions,
	PlayerID,
	PulseOptions,
} from 'jsdualsense';

// Import from CDN for environments where packages can't be installed (e.g., directly in browsers)
//import {jsDualsense, LedOptions, PulseOptions, Brightness, PlayerID,} from 'https://cdn.skypack.dev/jsdualsense';

const startElement = document.getElementById('connectButton');
const closeElement = document.getElementById('closeButton');

const ds = new jsDualsense();

startElement.addEventListener('click', async () => {
	await ds.start(); // Connect

	// Change color to red and config other led options
	await ds.setLight.setColorI([255, 0, 0]);
	await ds.setLight.setLEDOption(LedOptions.Both);
	await ds.setLight.setPulseOption(PulseOptions.Off);
	await ds.setLight.setBrightness(Brightness.Low);
	await ds.setLight.setPlayerID(PlayerID.PLAYER_3);
});

closeElement.addEventListener('click', async () => {
	await ds.finish(); // Disconnect
});
