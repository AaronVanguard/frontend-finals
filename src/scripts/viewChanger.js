const listButton = document.querySelector('#button-list');
const gridButton = document.querySelector('#button-grid');
const blogContentView = document.querySelector('#blogContent');

export function viewChange(viewType) {
  const isListView = viewType === 'list';
  const posts = document.querySelectorAll('.post');

  listButton.classList.toggle('blog__button--active', isListView);
  gridButton.classList.toggle('blog__button--active', !isListView);
  blogContentView.classList.toggle('blog__content--list', isListView);

  posts.forEach((post) => {
    post.classList.toggle('post--horizontal', isListView);
  });
}

listButton.addEventListener('click', () => {
  viewChange('list');
  localStorage.setItem('currentView', 'list');
});

gridButton.addEventListener('click', () => {
  viewChange('grid');
  localStorage.setItem('currentView', 'grid');
});

viewChange(localStorage.getItem('currentView'));
