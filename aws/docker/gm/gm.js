console.log('starting function');
const gm = require('gm');

const size = function () {
  return new Promise((resolve, reject) => {
    gm('image.png')
      .size((err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
  });
};
exports.handler = async (event) => ({ msg: await size(), event });
