// https://www.daleseo.com/js-node-es-modules/
// https://stackoverflow.com/questions/48433783/referenceerror-fetch-is-not-defined
// https://pdf-lib.js.org
/*
db.formItemsValue.find({"_receiverId" : 635})
db.formItems.find({"_formMasterId" : "60f7dc7bd030acead36e2ad2"})
db.formSub.find({"_formMasterId" : "60f7dc7bd030acead36e2ad2"})
width 595, height 842
width 1240,height 1754
*/
// import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
const {
  degrees, PDFDocument, rgb, StandardFonts, PDFName, PDFString,
} = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');
const fs = require('fs');
const sizeOf = require('image-size');

const createPageLinkAnnotation = (page, uri) => page.doc.context.register(
  page.doc.context.obj({
    Type: 'Annot',
    Subtype: 'Link',
    // Rect: [0, 30, 40, 230],
    Rect: [0, 60, 70, 20],
    Border: [0, 0, 2],
    C: [0, 0, 1],
    A: {
      Type: 'Action',
      S: 'URI',
      URI: PDFString.of(uri),
    },
  }),
);

const text1Prop = {
  _formMasterId: '60f7dc7bd030acead36e2ad2',
  width: 120,
  groupNum: '1',
  nameIndex: 1,
  height: 35,
  name: '텍스트1',
  visible: true,
  properties: {
    fontSize: 16,
    fontFamily: 'Nanum Gothic, Malgun Gothic, ‘맑은 고딕’, AppleSDGothicNeo, sans-serif',
    desc: '',
    textAlign: 'left',
    fontColor: {
      r: 0,
      g: 0,
      b: 0,
    },
  },
  x: 376,
  _formSubId: '60f7dc82d030acead36e2ad3',
  y: 284,
  type: 'TEXT',
};

const text2Prop = {
  _formMasterId: '60f7dc7bd030acead36e2ad2',
  width: 450,
  groupNum: '1',
  nameIndex: 1,
  height: 35,
  name: '주소1',
  visible: true,
  properties: {
    fontSize: 14,
    fontFamily: 'Nanum Gothic, Malgun Gothic, ‘맑은 고딕’, AppleSDGothicNeo, sans-serif',
    desc: '',
    textAlign: 'left',
    fontColor: {
      r: 0,
      g: 0,
      b: 0,
    },
  },
  x: 377,
  _formSubId: '60f7dc82d030acead36e2ad3',
  y: 353,
  type: 'ADDRESS',
};

const text3Prop = {
  _formMasterId: '60f7dc7bd030acead36e2ad2',
  width: 120,
  groupNum: '1',
  nameIndex: 1,
  height: 35,
  name: '숫자1',
  visible: true,
  properties: {
    numberComma: 'Y',
    fontSize: 16,
    fontFamily: 'Nanum Gothic, Malgun Gothic, ‘맑은 고딕’, AppleSDGothicNeo, sans-serif',
    desc: '',
    textAlign: 'right',
    fontColor: {
      r: 0,
      g: 0,
      b: 0,
    },
  },
  x: 101,
  _formSubId: '60f7dc82d030acead36e2ad3',
  y: 469,
  type: 'NUMBER',
};

const text4Prop = {
  _formMasterId: '60f7dc7bd030acead36e2ad2',
  width: 120,
  groupNum: '1',
  nameIndex: 1,
  height: 35,
  name: '날짜1',
  visible: true,
  properties: {
    fontSize: 16,
    fontFamily: 'Nanum Gothic, Malgun Gothic, ‘맑은 고딕’, AppleSDGothicNeo, sans-serif',
    desc: '',
    textAlign: 'left',
    fontColor: {
      r: 0,
      g: 0,
      b: 0,
    },
  },
  x: 234,
  _formSubId: '60f7dc82d030acead36e2ad3',
  y: 771,
  type: 'DATE',

};

const image1Prop = {
  _formMasterId: '60f7dc7bd030acead36e2ad2',
  width: 216,
  groupNum: '1',
  nameIndex: 1,
  height: 147,
  name: '이미지1',
  visible: true,
  properties: {

  },
  x: 901,
  _formSubId: '60f7dc82d030acead36e2ad3',
  y: 248,
  type: 'IMAGE',
};

const radio1Prop = {
  _id: '6102376b520f4e2857000007',
  _formMasterId: '610236e7fc2924e5e8f4bcec',
  width: 100,
  groupNum: '1',
  nameIndex: 3,
  height: 50,
  name: '체크3',
  visible: true,
  properties: {
    boxType: 'RADIO',
    fieldCanSelectCount: 1,
    fieldCanSelectType: 'M',
    list: [
      {
        _id: 'c8e02ec0-f02a-11eb-a4d4-47423d28a51b',
        x: 180,
        y: 507,
        width: 20,
        height: 20,
        name: '체크박스1',
      },
      {
        x: 240,
        y: 507,
        width: 20,
        height: 20,
        _id: 'e8a34940-f02a-11eb-a4d4-47423d28a51b',
        name: '체크박스2',
      },
      {
        x: 300,
        y: 507,
        width: 20,
        height: 20,
        _id: 'e8f38c20-f02a-11eb-a4d4-47423d28a51b',
        name: '체크박스3',
      },
    ],
  },
  _formSubId: '610236f5fc2924e5e8f4bced',
  type: 'CHECKBOX',
};

