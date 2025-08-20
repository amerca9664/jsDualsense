// Local import for development or internal use
import { AudioSpkSelect, jsDualsense, MicSelect } from 'jsdualsense';

// Import from CDN for environments where packages can't be installed (e.g., directly in browsers)
// import { jsDualsense, MicSelect, AudioSpkSelect } from 'https://cdn.skypack.dev/jsdualsense';

const startElement = document.getElementById('connectButton');
const closeElement = document.getElementById('closeButton');

const ds = new jsDualsense();

startElement.addEventListener('click', async () => {
	await ds.start(); // Connect

	// Activar bocina interna y seleccionar micrófono externo
	await ds.setAudio.setAudioOutput(AudioSpkSelect.Speaker);
	await ds.setAudio.setMicOutput(MicSelect.External);

	// Encender LED del micrófono y silenciarlo
	await ds.setAudio.setMicrophoneLED(true);
	await ds.setAudio.setMicrophoneState(true);
});

closeElement.addEventListener('click', async () => {
	await ds.finish(); // Disconnect
});
