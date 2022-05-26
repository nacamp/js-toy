const http = require('http');
const url = require('url');

http.createServer((req, res) => {
  const chunks = [];
  console.log('url:', url.parse(req.url, true).path);
  return req.on('error', (err) => {
    console.error(err);
  }).on('data', (data) => {
    chunks.push(data);
  }).on('end', () => {
    // eslint-disable-next-line no-undef
    const body = Buffer.concat(chunks).toString('utf8');
    if (body.length > 0) {
      console.log('  body:', body);
    }
    res.on('error', (err) => {
      console.log(err);
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    // res.write('echo\n');
    res.end('end\n');
  });
}).listen(3000);
// https://nodejs.org/ko/docs/guides/anatomy-of-an-http-transaction/
// curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:8080/post_url;
