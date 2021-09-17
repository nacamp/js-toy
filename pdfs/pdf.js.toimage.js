// https://github.com/mozilla/pdf.js/blob/master/examples/node/pdf2png/pdf2png.js
const Canvas = require('canvas');
const assert = require('assert').strict;
const fs = require('fs');

function NodeCanvasFactory() {}
NodeCanvasFactory.prototype = {
  // eslint-disable-next-line camelcase
  create: function NodeCanvasFactory_create(width, height) {
    assert(width > 0 && height > 0, 'Invalid canvas size');
    const canvas = Canvas.createCanvas(width, height);
    const context = canvas.getContext('2d');
    return {
      canvas,
      context,
    };
  },

  // eslint-disable-next-line camelcase
  reset: function NodeCanvasFactory_reset(canvasAndContext, width, height) {
    assert(canvasAndContext.canvas, 'Canvas is not specified');
    assert(width > 0 && height > 0, 'Invalid canvas size');
    // eslint-disable-next-line no-param-reassign
    canvasAndContext.canvas.width = width;
    // eslint-disable-next-line no-param-reassign
    canvasAndContext.canvas.height = height;
  },

  // eslint-disable-next-line camelcase
  destroy: function NodeCanvasFactory_destroy(canvasAndContext) {
    assert(canvasAndContext.canvas, 'Canvas is not specified');

    // Zeroing the width and height cause Firefox to release graphics
    // resources immediately, which can greatly reduce memory consumption.
    // eslint-disable-next-line no-param-reassign
    canvasAndContext.canvas.width = 0;
    // eslint-disable-next-line no-param-reassign
    canvasAndContext.canvas.height = 0;
    // eslint-disable-next-line no-param-reassign
    canvasAndContext.canvas = null;
    // eslint-disable-next-line no-param-reassign
    canvasAndContext.context = null;
  },
};

const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
// eslint-disable-next-line no-unused-vars
const pdfjsWorker = require('pdfjs-dist/build/pdf.worker');

const convert = async (inputFileName, outputFileName, width) => {
  // Some PDFs need external cmaps.
  const CMAP_URL = '../node_modules/pdfjs-dist/cmaps/';
  const CMAP_PACKED = true;

  // Where the standard fonts are located.
  const STANDARD_FONT_DATA_URL = '../node_modules/pdfjs-dist/standard_fonts/';

  // Loading file from file system into typed array.
  const pdfPath = inputFileName;
  const data = new Uint8Array(fs.readFileSync(pdfPath));

  // Load the PDF file.
  const loadingTask = pdfjsLib.getDocument({
    data,
    cMapUrl: CMAP_URL,
    cMapPacked: CMAP_PACKED,
    standardFontDataUrl: STANDARD_FONT_DATA_URL,
  });

  const pdfDocument = await loadingTask.promise;
  const { numPages } = pdfDocument;
  console.log(`Number of Pages: ${numPages}`);
  // TODO: Promise.all or await을 사용해서 동기화 해야 한다.
  for (let i = 1; i <= numPages; i++) {
    pdfDocument.getPage(i).then((page) => {
      // Render the page on a Node canvas with 100% scale.
      let viewport = page.getViewport({ scale: 1.0 });
      console.log(`Original Size: ${viewport.width}x${viewport.height}`);
      viewport = page.getViewport({ scale: width / viewport.width });
      console.log(`Transfered Size: ${viewport.width}x${viewport.height}`);
      const canvasFactory = new NodeCanvasFactory();
      const canvasAndContext = canvasFactory.create(
        viewport.width,
        viewport.height,
      );
      const renderContext = {
        canvasContext: canvasAndContext.context,
        viewport,
        canvasFactory,
      };

      const renderTask = page.render(renderContext);
      renderTask.promise.then(() => {
        // Convert the canvas to an image buffer.
        const image = canvasAndContext.canvas.toBuffer();
        fs.writeFile(`${i}-${outputFileName}`, image, (error) => {
          if (error) {
            console.error(`Error: ${error}`);
          } else {
            console.log(
              `Finished converting ${i} page of PDF file to a PNG image.`,
            );
          }
        });
      });
    });
  }
};
convert('프리랜서2장.pdf', 'page.png', 1240);
