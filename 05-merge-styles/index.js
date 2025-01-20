const fs = require('fs');
const path = require('path');

let wayToStyles = path.join(__dirname, 'styles');

let str = '';

fs.readdir(`${wayToStyles}`, { withFileTypes: true }, (err, data) => {
  if (err) throw new Error(err);

  data.forEach((file) => {
    let wayToFile = path.join(__dirname, 'styles', `${file.name}`);
    let extensionWithDot = path.extname(`${wayToFile}`);
    if (file.isFile() && extensionWithDot === '.css') {
      fs.readFile(`${wayToFile}`, (err, data) => {
        str += data.toString();
        const wayToBundle = path.join(__dirname, 'project-dist', 'bundle.css');
        const outputStream = fs.createWriteStream(`${wayToBundle}`);
        outputStream.write(str);
      });
    }
  });
});
