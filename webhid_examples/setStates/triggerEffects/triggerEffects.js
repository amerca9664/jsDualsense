// Local import for development or internal use
import { jsDualsense, TrigerEffects } from 'jsdualsense';

// Import from CDN for environments where packages can't be installed (e.g., directly in browsers)
//import {jsDualsense, TrigerEffects} from 'https://cdn.skypack.dev/jsdualsense';

const startElement = document.getElementById('connectButton');
const closeElement = document.getElementById('closeButton');

const ds = new jsDualsense();

startElement.addEventListener('click', async () => {
	await ds.start(); // Connect

	//Left trigger set as "weapon", right trigger set as "vibration"
	await ds.setTriggerL.setEffect(TrigerEffects.Weapon);
	await ds.setTriggerR.setEffect(TrigerEffects.Vibration);
});

closeElement.addEventListener('click', async () => {
	await ds.finish(); // Disconnect
});
