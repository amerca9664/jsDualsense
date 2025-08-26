# Documentación de setTrigger

## Clase: `(DSTrigger)` `setTriggerL` `setTriggerR`

Controlador de funciones para los gatillos adaptativos del DualSense, permitiendo configurar modos de resistencia y perfiles de fuerza. Para generar tu propio efecto en el gatillo debes usar `setMode()` y `setForce()`. Revisa la información de **yesbotics** [aquí](https://github.com/yesbotics/dualsense-controller-python/blob/main/research/ADAPTIVE_TRIGGER_EFFECTS.md). Si solo deseas usar uno de los 3 efectos precargados, usa `setEffect()`.

### Constructor

```js
constructor(sendFunc);
```

- **Parámetros:**
  - `sendFunc` _(Function)_: Función heredada de jsDualsense que se ejecuta al final de cada método de `(DSTrigger)` `setTrigger` para enviar los cambios de configuración de los gatillos al método `sendData()` de `jsDualsense`.

---

### Método: `setMode()`

- **Descripción:** Cambia el modo de funcionamiento del gatillo.
- **Parámetro:** `Object` _(TriggerModes.property)_
- **Propiedades disponibles:**
  - `TriggerModes.Off`<br>
    Sin resistencia.
  - `TriggerModes.Rigid`<br>
    Resistencia continua.
  - `TriggerModes.Pulse`<br>
    Resistencia por secciones.
  - `TriggerModes.Rigid_A`<br>
    Resistencia rígida tipo A.
  - `TriggerModes.Rigid_B`<br>
    Resistencia rígida tipo B.
  - `TriggerModes.Rigid_AB`<br>
    Resistencia rígida combinada.
  - `TriggerModes.Pulse_A`<br>
    Pulso tipo A.
  - `TriggerModes.Pulse_B`<br>
    Pulso tipo B.
  - `TriggerModes.Pulse_AB`<br>
    Pulso combinado.
  - `TriggerModes.Calibration`<br>
    Modo calibración.

---

### Método: `setForce()`

- **Descripción:** Cambia los parametros del gatillo.
- **Parámetro:** `Array` _(integer)_ _(length: 7)_
- **Ejemplo:** `[0, 255, 0, 0, 0, 0, 0]`

---

### Método: `setEffect()`

- **Descripción:** Permite establecer un efecto combinando `setMode()` y `setForce()`.
- **Parámetro:** `Object` _(TrigerEffects.property)_
- **Propiedades disponibles:**
  - `TrigerEffects.Off`<br>
    Apaga efecto de gatillo
  - `TrigerEffects.Vibration`<br>
    Efecto de vibracion en gatillo
  - `TrigerEffects.Weapon`<br>
    Efecto de pistola en gatillo
  - `TrigerEffects.Rigid`<br>
    Efecto de rigidez en gatillo
