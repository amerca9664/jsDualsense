# jsDualsense

**jsDualsense** es una librería JavaScript para interactuar con el control DualSense de PlayStation 5 (y Edge) usando WebHID. Permite leer inputs, controlar luces LED, vibración, gatillos adaptativos y audio del control desde el navegador.

## Características

- Conexión fácil al control DualSense vía WebHID.
- Lectura de datos de entrada (sticks, botones, gatillos, sensores).
- Control de los LED RGB del control.
- Control de vibración (motor izquierdo y derecho).
- Control de los gatillos adaptativos (L2/R2).
- Control de efectos de audio del control.
- Cola de envío para evitar condiciones de carrera en los comandos de salida.
- Apagado seguro del control.

## Instalación

```
npm install jsdualsense
```

O descarga los archivos desde este repositorio.

## Uso básico

### HTML code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Light features example</title>
  </head>
  <body>
    <input type="button" value="Conect" id="connectButton" />
    <input type="button" value="Close" id="closeButton" />
    <script type="module" src="index.js"></script>
  </body>
</html>
```

### Javascript code

```javascript
//index.js

import { jsDualsense, TrigerEffects } from "jsdualsense";
//import {jsDualsense, TrigerEffects} from 'https://cdn.skypack.dev/jsdualsense';

const startElement = document.getElementById("connectButton");
const closeElement = document.getElementById("closeButton");

const ds = new jsDualsense();

startElement.addEventListener("click", async () => {
  await ds.start(); // Conectar
  const data = await ds.readData(); // Leer datos
  console.log("Input:", data);

  // Cambiar colo a azul
  await ds.setLight.setColorI([0, 0, 255]);

  // Vibracion al 50%
  await ds.setVibrationL.setVibration(128);

  // Colocar efecto de pistola
  await ds.setTriggerL.setEffect(TrigerEffects.Weapon);
});

closeElement.addEventListener("click", async () => {
  await ds.finish(); // Desconectar
});
```

## API Principal

- **start()**: Inicia la conexión con el control.
- **readData()**: Lee y decodifica datos del control.
- **setLight.setColorI([r, g, b])**: Cambia el color de los LED (0-255).
- **setVibrationL.setVibration(valor)** / **setVibrationR.setVibration(valor)**: Ajusta vibración.
- **setTriggerL.setEffect(config)** / **setTriggerR.setEffect(config)**: Configura efecto del gatillo.
- **finish()**: Apaga efectos y cierra la conexión.

## Requisitos

- Navegador con soporte para [WebHID API](https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API) (Chrome, Edge).
- DualSense (PS5) o DualSense Edge.

## Notas

- Debes ejecutar este código en un contexto seguro (https/localhost).
- El usuario debe dar permiso para acceder al dispositivo HID.

## Licencia

MIT

---

Desarrollado por [amerca9664](https://github.com/amerca9664)
