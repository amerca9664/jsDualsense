// Local import for development or internal use
// import { jsDualsense } from 'jsdualsense';

// Import from CDN for environments where packages can't be installed (e.g., directly in browsers)
import { jsDualsense, INFO_TO_GET } from 'https://cdn.skypack.dev/jsdualsense';

const startElement = document.getElementById('connectButton');
const closeElement = document.getElementById('closeButton');

const ds = new jsDualsense();

startElement.addEventListener('click', async () => {
	await ds.start(); // Connect

	const serialNumber = await ds.getInfo(INFO_TO_GET.serial_number);
	console.log(`Serial number: ${serialNumber}`);

	const mcuUniqueId = await ds.getInfo(INFO_TO_GET.mcu_unique_id);
	console.log(`MCU unique ID: ${mcuUniqueId}`);

	const pcbaId = await ds.getInfo(INFO_TO_GET.pcba_id);
	console.log(`PCB ID: ${pcbaId}`);

	const batteryBarcode = await ds.getInfo(INFO_TO_GET.battery_barcode);
	console.log(`Battery Barcode: ${batteryBarcode}`);

	const vcmBarcodeLeft = await ds.getInfo(INFO_TO_GET.vcm_barcode_left);
	console.log(`VCM Left Barcode: ${vcmBarcodeLeft}`);

	const vcmBarcodeRight = await ds.getInfo(INFO_TO_GET.vcm_barcode_right);
	console.log(`VCM Right Barcode: ${vcmBarcodeRight}`);

	const touchpadId = await ds.getInfo(INFO_TO_GET.touchpad_id);
	console.log(`Touchpad ID: ${touchpadId}`);
});

closeElement.addEventListener('click', async () => {
	await ds.finish(); // Disconnect
});
