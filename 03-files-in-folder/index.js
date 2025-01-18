const fs = require('fs');
const path = require('path');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      console.log(err);
    }
    for (const file of files) {
      if (file.isFile()) {
        fs.stat(
          path.join(__dirname, 'secret-folder', file.name),
          (err, data) => {
            if (err) {
              console.log(err);
            }

            const pathToFile = path.join(__dirname, 'secret-folder', file.name);
            const fileSize = data.size;
            const fileExt = path.extname(pathToFile);
            const fileName = path.basename(pathToFile, fileExt);
            const fileLine =
              fileName + ' - ' + fileExt.slice(1) + ' - ' + fileSize + 'B';
            console.log(fileLine);
          },
        );
      }
    }
  },
);
