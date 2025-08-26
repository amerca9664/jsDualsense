# Documentación de setAudio

## Clase: `(DSAudio)` `setAudio`

Controlador de funciones de audio para un dispositivo, como selección de altavoz, micrófono y estado del LED.

### Constructor

```js
constructor(sendFunc);
```

- **Parámetros:**
  - `sendFunc` _(Function)_: Función heredada de jsDualsense que se ejecuta al final de cada metodo de `(DSAudio)` `setAudio` para enviar los cambios de configuración de audio al metodo `sendData()` de `jsDualsense`.

---

### Método: `setAudioOutput()`

- **Descripción:** Cambia la salida de audio.
- **Tipo:** `async`
- **Parámetro:** `Object` _(AudioSpkSelect.property)_
- **Propiedades disponibles:**
  - `AudioSpkSelect.Speaker`<br>
    Selecciona salida de audio por bocina del dualsense.
  - `AudioSpkSelect.EarSpeaker`<br>
    Selecciona salida de audio por audifonos.

---

### Método: `setMicOutput()`

- **Descripción:** Cambia la salida del micrófono.
- **Tipo:** `async`
- **Parámetro:** `Object` _(MicSelect.property)_
- **Propiedades disponibles:**
  - `MicSelect.Internal`<br>
    Selecciona entrada de audio por microfono del dualsense.
  - `MicSelect.External`<br>
    Selecciona entrada de audio por microfono externo.

---

### Método: `setMicrophoneLED()`

- **Descripción:** Activa o desactiva el LED del micrófono.
- **Tipo:** `async`
- **Parámetro:** `boolean`
- **Opciones:**
  - `true`<br>
    LED Encendido.
  - `false`<br>
    LED Apagado.

---

### Método: `setMicrophoneState()`

- **Descripción:** Cambia el estado del micrófono (mute/unmute) y ajusta el LED.
- **Tipo:** `async`
- **Parámetro:** `boolean`
- **Opciones:**
  - `true`<br>
    Encendido.
  - `false`<br>
    Apagado.

---
