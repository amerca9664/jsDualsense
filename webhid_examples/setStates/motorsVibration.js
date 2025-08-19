import { jsDualsense } from 'jsdualsense';

const ds = new jsDualsense();

await ds.start(); // Connect

await dualsense.setVibrationL.setVibration(255);
await dualsense.setVibrationR.setVibration(0);

await ds.finish(); // Disconnect