const checkbox1Prop = {
  _id: '61023759520f4e2857000005',
  _formMasterId: '610236e7fc2924e5e8f4bcec',
  width: 100,
  groupNum: '1',
  nameIndex: 1,
  height: 50,
  name: '체크1',
  visible: true,
  properties: {
    boxType: 'CHECKBOX',
    fieldCanSelectCount: 1,
    fieldCanSelectType: 'M',
    list: [
      {
        _id: 'be44e190-f02a-11eb-a4d4-47423d28a51b',
        x: 178,
        y: 437,
        width: 20,
        height: 20,
        name: '체크박스1',
      },
      {
        x: 238,
        y: 437,
        width: 20,
        height: 20,
        _id: 'ed9b6950-f02a-11eb-a4d4-47423d28a51b',
        name: '체크박스2',
      },
      {
        x: 298,
        y: 437,
        width: 20,
        height: 20,
        _id: 'edb9c6c0-f02a-11eb-a4d4-47423d28a51b',
        name: '체크박스3',
      },
    ],
  },
  _formSubId: '610236f5fc2924e5e8f4bced',
  type: 'CHECKBOX',
};

function drawItem(page, font, pdfWidth, pdfHeight, imageWidth, imageHeight, prop, value) {
  let deltaX = 0;
  // use at top or bottom align
  console.log('fontSize : ', prop.properties.fontSize, ' height: ', font.heightAtSize(prop.properties.fontSize));
  if (prop.properties.textAlign === 'right') {
    // https://github.com/Hopding/pdf-lib/issues/432
    deltaX = prop.width - font.widthOfTextAtSize(value, prop.properties.fontSize);
    // deltaX = prop.width - (prop.properties.fontSize * String(value).length) / 2;
  }

  page.drawText(value, {
    x: (pdfWidth * (prop.x + deltaX)) / imageWidth,
    // pdf높이 - y좌표 - (입력창높이-폰트크기)
    y: pdfHeight - (pdfHeight * prop.y) / imageHeight - (pdfHeight * (prop.height - prop.properties.fontSize)) / imageHeight,
    size: (pdfWidth * prop.properties.fontSize) / imageWidth,
    font,
    // color: rgb(0.95, 0.1, 0.1),
    // rotate: degrees(-45),
  });
}

async function drawImage(page, doc, pdfWidth, pdfHeight, imageWidth, imageHeight, prop, value) {
  const bytes = new Uint8Array(fs.readFileSync(value));
  const image = await doc.embedPng(bytes);
  const dimensions = sizeOf(value);
  console.log(dimensions.width, dimensions.height);
  let dims;
  if (prop.width > prop.height) {
    dims = image.scale((prop.height) / dimensions.height);
  } else {
    dims = image.scale((prop.width) / dimensions.width);
  }
  page.drawImage(image, {
    x: (pdfWidth * prop.x) / imageWidth,
    y: pdfHeight - (pdfHeight * prop.y) / imageHeight - (pdfHeight * dims.height) / imageHeight,
    // y: pdfHeight - (pdfHeight * prop.y) / imageHeight - (pdfHeight * prop.height) / imageHeight,
    width: (pdfWidth * dims.width) / imageWidth,
    height: (pdfHeight * dims.height) / imageHeight,
    // width: (pdfWidth * prop.width) / imageWidth,
    // height: (pdfHeight * prop.height) / imageHeight,
    opacity: 1,
  });
}

async function drawCheckBox(page, form, pdfWidth, pdfHeight, imageWidth, imageHeight, prop, value) {
  if (prop.properties.boxType === 'RADIO') {
    // eslint-disable-next-line no-underscore-dangle
    const field = form.createRadioGroup(prop._id);
    prop.properties.list.forEach((item) => {
      // eslint-disable-next-line no-underscore-dangle
      field.addOptionToPage(item._id, page, {
        x: (pdfWidth * item.x) / imageWidth,
        y: pdfHeight - (pdfHeight * item.y) / imageHeight
            - (pdfHeight * item.height) / imageHeight,
        width: (pdfWidth * item.width) / imageWidth,
        height: (pdfHeight * item.height) / imageHeight,
        hidden: true,
      });
    });
    // eslint-disable-next-line no-restricted-syntax
    for (const [k, v] of Object.entries(value)) {
      if (v) {
        field.select(k);
      }
    }
  } else {
    prop.properties.list.forEach((item) => {
      // eslint-disable-next-line no-underscore-dangle
      const field = form.createCheckBox(item._id);
      // eslint-disable-next-line no-underscore-dangle
      field.addToPage(page, {
        x: (pdfWidth * item.x) / imageWidth,
        y: pdfHeight - (pdfHeight * item.y) / imageHeight
            - (pdfHeight * item.height) / imageHeight,
        width: (pdfWidth * item.width) / imageWidth,
        height: (pdfHeight * item.height) / imageHeight,
        hidden: true,
      });
      // eslint-disable-next-line no-underscore-dangle
      if (value[item._id]) {
        field.check();
      }
    });
  }
}

