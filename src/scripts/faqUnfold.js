const faq = document.querySelector('#faq');
let previousButton = null;

faq.addEventListener('click', (e) => {
  if (!e.target.classList.contains('faq__question')) return;

  const button = e.target;
  button.querySelector('.faq__arrow').classList.toggle('faq__arrow--rotate');

  const answerLast = faq.querySelector('.faq__answer--unfolded');
  answerLast?.classList.remove('faq__answer--unfolded');

  const answerCurrent = button.parentNode.nextElementSibling;

  if (answerLast !== answerCurrent) {
    if (answerLast) {
      const previousButtonArrow = previousButton.querySelector('.faq__arrow');
      previousButtonArrow.classList.remove('faq__arrow--rotate');
    }

    answerCurrent.classList.add('faq__answer--unfolded');
  }

  previousButton = button;
});
