const express = require('express');
const createError = require('http-errors');
const YAML = require('yaml');
const fs = require('fs');
const dockerLambda = require('./dockerLambda');
require('dotenv').config();

const file = fs.readFileSync('./lambdas.yml', 'utf8');
const lambdas = YAML.parse(file);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/favicon.ico', (req, res) => res.status(204));

// router start *****
const router = express.Router();
router.post('/', async (req, res) => {
  try {
    if (!lambdas[req.body.FunctionName]) {
      throw createError(404, 'Not Found');
    }
    let layerDir = '';
    if (lambdas[req.body.FunctionName].layer) {
      layerDir = `${process.env.LAYER_DIR}/${lambdas[req.body.FunctionName].layer}`;
    }
    const taskDir = `${process.env.TASK_DIR}/${req.body.FunctionName}`;
    const handler = `${lambdas[req.body.FunctionName].handler}`;

    const lambdaCallbackResult = dockerLambda({
      event: JSON.parse(req.body.Payload), layerDir, taskDir, handler, dockerArgs: ['-m', '1.5G'], dockerImage: 'lambci/lambda:nodejs12.x',
    });
    console.log(lambdaCallbackResult);

    res.json({
      StatusCode: 200,
      ExecutedVersion: '$LATEST',
      Payload: JSON.stringify(lambdaCallbackResult),
    });
  } catch (error) {
    res.status(error.status || 500).json({
      StatusCode: error.status || 500,
      ExecutedVersion: '$LATEST',
      Payload: JSON.stringify({ error: error.message }),
    });
  }
});
// router end *****
app.use('/', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  if (error.status !== 404) {
    console.error(error.stack);
  }

  res.status(error.status || 500).json({
    result_code: error.status || 500,
    error: error.message,
  });
});

// running server using IP4
const port = '9000';
app.listen(port, '0.0.0.0', () => {
  console.info('start');
  console.info('lambda list:', lambdas);
});

module.exports = app;

/*
// test using curl
curl -d '{"FunctionName":"index", "Payload": "{\"key\":\"value\"}"}' \
-H "Content-Type: application/json" \
-X POST http://localhost:9000/

curl -d '{"FunctionName":"gm", "Payload": "{\"key\":\"value\"}"}' \
-H "Content-Type: application/json" \
-X POST http://localhost:9000/

// lambda return format
{
  "StatusCode": 200,
  "ExecutedVersion": "$LATEST",
  "Payload": "{\"key\":\"value\"}"
}
*/
