const fs = require('fs');
const signer = require('node-signpdf');

/*
https://www.npmjs.com/package/node-signpdf
https://github.com/Hopding/pdf-lib/issues/112
https://riptutorial.com/pdf/example/18525/the-signed-byte-range
https://www.adobe.com/devnet-docs/etk_deprecated/tools/DigSig/Acrobat_DigitalSignatures_in_PDF.pdf
openssl pkcs12 -export -inkey p.pem -in cert.pem -out cert_key.p12
*/
const case1 = async () => {
  const {
    PDFDocument,
    PDFName,
    PDFNumber,
    PDFHexString,
    PDFString,
    // eslint-disable-next-line global-require
  } = require('pdf-lib');

  // eslint-disable-next-line global-require
  const PDFArrayCustom = require('./PDFArrayCustom');

  // The PDF we're going to sign
  const pdfBuffer = fs.readFileSync('./unsigned.pdf');

  // The p12 certificate we're going to sign with
  const p12Buffer = fs.readFileSync('./cert_key.p12');

  // This length can be derived from the following `node-signpdf` error message:
  //   ./node_modules/node-signpdf/dist/signpdf.js:155:19
  const SIGNATURE_LENGTH = 10130;

  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pages = pdfDoc.getPages();

  const ByteRange = PDFArrayCustom.withContext(pdfDoc.context);
  ByteRange.push(PDFNumber.of(0));
  ByteRange.push(PDFName.of(signer.DEFAULT_BYTE_RANGE_PLACEHOLDER));
  ByteRange.push(PDFName.of(signer.DEFAULT_BYTE_RANGE_PLACEHOLDER));
  ByteRange.push(PDFName.of(signer.DEFAULT_BYTE_RANGE_PLACEHOLDER));

  const signatureDict = pdfDoc.context.obj({
    Type: 'Sig',
    Filter: 'Adobe.PPKLite',
    SubFilter: 'adbe.pkcs7.detached',
    ByteRange,
    Contents: PDFHexString.of('A'.repeat(SIGNATURE_LENGTH)),
    Reason: PDFString.of('We need your signature for reasons...'),
    M: PDFString.fromDate(new Date()),
  });
  const signatureDictRef = pdfDoc.context.register(signatureDict);

  const widgetDict = pdfDoc.context.obj({
    Type: 'Annot',
    Subtype: 'Widget',
    FT: 'Sig',
    Rect: [0, 0, 0, 0],
    V: signatureDictRef,
    T: PDFString.of('Signature1'),
    F: 4,
    P: pages[0].ref,
  });
  const widgetDictRef = pdfDoc.context.register(widgetDict);

  // Add our signature widget to the first page
  pages[0].node.set(PDFName.of('Annots'), pdfDoc.context.obj([widgetDictRef]));

  // Create an AcroForm object containing our signature widget
  pdfDoc.catalog.set(
    PDFName.of('AcroForm'),
    pdfDoc.context.obj({
      SigFlags: 3,
      Fields: [widgetDictRef],
    }),
  );

  const modifiedPdfBytes = await pdfDoc.save({ useObjectStreams: false });
  const modifiedPdfBuffer = Buffer.from(modifiedPdfBytes);

  const signObj = new signer.SignPdf();
  const signedPdfBuffer = signObj.sign(modifiedPdfBuffer, p12Buffer, {
    passphrase: 'debut',
  });

  // Write the signed file
  fs.writeFileSync('./signed.pdf', signedPdfBuffer);
};

const case2 = () => {
  let pdfBuffer = fs.readFileSync('unsigned.pdf');
  pdfBuffer = signer.plainAddPlaceholder({
    pdfBuffer,
    reason: 'We need your signature for reasons...',
    signatureLength: 8000,
  });
  const p12Buffer = fs.readFileSync('cert_key.p12');
  const signObj = new signer.SignPdf();
  pdfBuffer = signObj.sign(pdfBuffer, p12Buffer, {
    passphrase: 'debut',
  });
  fs.writeFileSync('signed.pdf', pdfBuffer);
};

case1();
// case2();
