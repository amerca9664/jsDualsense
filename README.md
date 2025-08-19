# README Español

[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/amerca9664/jsDualsense/blob/dev/README.es.md)

# jsDualsense

**jsDualsense** is a JavaScript library for interacting with the PlayStation 5 DualSense (and Edge) controller using WebHID. It allows you to read inputs, control LED lights, vibration, adaptive triggers, and audio from the controller directly in the browser.

## Features

- Easy connection to the DualSense controller via WebHID.
- Input reading (sticks, buttons, triggers, sensors).
- RGB LED control.
- Vibration control (left and right motors).
- Adaptive trigger control (L2/R2).
- Audio effect control from the controller.
- Output command queue to prevent race conditions.
- Safe shutdown of the controller.

## Installation

```
npm install jsdualsense
```

Or download the files from this repository.

## Basic Usage

```javascript
import { jsDualsense, TrigerEffects } from "jsdualsense";

const ds = new jsDualsense();

async function main() {
  await ds.start(); // Connect
  const data = await ds.readData(); // Read input data
  console.log("Input:", data);

  // Change LED color to blue
  await ds.setLight.setColorI([0, 0, 255]);

  // Vibrate the left motor at 50%
  await ds.setVibrationL.setVibration(128);

  // Set left trigger to max force
  await ds.setTriggerL.setEffect(TrigerEffects.Weapon);

  // Turn everything off and close connection
  await ds.finish();
}

main();
```

## Main API

- **start()**: Initiates the connection with the controller.
- **readData()**: Reads and decodes input data.
- **setLight.setColorI([r, g, b])**: Changes the LED color (0–255).
- **setVibrationL.setVibration(value)** / **setVibrationR.setVibration(value)**: Sets vibration.
- **setTriggerL.setEffect(config)** / **setTriggerR.setEffect(config)**: Configures trigger effect.
- **finish()**: Turns off effects and closes the connection.

## Requirements

- A browser that supports the [WebHID API](https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API) (Chrome, Edge).
- A DualSense (PS5) or DualSense Edge controller.

## Notes

- This code must run in a secure context (https or localhost).
- The user must grant permission to access the HID device.

## License

MIT

---

Developed by [amerca9664](https://github.com/amerca9664)