async function modifyPdf() {
  const existingPdfBytes = new Uint8Array(fs.readFileSync('프리랜서2장.pdf'));
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);
  const nanum = await pdfDoc.embedFont(fs.readFileSync('NanumSquareRegular.ttf'));

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();
  console.log(width, height);
  const imageWidth = 1240;
  const imageHeight = 1754;

  drawItem(firstPage, nanum, width, height, imageWidth, imageHeight, text1Prop, '계약건명');
  drawItem(firstPage, nanum, width, height, imageWidth, imageHeight, text2Prop, '경기도 가양시 나양구 다양로 111');
  // TODO: 우측정렬인경우 width를 고려해야한다. 중앙정렬은 어떻게...
  drawItem(firstPage, nanum, width, height, imageWidth, imageHeight, text3Prop, '111');
  drawItem(firstPage, nanum, width, height, imageWidth, imageHeight, text4Prop, '2021-07-22');
  await drawImage(firstPage, pdfDoc, width, height, imageWidth, imageHeight, image1Prop, 'twist.png');

  // radio or checkbox
  const form = pdfDoc.getForm();
  drawCheckBox(firstPage, form, width, height, imageWidth, imageHeight, radio1Prop, {
    'c8e02ec0-f02a-11eb-a4d4-47423d28a51b': false,
    'e8a34940-f02a-11eb-a4d4-47423d28a51b': true,
    'e8f38c20-f02a-11eb-a4d4-47423d28a51b': false,
  });
  drawCheckBox(firstPage, form, width, height, imageWidth, imageHeight, checkbox1Prop, {
    'be44e190-f02a-11eb-a4d4-47423d28a51b': true,
    'ed9b6950-f02a-11eb-a4d4-47423d28a51b': false,
    'edb9c6c0-f02a-11eb-a4d4-47423d28a51b': false,
  });
  form.flatten();

  // case: 링크걸기
  // https://github.com/Hopding/pdf-lib/issues/123#issuecomment-568804606
  // https://github.com/Hopding/pdf-lib/issues/555
  firstPage.drawText('링크걸기', {
    x: 23,
    y: 43,
    size: 20,
    font: nanum,
    color: rgb(0.95, 0.1, 0.1),
    // rotate: degrees(90),
  });
  const link = createPageLinkAnnotation(firstPage, 'https://pdf-lib.js.org/');
  firstPage.node.set(PDFName.of('Annots'), pdfDoc.context.obj([link]));

  // case: 백그라운드에 이미지 추가하고 위에 텍스트 추가하가
  const page = pdfDoc.addPage([595, 842]);
  const contractImageBytes = new Uint8Array(fs.readFileSync('contract_img.png'));
  // const jpgImageBytes = await getDataFromFilePromise('image2.jpeg');
  // const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
  const contractImage = await pdfDoc.embedPng(contractImageBytes);
  page.drawImage(contractImage, {
    x: 0,
    y: 0,
    width: 595,
    height: 842,
    // rotate: degrees(30),
    opacity: 1,
  });
  page.moveTo(110, 200);
  page.drawText('Hello World!');

  // case: pdf page추가하고 크기 변경하기
  const secondPdfBytes = new Uint8Array(fs.readFileSync('프리랜서2장_eform.pdf'));
  const secondPdfDoc = await PDFDocument.load(secondPdfBytes);
  const [s1, s2] = await pdfDoc.copyPages(secondPdfDoc, [0, 1]);
  console.log('x, y: ', s1.getSize());
  // setSize로 변경이 안됨. setCropBox로는 변경됨, 아니면 아래 setXX를 다실행해도 좋을것 같음
  s1.setCropBox(0, 0, 595, 842);
  // s1.setBleedBox(0, 0, 595, 842);
  // s1.setTrimBox(0, 0, 595, 842);
  // s1.setArtBox(0, 0, 595, 842);
  // s1.setSize(595,842);
  pdfDoc.insertPage(0, s1);
  pdfDoc.insertPage(0, s2);

  const [o1, o2, o3, o4] = pdfDoc.getPages(pdfDoc, [1, 2, 3, 4]);
  console.log('--------------');
  console.log('x, y: ', o1.getSize());
  console.log('x, y: ', o2.getSize());
  console.log('x, y: ', o3.getSize());
  console.log('x, y: ', o4.getSize());

  const pdfBytes = await pdfDoc.save();
  fs.writeFile('test.pdf', pdfBytes, 'binary', (err) => { });
}
modifyPdf();
