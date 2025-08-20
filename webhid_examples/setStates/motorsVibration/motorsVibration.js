// Local import for development or internal use
import { jsDualsense } from 'jsdualsense';

// Import from CDN for environments where packages can't be installed (e.g., directly in browsers)
//import {jsDualsense} from 'https://cdn.skypack.dev/jsdualsense';

const startElement = document.getElementById('connectButton');
const closeElement = document.getElementById('closeButton');

const ds = new jsDualsense();

startElement.addEventListener('click', async () => {
	await ds.start(); // Connect

	await ds.setVibrationL.setVibration(255);
	await ds.setVibrationR.setVibration(255);
});

closeElement.addEventListener('click', async () => {
	await ds.finish(); // Disconnect
});
