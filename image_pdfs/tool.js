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

module.exports = {
  getInfo,
};
