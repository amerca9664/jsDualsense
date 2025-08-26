# Documentación de DSLight

## Clase: `(DSLight)` `setLight`

Controlador de funciones de iluminación para el dispositivo, como brillo, color, LED de jugador y efectos de pulso.

### Constructor

```js
constructor(sendFunc);
```

- **Parámetros:**
  - `sendFunc` _(Function)_: Función heredada de jsDualsense que se ejecuta al final de cada método de `(DSLight)` `setLight` para enviar los cambios de configuración de luz al método `sendData()` de `jsDualsense`.

---

### Método: `setLEDOption()`

- **Descripción:** Cambia la opción de LED (apagado, brillo, ininterrumpible, ambos).
- **Tipo:** `async`
- **Parámetro:** `Object` _(LedOptions.property)_
- **Propiedades disponibles:**
  - `LedOptions.Off`<br>
    Apaga los LEDs.
  - `LedOptions.PlayerLedBrightness`<br>
    Habilita control LED de jugador.
  - `LedOptions.UninterrumpableLed`<br>
    LED ininterrumpible.
  - `LedOptions.Both`<br>
    Aplica ambas opciones.

---

### Método: `setPulseOption()`

- **Descripción:** Cambia el efecto de pulso de la luz.
- **Tipo:** `async`
- **Parámetro:** `Object` _(PulseOptions.property)_
- **Propiedades disponibles:**
  - `PulseOptions.Off`<br>
    Sin efecto de pulso.
  - `PulseOptions.FadeBlue`<br>
    Pulso azul.
  - `PulseOptions.FadeOut`<br>
    Pulso de desvanecimiento.

---

### Método: `setBrightness()`

- **Descripción:** Cambia el brillo del LED de jugador.
- **Tipo:** `async`
- **Parámetro:** `Object` _(Brightness.property)_
- **Propiedades disponibles:**
  - `Brightness.High`<br>
    Brillo alto.
  - `Brightness.Medium`<br>
    Brillo medio.
  - `Brightness.Low`<br>
    Brillo bajo.

---

### Método: `setPlayerID()`

- **Descripción:** Cambia el número de jugador mostrado por los LEDs.
- **Tipo:** `async`
- **Parámetro:** `Object` _(PlayerID.property)_
- **Propiedades disponibles:**
  - `PlayerID.PLAYER_1`<br>
    Jugador 1.
  - `PlayerID.PLAYER_2`<br>
    Jugador 2.
  - `PlayerID.PLAYER_3`<br>
    Jugador 3.
  - `PlayerID.PLAYER_4`<br>
    Jugador 4.
  - `PlayerID.ALL`<br>
    Todos los LEDs encendidos.

---

### Método: `setColorI()`

- **Descripción:** Cambia el color del touchpad usando un array RGB.
- **Tipo:** `async`
- **Parámetro:** `Array` _(integer)_ _(length: 3)_
- **Ejemplo:** `[255, 0, 0]` para rojo.
