# README Español

[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/amerca9664/jsDualsense/blob/main/README.es.md)

# jsDualsense

**jsDualsense** is a JavaScript library for interacting with the PlayStation 5 DualSense (and Edge) controller using WebHID. It allows you to read inputs, control LED lights, vibration, adaptive triggers, and audio from the controller directly in the browser.

## Features

- Easy connection to the DualSense controller via WebHID.
- Input reading (sticks, buttons, triggers, sensors).
- RGB LED control.
- Vibration control (left and right motors).
- Adaptive trigger control (L2/R2).
- Audio effect control from the controller.

## Requirements

- A browser that supports the [WebHID API](https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API) (Chrome, Edge).
- A DualSense (PS5) or DualSense Edge controller.

## Installation

```
npm install jsdualsense
```

Or download the files from this repository.

## Basic Usage

### HTML code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Light features example</title>
  </head>
  <body>
    <input type="button" value="Conect" id="connectButton" />
    <input type="button" value="Close" id="closeButton" />
    <script type="module" src="index.js"></script>
  </body>
</html>
```

### Javascript code

```javascript
//index.js

// Local import for development or internal use
import { jsDualsense, TrigerEffects } from "jsdualsense";

// Import from CDN for environments where packages can't be installed (e.g., directly in browsers)
//import {jsDualsense, TrigerEffects} from 'https://cdn.skypack.dev/jsdualsense';

const startElement = document.getElementById("connectButton");
const closeElement = document.getElementById("closeButton");

const ds = new jsDualsense();

startElement.addEventListener("click", async () => {
  await ds.start(); // Connect
  const data = await ds.readData(); // Read input data
  console.log("Input:", data);

  // Change LED color to blue
  await ds.setLight.setColorI([0, 0, 255]);

  // Vibrate the left motor at 50%
  await ds.setVibrationL.setVibration(128);

  // Set left trigger to max force
  await ds.setTriggerL.setEffect(TrigerEffects.Weapon);
});

closeElement.addEventListener("click", async () => {
  await ds.finish(); // Disconnect
});
```

## Main API

- **start()**: Initiates the connection with the controller.
- **readData()**: Reads and decodes input data.
- **finish()**: Turns off effects and closes the connection.

## Documentation

Check out the folder [en_documentation](https://github.com/amerca9664/jsDualsense/tree/main/es_documentation) for more information about the function of this library.

## Notes

- This code must run in a secure context (https or localhost).
- The user must grant permission to access the HID device.

## Credits

- [flok](https://github.com/flok), this proyect it is almost a traslate of his proyect [pydualsense](https://github.com/flok/pydualsense).
- [dualshock-tools](https://github.com/dualshock-tools), all the information about software and hardware comes from his proyect [dualshock-tools.github.io](https://github.com/dualshock-tools/dualshock-tools.github.io). Also you can calibrate your controller in his page [DualShock Calibration GUI](https://dualshock-tools.github.io/)

## License

MIT

---

Developed by [amerca9664](https://github.com/amerca9664), email: amerca9664@gmail.com
