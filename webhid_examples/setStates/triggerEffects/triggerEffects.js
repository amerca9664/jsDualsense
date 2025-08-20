import { jsDualsense, TrigerEffects } from 'jsdualsense';
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
