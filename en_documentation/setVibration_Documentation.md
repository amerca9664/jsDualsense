# setVibration Documentation

## Class: `(DSVibration)` `setVibrationL` `setVibrationR`

Controller for vibration functions on the device, allowing you to adjust the vibration motor intensity.

### Constructor

```js
constructor(sendFunc);
```

- **Parameters:**
  - `sendFunc` _(Function)_: Function inherited from jsDualsense that is executed at the end of each `(DSVibration)` `setVibration` method to send vibration configuration changes to the `sendData()` method of `jsDualsense`.

---

### Method: `setVibration()`

- **Description:** Changes the vibration motor intensity.
- **Type:** `async`
- **Parameter:** `number` _(integer from 0 to 255)_
- **Options:**
  - `0`<br>
    No vibration.
  - `1 - 254`<br>
    Variable intensity.
  - `255`<br>
    Maximum vibration.
