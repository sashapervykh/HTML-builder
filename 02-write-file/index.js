const fs = require('fs');
const path = require('path');

const { stdin, stdout } = process;

const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Hello! Enter your message: \n');

stdin.on('data', (data) => {
  const stringifiedData = data.toString();
  if (stringifiedData.indexOf('exit') !== -1) {
    process.exit();
  } else {
    stream.write(data);
  }
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => {
  stdout.write('The program is finished.\n');
});
