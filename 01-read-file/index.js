const path = require('path');
const fs = require('fs');

let wayToText = path.join(__dirname, 'text.txt');
let inputStream = fs.createReadStream(`${wayToText}`, 'utf-8');
inputStream.pipe(process.stdout);
