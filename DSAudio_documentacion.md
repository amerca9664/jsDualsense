# Documentación de DSAudio y Constantes de Audio

## Clase: `DSAudio`

Controlador de funciones de audio para un dispositivo, como selección de altavoz, micrófono y estado del LED.

### Constructor

```js
constructor(sendFunc);
```

- **Parámetros:**
  - `sendFunc` _(Function)_: Función que se ejecuta para enviar los cambios de configuración de audio.

---

### Método: `setAudioOutput(valueState)`

```js
async setAudioOutput(valueState)
```

- **Descripción:** Cambia la salida de audio.
- **Metodo:** `valueState` _(AudioSpkSelect)_
- **Opciones disponibles:**
  ```js
  AudioSpkSelect = {
    Speaker: 0x30,
    EarSpeaker: 0x10,
  };
  ```

---

### Método: `setMicOutput(valueStateMic)`

```js
async setMicOutput(valueStateMic)
```

- **Descripción:** Cambia la salida del micrófono.
- **Metodo:** `valueStateMic` _(MicSelect)_
- **Opciones disponibles:**

  - **Internal**
  - **External**

---

### Método: `setMicrophoneLED(value)`

```js
async setMicrophoneLED(value)
```

- **Descripción:** Activa o desactiva el LED del micrófono.
- **Metodo:** `value` _(boolean)_
- **Opciones:** `true` (encendido), `false` (apagado)

---

### Método: `setMicrophoneState(state)`

```js
async setMicrophoneState(state)
```

- **Descripción:** Cambia el estado del micrófono (mute/unmute) y ajusta el LED.
- **Metodo:** `state` _(boolean)_
- **Opciones:** `true` (silenciado), `false` (activo)

---
