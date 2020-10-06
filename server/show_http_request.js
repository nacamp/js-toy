const http = require('http');
const url = require('url');
http.createServer((req, res) => {
  const chunks = [];
  console.log('url:',url.parse(req.url, true).path);
  return req.on('error', (err) => {
    console.error(err);
  }).on('data', (data) => {
    chunks.push(data);
  }).on('end', () => {
    const body = Buffer.concat(chunks).toString('utf8');
    if( body.length > 0 ){
      console.log('body:', body);
    }
    res.on('error', (err) => {
      console.log(err);
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('echo\n');
    res.end('end');
  });
}).listen(8080);
