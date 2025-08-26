# Documentación de setVibration

## Clase: `(DSVibration)` `setVibrationL` `setVibrationR`

Controlador de funciones de vibración para el dispositivo, permitiendo ajustar la intensidad del motor de vibración.

### Constructor

```js
constructor(sendFunc);
```

- **Parámetros:**
  - `sendFunc` _(Function)_: Función heredada de jsDualsense que se ejecuta al final de cada método de `(DSVibration)` `setVibration` para enviar los cambios de configuración de vibración al método `sendData()` de `jsDualsense`.

---

### Método: `setVibration()`

- **Descripción:** Cambia la intensidad de vibración del motor.
- **Tipo:** `async`
- **Parámetro:** `number` _(integer from 0 to 255)_
- **Opciones:**
  - `0`<br>
    Sin vibración.
  - `1 - 254`<br>
    Intensidad variable.
  - `255`<br>
    Vibración
