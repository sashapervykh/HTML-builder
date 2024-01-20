const fs = require('fs');
const path = require('path');

let wayToText = path.join(__dirname, 'text.txt');
const outputStream = fs.createWriteStream(`${wayToText}`);

console.log('Hello! Please enter your data:');

const { stdin } = process;

stdin.on('data', (data) => {
  if (data.indexOf('exit') === -1) {
    outputStream.write(data);
  } else {
    process.exit();
  }
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => {
  console.log('Thank you. Process is ended');
});
