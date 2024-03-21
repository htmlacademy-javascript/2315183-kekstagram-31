const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const WrongMasseges = {
  HASTAG_TEXT: 'Неверная запись хештегов',
  HASHTAG_COUNT: 'Хэштегов должно быть не больше пяти',
  HASHTAG_DUPLICATE: 'Повторяющийся хэштег',
  COMMENT_LENGTH: 'Длина комментария недолжна быть больше 140 символов'
};

const HASHTAG_MAX_COUNT = 5;
const COMMENT_MAX_LENGTH = 140;

const loadImageForm = document.querySelector('.img-upload__form');
const hashtagInput = loadImageForm.querySelector('.text__hashtags');
const commentInput = loadImageForm.querySelector('.text__description');

const pristine = new Pristine(loadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrappe--invalid',
  successClass: 'img-upload__field-wrappe--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const checkDuplicates = (array) => (new Set(array)).size === array.length;

const checkHashtags = (value) => {
  const hashtagArray = value.trim().split(' ');

  if (value === '') {
    return true;
  }
  return hashtagArray.every((element) => HASHTAG_REGEX .test(element));
};

const checkCountHashtags = (value) => {
  const hashtagArray = value.trim().split(' ');

  return hashtagArray.length <= HASHTAG_MAX_COUNT;
};

const checkHashtagsDuplicates = (value) => {
  const hashtagArray = value.trim().split(' ');

  return checkDuplicates(hashtagArray.map((hashtag) => hashtag.toLowerCase()));
};

const checkCommentLength = (value) => value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(hashtagInput, checkHashtags, WrongMasseges.HASTAG_TEXT);
pristine.addValidator(hashtagInput, checkCountHashtags, WrongMasseges.HASHTAG_COUNT);
pristine.addValidator(hashtagInput, checkHashtagsDuplicates, WrongMasseges.HASHTAG_DUPLICATE);
pristine.addValidator(commentInput, checkCommentLength, WrongMasseges.COMMENT_LENGTH);

const checkForm = () => {
  pristine.validate();
};

loadImageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(pristine.validate()) {
    loadImageForm.submit();
  }
});

export { checkForm };
