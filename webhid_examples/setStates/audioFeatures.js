import { jsDualsense, MicSelect, AudioSpkSelect } from 'jsdualsense';

const ds = new jsDualsense();

await ds.start(); // Connect

// Activar bocina interna y seleccionar micrófono externo
await dualsense.setAudio.setOutput(AudioSpkSelect.Speaker);
await dualsense.setAudio.setMicrophone(MicSelect.External);

// Encender LED del micrófono y silenciarlo
await dualsense.setAudio.setMicrophoneLed(true);
await dualsense.setAudio.setMicrophoneMute(true);

await ds.finish(); // Disconnect
