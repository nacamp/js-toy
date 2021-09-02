/*
# Any requests to decode a PDF will be ignored.
# https://gist.github.com/averagesecurityguy/ba8d9ed3c59c1deffbd1390dafa5a3c2
import re
import zlib

pdf = open("/Users/jimmy/WebstormProjects/js-toy/pdfs/output.pdf", "rb").read()
stream = re.compile(rb'.*?FlateDecode.*?stream(.*?)endstream', re.S)

for s in stream.findall(pdf):
    s = s.strip(b'\r\n')
    try:
        print(zlib.decompress(s))
        print("")
    except:
        pass
 */

const fs = require('fs');
const zlib = require('zlib');

// https://stackoverflow.com/questions/14551608/list-of-encodings-that-node-js-supports
const pdfBuffer = fs.readFileSync('./output2.pdf', 'binary');
const regexp = new RegExp(/.*?FlateDecode.*?stream(.*?)endstream/, 's');
const result = regexp.exec(pdfBuffer);
const buffer = Buffer.from(result[1].trim(), 'binary');
// https://stackoverflow.com/questions/7625251/compression-and-decompression-of-data-using-zlib-in-nodejs
console.log(zlib.inflateSync(buffer).toString());
const arr = [];
// Tf[<6e6f64652d7369676e706466> 0] TJ
for (const i of [0x6e, 0x6f, 0x64, 0x65, 0x2d, 0x73, 0x69, 0x67, 0x6e, 0x70, 0x64, 0x66]) {
  arr.push(String.fromCharCode(i));
}
console.log(arr.join(''));
