const { SerialPort } = require("serialport");

const bleuIO = (portPath) => {
  let readDataArray = [];
  const port = new SerialPort({
    path: portPath,
    baudRate: 115200,
    dataBits: 8,
    parity: "none",
    stopBits: 1,
  });

  const writeData = async (cmd) => {
    port.on("open", () => {
      port.write(cmd + "\r\n", (err) => {
        if (err) {
          return console.log("Error writing data: ", err.message);
        } else {
          return console.log(cmd + " command written");
        }
      });
    });
  };

  const readData = () => {
    return new Promise(function (resolve, reject) {
      port.on("readable", () => {
        let data = port.read();
        let enc = new TextDecoder();
        let arr = new Uint8Array(data);
        arr = enc.decode(arr);
        let removeRn = arr.replace(/\r?\n|\r/gm, "");
        if (removeRn != null) readDataArray.push(removeRn);
        return resolve(readDataArray);
      });
    });
  };

  return {
    writeData,
    readData,
  };
};

module.exports = { bleuIO };
