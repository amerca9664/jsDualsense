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
- **Type:** `async`

---

### Method: `readData()`

- **Description:** Reads raw input data from the device and decodes it using `inputParser`.
- **Returns:** `Object` with controller input data.
- **Type:** `async`

---

### Method: `_enqueueSend()`

- **Description:** Method interno que gestiona una cola basada en promesas para serializar llamadas a `sendData`. Ensures only one output report is sent at a time.
- **Type:** `async`

---

### Method: `sendData()`

- **Description:** Prepares and sends the current output report to the device. Uses `outParser` to populate the report and handles errors gracefully. This method is called from the classes initialized in the constructor `setLight`, `setAudio`, `setTrigger` y `setVibration`.
- **Type:** `async`

---

### `sendFeatReport()`

- **Description:**  
  Sends a Feature Report to the DualSense device using a safe, queued dispatch mechanism `_enqueueSend()`.

- **Parameters:**

  - `reportId` (`number`): The ID of the report to send.
  - `sendArray` (`TypedArray`): The data to send; must be a valid `ArrayBuffer` view.

- **Type:** `async`

---

### `readFeatReport()`

- **Description:**  
  Reads a Feature Report from the device.

- **Parameters:**
  - `reportId` (`number`): The ID of the report to read.

**Type:** `async`  
**Returns:** `ArrayBuffer`: containing the received data.

---

### `getInfo()`

- **Description:**  
  Requests and decodes specific information from the device using Feature Reports.

- **Parameters:** `Object` _(INFO_TO_GET.property)_
- **Available properties:**
  - `INFO_TO_GET.serial_number`<br>
    Serial number.
- **Type:** `async`
- **Returns:** `string`: containing hardware information

---

### `getSoftwareInfo()`

- **Description:**  
  Retrieves software information from the device.

- **Type:** `async`
- **Returns:** `Object` containing software information

---

### Method: `finish()`

- **Description:** Safely shuts down the device. Resets light, vibration, and trigger effects to neutral values, and closes the HID connection.
- **Tipo:** `async`

---
