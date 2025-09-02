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

---

### `sendFeatReport()`

- **Descripción:** Envía un Feature Report al dispositivo DualSense usando un mecanismo seguro de envío en cola (`_enqueueSend()`).
- **Parámetros:**
  - `reportId` (`number`): ID del informe a enviar.
  - `sendArray` (`TypedArray`): Datos a enviar, debe ser un `ArrayBuffer` o `Dataview` válido.
- **Tipo:** `async`

---

### `readFeatReport()`

- **Descripción:** Lee un Feature Report del dispositivo.
- **Parámetros:**
  - `reportId` (`number`): ID del informe a leer.
- **Tipo:** `async`
- **Retorna:** `Dataview` con los datos recibidos.

---

### `getInfo()`

- **Descripción:** Solicita y decodifica información de hardware del dispositivo.
  - Número de serie
  - ID único del MCU
  - ID de PCB
  - Código de barras de batería
  - Código de barras VCM izquierdo
  - Código de barras VCM derecho
  - ID del touchpad
- **Parámetros:** `Object` _(INFO_TO_GET.property)_
- **Propiedades disponibles:**
  - `INFO_TO_GET.serial_number`<br> Número de serie
  - `INFO_TO_GET.mcu_unique_id`<br> ID único del MCU
  - `INFO_TO_GET.pcba_id`<br> ID de PCB
  - `INFO_TO_GET.battery_barcode`<br> Código de barras de batería
  - `INFO_TO_GET.vcm_barcode_left`<br> Código de barras VCM izquierdo
  - `INFO_TO_GET.vcm_barcode_right`<br> Código de barras VCM derecho
  - `INFO_TO_GET.touchpad_id`<br> ID del touchpad
- **Tipo:** `async`
- **Retorna:** `string` con la información de hardware

---

### `getSoftwareInfo()`

- **Descripción:** Recupera información de software del dispositivo:
  - Fecha de compilación del firmware
  - Tipo de firmware
  - Serie del firmware
  - Información de hardware
  - Versión del firmware
  - Información del dispositivo
  - Versión del firmware SBL
  - Versión del firmware del touchpad
- **Tipo:** `async`
- **Retorna:** `Object` con la información de software

---

### Método: `finish()`

- **Descripción:** Apaga el dispositivo de forma segura. Restablece luz, vibración y efectos de gatillo a valores neutros, y cierra la conexión HID.
- **Tipo:** `async`

---
