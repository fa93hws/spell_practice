const path = require('path');
const fs = require('fs-extra');
const DtsCreator = require('typed-css-modules');
const { exec } = require('child_process');

function collectFileInFolder(folder, matcher, files) {
  fs.readdirSync(folder).forEach(f => {
    const name = folder + path.sep + f;
    const stat = fs.lstatSync(name);
    if (stat.isDirectory())
      collectFileInFolder(name, matcher, files);
    else if (name.match(matcher))
      files.push(name);
  });
}

const buildCss = () => new Promise((resolve, reject) => {
  exec('less-watch-compiler --run-once src/ src/', (err, stdout, stderr) => {
    if (err)
      reject(err)
    else
      resolve();
  });
})

function buildTypes() {
  const creator = new DtsCreator({
    camelCase: true
  });
  let files = [];
  collectFileInFolder('src', /.css$/, files);
  files.forEach(f => {
    creator.create(f).then(content => {
      let filePath = '';
      if (content.outputFilePath.match(/\/icon-font.css.d.ts$/))
        filePath = content.outputFilePath;
      else
        filePath = content.outputFilePath.replace(/.css.d.ts$/, '.less.d.ts');
      fs.writeFileSync(filePath, content.formatted);
    })
  });
}

function clean() {
  const files = [];
  collectFileInFolder('src', /.(css|css.d.ts|less.d.ts)$/, files);
  files.filter(f => !f.match(/\/icon-font.css$/))
  .forEach(fs.unlinkSync);
}

clean();
buildCss().then(() => {
  buildTypes();
  clean();
});
