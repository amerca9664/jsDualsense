# setTrigger Documentation

## Class: `(DSTrigger)` `setTriggerL` `setTriggerR`

Controller for adaptive trigger functions on the DualSense, allowing you to configure resistance modes and force profiles. To create your own trigger effect, use `setMode()` and `setForce()`. See **yesbotics** info [here](https://github.com/yesbotics/dualsense-controller-python/blob/main/research/ADAPTIVE_TRIGGER_EFFECTS.md). If you only want to use one of the 3 preloaded effects, use `setEffect()`.

### Constructor

```js
constructor(sendFunc);
```

- **Parameters:**
  - `sendFunc` _(Function)_: Function inherited from jsDualsense that is executed at the end of each `(DSTrigger)` `setTrigger` method to send trigger configuration changes to the `sendData()` method of `jsDualsense`.

---

### Method: `setMode()`

- **Description:** Changes the trigger operating mode.
- **Type:** `async`
- **Parameter:** `Object` _(TriggerModes.property)_
- **Available properties:**
  - `TriggerModes.Off`<br>
    No resistance.
  - `TriggerModes.Rigid`<br>
    Continuous resistance.
  - `TriggerModes.Pulse`<br>
    Sectioned resistance.
  - `TriggerModes.Rigid_A`<br>
    Rigid resistance type A.
  - `TriggerModes.Rigid_B`<br>
    Rigid resistance type B.
  - `TriggerModes.Rigid_AB`<br>
    Combined rigid resistance.
  - `TriggerModes.Pulse_A`<br>
    Pulse type A.
  - `TriggerModes.Pulse_B`<br>
    Pulse type B.
  - `TriggerModes.Pulse_AB`<br>
    Combined pulse.
  - `TriggerModes.Calibration`<br>
    Calibration mode.

---

### Method: `setForce()`

- **Description:** Changes the trigger parameters.
- **Type:** `async`
- **Parameter:** `Array` _(integer)_ _(length: 7)_
- **Example:** `[0, 255, 0, 0, 0, 0, 0]`

---

### Method: `setEffect()`

- **Description:** Allows you to set an effect by combining `setMode()` and `setForce()`.
- **Type:** `async`
- **Parameter:** `Object` _(TrigerEffects.property)_
- **Available properties:**
  - `TrigerEffects.Off`<br>
    Disables trigger effect.
  - `TrigerEffects.Vibration`<br>
    Trigger vibration effect.
  - `TrigerEffects.Weapon`<br>
    Trigger weapon effect.
  - `TrigerEffects.Rigid`<br>
    Trigger
