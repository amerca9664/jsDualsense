# Documentación de jsDualsense

## Clase: `jsDualsense`

Controlador principal para la gestión de dispositivos DualSense. Encapsula la conexión HID, el envío de datos, y la configuración de módulos como luz, audio, gatillos y vibración.

---

### Constructor

```js
constructor();
```

- **Descripción:** Inicializa la interfaz DualSense. Configura parámetros de conexión, buffer de salida, módulos del dispositivo y una cola de envío basada en promesas para evitar condiciones de carrera.
- **Módulos inicializados:**
  - `setLight`: Control de iluminación.
  - `setAudio`: Control de audio.
  - `setTriggerL` / `setTriggerR`: Control de gatillos izquierdo y derecho.
  - `setVibrationL` / `setVibrationR`: Control de vibración izquierda y derecha.

---

### Método: `start()`

- **Descripción:** Pregunta si el usuario autoriza el uso del dispositivo e inicia la conexión con el dispositivo DualSense usando filtros de conexión predefinidos.
- **Tipo:** `async`

---

### Método: `readData()`

- **Descripción:** Lee datos de entrada crudos desde el dispositivo y los decodifica usando `inputParser`.
- **Retorna:** `Object` con datos de los inputs del control.
- **Tipo:** `async`

---

### Método: `_enqueueSend()`

- **Descripción:** Método interno que gestiona una cola basada en promesas para serializar llamadas a `sendData`. Asegura que solo se envíe un reporte de salida a la vez.
- **Tipo:** `async`

---

### Método: `sendData()`

- **Descripción:** Prepara y envía el reporte de salida actual al dispositivo. Utiliza `outParser` para poblar el reporte y maneja errores de forma segura. Este metodo es llamado desde las clases inicializadas en el constructor `setLight`, `setAudio`, `setTrigger` y `setVibration`.
- **Tipo:** `async`

---

### Método: `finish()`

- **Descripción:** Apaga el dispositivo de forma segura. Restablece luz, vibración y efectos de gatillo a valores neutros, y cierra la conexión HID.
- **Tipo:** `async`

---
