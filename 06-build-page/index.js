const fs = require('fs');
const path = require('path');

let wayToStyles = path.join(__dirname, 'styles');

let str = '';
const wayToBundleCSS = path.join(__dirname, 'project-dist', 'style.css');
let wayToFinalFolder = path.join(__dirname, 'project-dist');

fs.mkdir(`${wayToFinalFolder}`, { recursive: true }, (error) => {
  fs.readdir(`${wayToStyles}`, { withFileTypes: true }, (err, data) => {
    data.forEach((file) => {
      let wayToFile = path.join(__dirname, 'styles', `${file.name}`);
      let extensionWithDot = path.extname(`${wayToFile}`);

      if (file.isFile() && extensionWithDot === '.css') {
        fs.readFile(`${wayToFile}`, (err, data) => {
          str += data.toString();
          const outputStream = fs.createWriteStream(`${wayToBundleCSS}`);
          outputStream.write(str);
        });
      }
    });
  });

  let wayToOriginalFonts = path.join(__dirname, 'assets', 'fonts');
  let wayToOriginalImg = path.join(__dirname, 'assets', 'img');
  let wayToOriginalSvg = path.join(__dirname, 'assets', 'svg');
  let wayToFonts = path.join(__dirname, 'project-dist', 'assets', 'fonts');
  let wayToImg = path.join(__dirname, 'project-dist', 'assets', 'img');
  let wayToSvg = path.join(__dirname, 'project-dist', 'assets', 'svg');
  let wayToAssets = path.join(__dirname, 'project-dist', 'assets');

  fs.mkdir(`${wayToAssets}`, { recursive: true }, (error) => {
    if (error) {
      throw error;
    }

    fs.mkdir(`${wayToFonts}`, { recursive: true }, (error) => {
      fs.readdir(`${wayToFonts}`, { withFileTypes: true }, (err, data) => {
        data.forEach((file) => {
          let wayToFile = path.join(
            __dirname,
            'project-dist',
            'assets',
            'fonts',
            `${file.name}`,
          );
          fs.unlink(`${wayToFile}`, (error) => {
            if (error) {
              throw error;
            }
          });
        });
      });

      fs.readdir(
        `${wayToOriginalFonts}`,
        { withFileTypes: true },
        (err, data) => {
          data.forEach((file) => {
            let wayToInitialFile = path.join(
              __dirname,
              'assets',
              'fonts',
              `${file.name}`,
            );
            let wayToFileCopy = path.join(
              __dirname,
              'project-dist',
              'assets',
              'fonts',
              `${file.name}`,
            );
            fs.copyFile(`${wayToInitialFile}`, `${wayToFileCopy}`, (error) => {
              if (error) {
                throw error;
              }
            });
          });
        },
      );
    });

    fs.mkdir(`${wayToImg}`, { recursive: true }, (error) => {
      fs.readdir(`${wayToImg}`, { withFileTypes: true }, (err, data) => {
        data.forEach((file) => {
          let wayToFile = path.join(
            __dirname,
            'project-dist',
            'assets',
            'img',
            `${file.name}`,
          );
          fs.unlink(`${wayToFile}`, (error) => {
            if (error) {
              throw error;
            }
          });
        });
      });

      fs.readdir(
        `${wayToOriginalImg}`,
        { withFileTypes: true },
        (err, data) => {
          data.forEach((file) => {
            let wayToInitialFile = path.join(
              __dirname,
              'assets',
              'img',
              `${file.name}`,
            );
            let wayToFileCopy = path.join(
              __dirname,
              'project-dist',
              'assets',
              'img',
              `${file.name}`,
            );
            fs.copyFile(`${wayToInitialFile}`, `${wayToFileCopy}`, (error) => {
              if (error) {
                throw error;
              }
            });
          });
        },
      );
    });

    fs.mkdir(`${wayToSvg}`, { recursive: true }, (error) => {
      fs.readdir(`${wayToSvg}`, { withFileTypes: true }, (err, data) => {
        data.forEach((file) => {
          let wayToFile = path.join(
            __dirname,
            'project-dist',
            'assets',
            'svg',
            `${file.name}`,
          );
          fs.unlink(`${wayToFile}`, (error) => {
            if (error) {
              throw error;
            }
          });
        });
      });

      fs.readdir(
        `${wayToOriginalSvg}`,
        { withFileTypes: true },
        (err, data) => {
          data.forEach((file) => {
            let wayToInitialFile = path.join(
              __dirname,
              'assets',
              'svg',
              `${file.name}`,
            );
            let wayToFileCopy = path.join(
              __dirname,
              'project-dist',
              'assets',
              'svg',
              `${file.name}`,
            );
            fs.copyFile(`${wayToInitialFile}`, `${wayToFileCopy}`, (error) => {
              if (error) {
                throw error;
              }
            });
          });
        },
      );
    });
  });

  let wayToTemplate = path.join(__dirname, 'template.html');

  fs.readFile(`${wayToTemplate}`, (err, data) => {
    let str = data.toString();
    let strCopy = data.toString();
    let arrayOfTags = [];
    let number = 0;

    while (strCopy.indexOf('{') != -1) {
      let tagStart = strCopy.indexOf('{');
      let tagEnd = strCopy.indexOf('}') + 1;
      let tagName = strCopy.substring(tagStart + 2, tagEnd - 1);

      arrayOfTags[number] = tagName;
      number++;
      index = strCopy.indexOf('}') + 2;
      strCopy = strCopy.substring(index);
    }

    for (let tag of arrayOfTags) {
      let wayToComponent = path.join(
        __dirname,
        'components',
        `${tag + '.html'}`,
      );

      fs.readFile(`${wayToComponent}`, (err2, text) => {
        let code = text.toString();
        str = str.replace('{{' + `${tag}` + '}}', code);

        let wayToIndex = path.join(__dirname, 'project-dist', 'index.html');
        const outputStream = fs.createWriteStream(`${wayToIndex}`);
        outputStream.write(str);
      });
    }
  });
});
