# setAudio Documentation

## Class: `(DSAudio)` `setAudio`

Controller for audio functions on a device, such as speaker selection, microphone, and LED state.

### Constructor

```js
constructor(sendFunc);
```

- **Parameters:**
  - `sendFunc` _(Function)_: Function inherited from jsDualsense that is executed at the end of each `(DSAudio)` `setAudio` method to send audio configuration changes to the `sendData()` method of `jsDualsense`.

---

### Method: `setAudioOutput()`

- **Description:** Changes the audio output.
- **Type:** `async`
- **Parameter:** `Object` _(AudioSpkSelect.property)_
- **Available properties:**
  - `AudioSpkSelect.Speaker`<br>
    Selects audio output through the DualSense speaker.
  - `AudioSpkSelect.EarSpeaker`<br>
    Selects audio output through headphones.

---

### Method: `setMicOutput()`

- **Description:** Changes the microphone input.
- **Type:** `async`
- **Parameter:** `Object` _(MicSelect.property)_
- **Available properties:**
  - `MicSelect.Internal`<br>
    Selects audio input from the DualSense microphone.
  - `MicSelect.External`<br>
    Selects audio input from an external microphone.

---

### Method: `setMicrophoneLED()`

- **Description:** Turns the microphone LED on or off.
- **Type:** `async`
- **Parameter:** `boolean`
- **Options:**
  - `true`<br>
    LED On.
  - `false`<br>
    LED Off.

---

### Method: `setMicrophoneState()`

- **Description:** Changes the microphone state (mute/unmute) and adjusts the LED.
- **Type:** `async`
- **Parameter:** `boolean`
- **Options:**
  - `true`<br>
    On.
