import { jsDualsense } from 'jsdualsense';
//import {jsDualsense} from 'https://cdn.skypack.dev/jsdualsense';

const startElement = document.getElementById('connectButton');
const closeElement = document.getElementById('closeButton');

const ds = new jsDualsense();

startElement.addEventListener('click', async () => {
	await ds.start(); //Connect

	await ds.setVibrationL.setVibration(255);
	await ds.setVibrationR.setVibration(255);
});

closeElement.addEventListener('click', async () => {
	await ds.finish(); // Disconnect
});
