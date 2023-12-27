import { viewChange } from './viewChanger.js';

const form = document.querySelector('.blog__form');

const button_add = document.querySelector('.blog__button');
const button_cancel = document.querySelector('.form__button--cancel');
const button_create = document.querySelector('.form__button--create');

const title = document.querySelector('#title');
const image = document.querySelector('#image');
const textarea = document.querySelector('#textarea');

function resetForm() {
  form.classList.add('blog__form--hidden');
  button_add.classList.remove('blog__form--hidden');
  document.querySelector('.form').reset();
}

const createElementWithClass = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

function validateForm() {
  const titleValue = title.value.trim();
  const imageValue = image.value.trim();
  const textareaValue = textarea.value.trim();

  return titleValue !== '' && imageValue !== '' && textareaValue !== '';
}

button_add.addEventListener('click', () => {
  form.classList.remove('blog__form--hidden');
  button_add.classList.add('blog__form--hidden');
});

button_cancel.addEventListener('click', () => {
  resetForm();
});

button_create.addEventListener('click', () => {
  if (!validateForm()) {
    return;
  }

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const time = Math.floor(Math.random() * 15) + 1;

  const newPost = createElementWithClass('article', 'post');
  const postImage = createElementWithClass('img', 'post__img');
  postImage.src = image.value;
  postImage.alt = '';
  newPost.appendChild(postImage);

  const postContent = createElementWithClass('div', 'post__content');

  const postTitle = createElementWithClass('h3', 'post__title');
  postTitle.textContent = title.value;
  postContent.appendChild(postTitle);

  const postTextarea = createElementWithClass('p', 'post__text');
  postTextarea.textContent = textarea.value;
  postContent.appendChild(postTextarea);

  const postFooter = createElementWithClass('footer', 'post__footer');

  const postTime = createElementWithClass('time', 'post__time');
  postTime.setAttribute('datetime', currentDate.toISOString());
  postTime.textContent = formattedDate;

  const minRead = createElementWithClass('span', '');
  minRead.textContent = ` · ${time} min read`;

  postFooter.appendChild(postTime);
  postFooter.appendChild(minRead);

  postContent.appendChild(postFooter);

  newPost.appendChild(postContent);

  const blogContent = document.querySelector('.blog__content');
  blogContent.appendChild(newPost);

  viewChange(localStorage.getItem('currentView'));

  resetForm();
});
