// npm install node-qpdf
const express = require('express');
const qpdf = require('node-qpdf');

// case1: 커맨드에서 암호화된 pdf생성

const options = {
  keyLength: 128,
  password: '1234test',
  restrictions: {
    useAes: 'y'
  },
  outputFile: 'a4-enc.pdf',
};
qpdf.encrypt('a4.pdf', options);


// case2: 웹에서 패스워드 입력받고 암호화된 pdf생성
// const app = express();
//
// // router start *****
// const router = express.Router();
// router.get('/:password', async (req, res) => {
//   try {
//     const options = {
//       keyLength: 256,
//     };
//     options.password = req.params.password;
//     const doc = qpdf.encrypt('a4.pdf', options);
//     doc.pipe(res);
//
//     res.writeHead(200, {
//       'Content-Type': 'application/pdf',
//       'Access-Control-Allow-Origin': '*',
//       'Content-Disposition': 'inline; filename=order.pdf',
//     });
//   } catch (error) {
//     res.status(error.status || 500).json({
//       StatusCode: error.status || 500,
//       ExecutedVersion: '$LATEST',
//       Payload: JSON.stringify({ error: error.message }),
//     });
//   }
// });
// // router end *****
// app.use('/', router);
//
// const port = '9000';
// app.listen(port, '0.0.0.0', () => {
//   console.info('start');
// });
