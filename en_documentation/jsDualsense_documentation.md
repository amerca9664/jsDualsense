# jsDualsense Documentation

## Class: `jsDualsense`

Main controller for managing DualSense devices. Encapsulates HID connection, data transmission, and configuration of modules such as light, audio, triggers, and vibration.

---

### Constructor

```js
constructor();
```

- **Description:** Initializes the DualSense interface. Sets up connection parameters, output buffer, device modules, and a promise-based send queue to avoid race conditions.
- **Initialized modules:**
  - `setLight`: Light control.
  - `setAudio`: Audio control.
  - `setTriggerL` / `setTriggerR`: Left and right trigger control.
  - `setVibrationL` / `setVibrationR`: Left and right vibration control.

---

### Method: `start()`

- **Description:** Prompts user for device access and initiates connection using predefined filters.
- **Tipo:** `async`

---

### Method: `readData()`

- **Description:** Reads raw input data from the device and decodes it using `inputParser`.
- **Returns:** `Object` with controller input data.
- **Tipo:** `async`

---

### Method: `_enqueueSend()`

- **Description:** Method interno que gestiona una cola basada en promesas para serializar llamadas a `sendData`. Ensures only one output report is sent at a time.
- **Tipo:** `async`

---

### Method: `sendData()`

- **Description:** Prepares and sends the current output report to the device. Uses `outParser` to populate the report and handles errors gracefully. This method is called from the classes initialized in the constructor `setLight`, `setAudio`, `setTrigger` y `setVibration`.
- **Tipo:** `async`

---

### Method: `finish()`

- **Description:** Safely shuts down the device. Resets light, vibration, and trigger effects to neutral values, and closes the HID connection.
- **Tipo:** `async`

---
