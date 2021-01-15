// https://docs.sheetjs.com/
// eslint-disable-next-line no-tabs
/**
 1:
 2: 안내문구...
 3:
 4:수신자  이메일             휴대폰번호 폼 이름  숫자1   텍스트1
 5:홍길동1 jimmy+1@test.com                111    결과1
 6:홍길동2 jimmy+2@test.com                222    결과2
 7:
 8:nbn    hjghj
*/
const xlsx = require('xlsx');

const caseForUnknownheader1 = () => {
  const workbook = xlsx.readFile('./data.xlsx');
  const header = {
    header: 1, defval: '', range: 3, blankrows: false,
  };
  const ws = workbook.Sheets[workbook.SheetNames[0]];
  const sheetData = xlsx.utils.sheet_to_json(ws, header);
  console.log('header>>>>');
  console.log(sheetData[0]);
  console.log('data>>>>');
  // eslint-disable-next-line no-restricted-syntax
  for (const x of sheetData.slice(1)) {
    console.log(x);
  }
};

const caseForKnownheader = () => {
  const workbook = xlsx.readFile('./data.xlsx');
  const headerTitle = [
    '수신자',
    '이메일',
    '휴대폰번호',
    '비밀번호(미사용 시 공란)',
    '폼 이름',
    '숫자1',
    '텍스트1',
  ];
  const header = {
    header: headerTitle, defval: '', range: 4, blankrows: false,
  };
  const ws = workbook.Sheets[workbook.SheetNames[0]];
  const sheetData = xlsx.utils.sheet_to_json(ws, header);
  // eslint-disable-next-line no-restricted-syntax
  for (const r of sheetData) {
    console.log(r);
  }
};

const caseForUnknownheader2 = () => {
  const workbook = xlsx.readFile('./data.xlsx');
  let header = {
    header: 1, defval: '', range: 3, blankrows: false,
  };
  const ws = workbook.Sheets[workbook.SheetNames[0]];
  let sheetData = xlsx.utils.sheet_to_json(ws, header);
  const headerTitle = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const r of sheetData[0]) {
    if (r) {
      headerTitle.push(r);
    }
  }

  header = {
    header: headerTitle, defval: '', range: 4, blankrows: false,
  };
  sheetData = xlsx.utils.sheet_to_json(ws, header);
  // eslint-disable-next-line no-restricted-syntax
  for (const r of sheetData) {
    console.log(r);
  }
};

caseForUnknownheader1();
caseForKnownheader();
caseForUnknownheader2();
