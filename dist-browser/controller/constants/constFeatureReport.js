export const INFO_TO_GET = {
	serial_number: [1, 19, 17, true, false],
	mcu_unique_id: [1, 9, 9, false, false],
	pcba_id: [1, 17, 14, true, true], // apply reverse_str
	battery_barcode: [1, 24, 23, true, false],
	vcm_barcode_left: [1, 26, 16, true, false],
	vcm_barcode_right: [1, 28, 16, true, false],
	touchpad_id: [5, 2, 8, false, false],
};
