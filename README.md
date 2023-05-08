# BleuIO

[![N|Solid](https://www.bleuio.com/getting_started//img/logo.png)](https://www.bleuio.com/getting_started//img/logo.png)

Nodejs Library for BleuIO . Supports **v2.1.1 Firmware**

# Requirments

- [BleuIO](https://www.bleuio.com/)

### Installation

Install the library by running

```sh
npm i bleuio-nodejs-library
```

In the js file, import

```sh

import { bleuIO } from "bleuio-nodejs-library/bleuIO-nodejs-library/index.js";

```

You are set to go.

### Basic Usage

connect to bleuio dongle using following command.

```sh
portUtils = bleuIO("/dev/cu.usbmodem4048FDE6EBCB1");
```

here /dev/cu.usbmodem4048FDE6EBCB1 is the path of the BleuIO dongle that is connected to the computer.
to get the path simply run the following command on your terminal.

```sh
ls /dev/cu.*
```

#### Write to dongle

The following command ATI will request for device information of the dongle.

```sh
portUtils.writeData("ATI")
```

#### Read from dongle

readData method returns a promise and it will read incoming data from the dongle.

```sh
portUtils.readData().then((data) => {
        console.log("Data read from serial port:", data);
    });
```

Waiting time can also be added if required.

```sh
portUtils.readData().then((data) => {
      setTimeout(() => {
        console.log("Data read from serial port:", data);
      }, 3000);
    });
```

#### Example of scannign nearby device command

In this example we first set the dongle into central role. Then we will scan for 3 seconds. After 3 seconds waiting time , we read the data.

```sh
portUtils.writeData("AT+CENTRAL").then(() => {
  portUtils.writeData("AT+GAPSCAN=3").then(() => {
    portUtils.readData().then((data) => {
      setTimeout(() => {
        console.log("Data read from serial port:", data);
      }, 3000);
    });
  });
});
```

###Example

Full code to connect to the dongle, set the dongle to central role, scan for nearby devices and finally show the list of devices.

**_script.js_**

```sh
import { bleuIO } from "bleuio-nodejs-library/bleuIO-nodejs-library/index.js";
const portUtils = bleuIO("/dev/cu.usbmodem4048FDE6EBCB1");
portUtils.writeData("AT+CENTRAL").then(() => {
  portUtils.writeData("AT+GAPSCAN=2").then(() => {
    portUtils.readData().then((data) => {
      setTimeout(() => {
        console.log("Data read from serial port:", data);
      }, 3000);
    });
  });
});


```

### Available functions

Available AT commands can be found at
https://www.bleuio.com/getting_started/docs/commands/

**Enjoy !**

## License

MIT
