// https://github.com/walling/unorm
// https://fkkmemi.github.io/npm/npm-unorm/
const unorm = require('unorm');

const text = 'The \u212B symbol invented by A. J. \u00C5ngstr\u00F6m '
    + '(1814, L\u00F6gd\u00F6, \u2013 1874) denotes the length '
    + '10\u207B\u00B9\u2070 m.';

const combining = /[\u0300-\u036F]/g; // Use XRegExp('\\p{M}', 'g'); see example.js.

console.log(`Regular:  ${text}`);
console.log(`NFC:      ${unorm.nfc(text)}`);
console.log(`NFD:      ${unorm.nfd(text)}`);
console.log(`NFKC:     ${unorm.nfkc(text)}`);
console.log(`NFKD: *   ${unorm.nfkd(text).replace(combining, '')}`);
console.log(' * = Combining characters removed from decomposed form.');

const orgText = '한글1';
const breakedText = unorm.nfd(orgText);
console.log(`Regular:      ${orgText}`);
console.log(`NFD:      ${breakedText}`);
console.log(`NFC:      ${unorm.nfc(breakedText)}`);
console.log(`NFKC:      ${unorm.nfkc(breakedText)}`);
