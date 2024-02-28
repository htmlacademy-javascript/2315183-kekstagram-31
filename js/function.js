// Функция для проверки длины строки. Она принимает строку,
// которую нужно проверить, и максимальную длину и возвращает true,
// если строка
// меньше или равна указанной длине, и false, если строка длиннее.
const checkString = (string, numberOfSymbol) => (string.length <= numberOfSymbol);
checkString('lalalala', 10);

// Функция для проверки, является ли строка палиндромом.
// Палиндром — это слово или фраза,
// которые одинаково читаются и слева направо и справа налево.
const checkPalindrom = (word) => {
  word = word.toUpperCase();
  word = word.replaceAll(' ', '');
  const lengthWord = word.length;
  const arrayChar = word.split('');
  let check = 0;

  for (let i = 0; i < Math.floor(lengthWord / 2); i++) {
    if (arrayChar[i] === arrayChar[lengthWord - 1 - i]) {
      check++;
    }
  }

  if (check === Math.floor(lengthWord / 2)) {
    return true;
  }

  return false;
};
checkPalindrom('lalaalal');

// Функция принимает строку, извлекает содержащиеся в
// ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
// Если в строке нет ни одной цифры, функция должна вернуть NaN
const extractNumbers = (string) => {
  const numbers = '0123456789'.split('');
  let newString = '';

  for (let i = 0; i < String(string).length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (String(string)[i] === numbers[j]) {
        newString += String(string)[i];
      }
    }
  }
  if (newString !== '') {
    return newString;
  }
  return NaN;
};
extractNumbers('ddd432');

// MODULE 5

const canBeMeeting = (startWork, endWork, startMeeting, durationMeeting) => {
  const dateOfStartWork = new Date();
  const dateOfEndWork = new Date();
  const dateOfStartMeeting = new Date();

  startWork = startWork.split(':');
  endWork = endWork.split(':');
  startMeeting = startMeeting.split(':');

  dateOfStartWork.setHours(startWork[0],startWork[1], 0);
  dateOfEndWork.setHours(endWork[0], endWork[1], 0);
  dateOfStartMeeting.setHours(startMeeting[0], startMeeting[1], 0);

  const newDateObj = new Date(dateOfStartMeeting.getTime() + durationMeeting * 60000);

  if ((newDateObj > dateOfEndWork) || (dateOfStartWork > dateOfStartMeeting)) {
    return false;
  }
  return true;

};

canBeMeeting('08:00', '17:30', '14:00', 90);
canBeMeeting('8:0', '10:0', '8:0', 120);
canBeMeeting('08:00', '14:30', '14:00', 90);
canBeMeeting('14:00', '17:30', '08:0', 90);
canBeMeeting('8:00', '17:30', '08:00', 900);
