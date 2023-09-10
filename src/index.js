import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createMarkup } from './markup';
import { getUserRequest, quantityPage } from './additional';

let gallerySLB = new SimpleLightbox('.gallery a');

const refs = {
  formEl: document.querySelector('.search-form'),
  container: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more-hidden'),
};

refs.formEl.addEventListener('submit', handleSubmit);

let numberPage = 0;
let userRequest = '';

function handleSubmit(event) {
  event.preventDefault();
  numberPage = 1;
  userRequest = event.currentTarget.elements[0].value;
  getUserRequest(userRequest, numberPage)
    .then(resp => {
      //console.log(resp);
      if (resp.data.hits.length === 0 || userRequest === '') {
        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        refs.formEl.reset();
        return;
      }
      // console.log(resp.data.hits.length); к-ть запитів
      // console.log(resp.data.totalHits); всього
      refs.container.innerHTML = createMarkup(resp.data.hits);
      gallerySLB.refresh();
      //console.log(numberPage);

      if (resp.data.hits.length < resp.data.totalHits) {
        refs.loadMoreBtn.classList.replace('load-more-hidden', 'load-more');
      }
    })
    .catch(error => console.log(error.message))
    .finally(() => refs.formEl.reset());
}

refs.loadMoreBtn.addEventListener('click', handlerLoadMore);

function handlerLoadMore() {
  numberPage += 1; //номер сторінки

  getUserRequest(userRequest, numberPage)
    .then(resp => {
      refs.container.insertAdjacentHTML(
        'beforeend',
        createMarkup(resp.data.hits)
      );
      gallerySLB.refresh();
      //console.log(resp.data.hits.length); //додано за 1 раз
      //console.log(resp.data.totalHits); //доступна к-ть фото
      //console.log(refs.container.children.length); //кількість створених дівів
      if (Math.ceil(resp.data.totalHits / 40) === numberPage) {
        // if (refs.container.children.length >= resp.data.totalHits) {
        refs.loadMoreBtn.classList.replace('load-more', 'load-more-hidden');
        Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => console.log(error.message));
}
