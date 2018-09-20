const path = require('path');
const ConcatScss = require('@thenja/concat-scss');

const COMPONENT_NAME = 'thenja-login-form';
const rootDir = path.join(__dirname, '..');
const scssFilePath = path.join(rootDir, 'src', 'assets', 'scss', 'index.scss');
const scssOutputPath = path.join(rootDir, 'dist', COMPONENT_NAME + '.scss');

const concatScss = new ConcatScss();
const options = {
  src: scssFilePath,
  dest: scssOutputPath,
  rootDir: rootDir,
  outputCss: true,
  removeImports: [
    "~bootstrap/scss/bootstrap.scss"
  ]
};

concatScss.concat(options)
.then((result) => {
  process.exit();
}).catch((err) => {
  throw err;
});