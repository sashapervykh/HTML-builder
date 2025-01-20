const fs = require('fs');
const path = require('path');

let wayToInitialFolder = path.join(__dirname, 'files');
let wayToCopyFolder = path.join(__dirname, 'files-copy');

fs.mkdir(`${wayToCopyFolder}`, { recursive: true }, (error) => {
  if (error) {
    throw error;
  }
  fs.readdir(`${wayToCopyFolder}`, { withFileTypes: true }, (err, data) => {
    data.forEach((file) => {
      let wayToFile = path.join(__dirname, 'files-copy', `${file.name}`);
      fs.unlink(`${wayToFile}`, (error) => {
        if (error) {
          throw error;
        }
      });
    });
  });

  fs.readdir(`${wayToInitialFolder}`, { withFileTypes: true }, (err, data) => {
    data.forEach((file) => {
      let wayToInitialFile = path.join(__dirname, 'files', `${file.name}`);
      let wayToFileCopy = path.join(__dirname, 'files-copy', `${file.name}`);
      fs.copyFile(`${wayToInitialFile}`, `${wayToFileCopy}`, (error) => {
        if (error) {
          throw error;
        }
      });
    });
  });
});
