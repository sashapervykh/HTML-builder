const fs = require('fs');
const path = require('path');

let wayToStyles = path.join(__dirname, 'styles');

let str = '';
const wayToBundle = path.join(__dirname, 'project-dist', 'bundle.css');
const outputStream = fs.createWriteStream(`${wayToBundle}`);

fs.readdir(`${wayToStyles}`, { withFileTypes: true }, (err, data) => {
  data.forEach((file) => {
    let wayToFile = path.join(__dirname, 'styles', `${file.name}`);
    let extensionWithDot = path.extname(`${wayToFile}`);
    if (file.isFile() && extensionWithDot === '.css') {
      fs.readFile(`${wayToFile}`, (err, data) => {
        str += data.toString();
        outputStream.write(str);
      });
    }
  });
});
