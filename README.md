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

```javascript
import { jsDualsense, TrigerEffects } from "jsdualsense";

const ds = new jsDualsense();

async function main() {
  await ds.start(); // Conectar
  const data = await ds.readData(); // Leer datos de entrada
  console.log("Input:", data);

  // Cambiar el color de los LEDs a azul
  await ds.setLight.setColorI([0, 0, 255]);

  // Vibrar el motor izquierdo al 50%
  await ds.setVibrationL.setVibration(128);

  // Configurar gatillo izquierdo con fuerza máxima
  await ds.setTriggerL.setEffect(TrigerEffects.Weapon);

  // Apagar todo y cerrar la conexión
  await ds.finish();
}

main();
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
