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
