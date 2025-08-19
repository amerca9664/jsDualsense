import { jsDualsense, TrigerEffects } from 'jsdualsense';

const ds = new jsDualsense();

await ds.start(); // Connect

//Left trigger set as "weapon", right trigger set as "vibration"
await dualsense.setTriggerL.setEffect(TrigerEffects.Weapon);
await dualsense.setTriggerR.setEffect(TrigerEffects.Vibration);

await ds.finish(); // Disconnect
