const { Console } = require('console');
const fs = require('fs');
const path = require('path');

let wayToSecretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(`${wayToSecretFolder}`, { withFileTypes: true }, (err, data) => {
  data.forEach((file) => {
    if (file.isFile()) {
      let wayToFile = path.join(__dirname, 'secret-folder', `${file.name}`);
      let extensionWithDot = path.extname(`${wayToFile}`);
      let extension = extensionWithDot.slice(1);
      let lastDot = file.name.lastIndexOf('.');
      let nameOfFile;
      if (lastDot === -1) {
        nameOfFile = file.name;
      } else {
        nameOfFile = file.name.slice(0, lastDot);
      }
      let outputInfo = nameOfFile + ' - ' + extension + ' - ';
      fs.stat(`${wayToFile}`, (err, stats) => {
        outputInfo = outputInfo + stats.size + 'b';
        console.log(outputInfo);
      });
    }
  });
});
