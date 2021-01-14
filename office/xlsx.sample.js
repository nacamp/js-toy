// https://docs.sheetjs.com/
const xlsx = require('xlsx');

const caseForUnknownheader = () => {
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
  for (const x of sheetData) {
    console.log(x);
  }
};

caseForUnknownheader();
caseForKnownheader();
