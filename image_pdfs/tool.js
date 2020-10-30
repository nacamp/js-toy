const path = require('path');
const gm = require('gm');
// const sharp = require('sharp');

const getInfo = async (filepath) => new Promise((resolve, reject) => {
  gm(filepath).identify((err, value) => {
    if (err) {
      reject(err);
    } else {
      resolve(value);
    }
  });
});

// const getImageMediaInfo = async (filepath) => new Promise((resolve, reject) => {
//   sharp(filepath)
//     .metadata()
//     .then((data) => {
//       resolve(data);
//     })
//     .catch((err) => {
//       reject(err);
//     });
// });

module.exports = {
  getInfo,
};
// https://github.com/alixaxel/chrome-aws-lambda
