// import { jsDualsense } from 'jsdualsense';

import {
	jsDualsense,
	TrigerEffects,
} from 'https://cdn.skypack.dev/jsdualsense';

const connectElement = document.getElementById('connect');
const readElement = document.getElementById('read');
const closeElement = document.getElementById('close');
const showTextElement = document.getElementById('showText');

const ds = new jsDualsense();

connectElement.addEventListener('click', async () => {
	await ds.start();
});

let isReading = false;
readElement.addEventListener('click', () => {
	const readLoop = async () => {
		if (isReading) {
			isReading = false;
			return;
		}

		isReading = true;

		try {
			const data = await ds.readData();
			showTextElement.textContent = JSON.stringify(data);

			isReading = false;
		} catch (error) {
			console.error(error);
			isReading = false;
			return;
		}

		setTimeout(readLoop, 10); // Wait until the next read
	};

	readLoop(); // Start cicle
});

closeElement.addEventListener('click', async () => {
	isReading = true;

	await ds.finish();
});
