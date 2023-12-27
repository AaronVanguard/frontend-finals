import { viewChange } from './viewChanger.js';

const createElementWithClass = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

function createPostElement(post) {
  const newPost = createElementWithClass('article', 'post');

  const postImage = createElementWithClass('img', 'post__img');
  postImage.src = post.jetpack_featured_media_url;
  postImage.alt = '';
  newPost.appendChild(postImage);

  const postContent = createElementWithClass('div', 'post__content');

  const postTitle = createElementWithClass('h3', 'post__title');
  postTitle.textContent = post.title.rendered;
  postContent.appendChild(postTitle);

  const postText = createElementWithClass('p', 'post__text');
  postText.textContent = post.excerpt.rendered;
  postContent.appendChild(postText);

  const postFooter = createElementWithClass('footer', 'post__footer');

  const postDate = new Date(post.date);
  const formattedDate = postDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const readingTime = Math.floor(Math.random() * 15) + 1;

  const postTime = createElementWithClass('time', 'post__time');
  postTime.setAttribute('datetime', post.date);
  postTime.textContent = formattedDate;

  const minRead = createElementWithClass('span', '');
  minRead.textContent = `${readingTime} min read`;

  postFooter.appendChild(postTime);
  postFooter.appendChild(document.createTextNode(' · '));
  postFooter.appendChild(minRead);
  postContent.appendChild(postFooter);

  newPost.appendChild(postContent);
  return newPost;
}

fetch('https://techcrunch.com/wp-json/wp/v2/posts?per_page=6')
  .then((response) => response.json())
  .then((posts) => {
    const blogContent = document.querySelector('.blog__content');
    posts.forEach((post) => {
      const newPost = createPostElement(post);
      blogContent.appendChild(newPost);
    });
    viewChange(localStorage.getItem('currentView'));
  });
