import { galleryItems } from './gallery-items.js';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

const divGallery = document.querySelector('.gallery');

const galleryImage = galleryItems.map(({ preview, original, description }) => {
  const photoEl = `
    <div class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
        </a>
    </div>
    `;
  return photoEl;
});

const stringGallery = galleryImage.join('');
divGallery.innerHTML = stringGallery;

const instance = new SimpleLightbox('.gallery a');

// divGallery.addEventListener('click', onDivGalleryClick);

function onDivGalleryClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  divGallery.addEventListener('keydown', onEscPressModalClose);

  function onEscPressModalClose(event) {
    if (event.code === 'Escape') {
      instance.close();
      divGallery.removeEventListener('keydown', onEscPressModalClose);
    }
  }
}
