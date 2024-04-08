import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_Z8rk7r6o2o5bKYW0PZDYGLMnKNHaWQwj31xP2mvX7g6bDmnP0hnfnXCspDC5loHY';

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { select, textError, textLoading, catInfo } from './const';

select.hidden = true;
textError.hidden = true;
textLoading.hidden = false;

fetchBreeds()
  .then(data => {
    select.innerHTML = createMarkupOption(data);
  })
  .catch(err => {
    console.log(err);
    textError.hidden = false;
    textLoading.hidden = true;
  });

function createMarkupOption(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

select.addEventListener('change', output);

function output(evt) {
  catInfo.innerHTML = '';
  const currentCat = evt.currentTarget.value;

  fetchCatByBreed(currentCat)
    .then(data => {
      catInfo.insertAdjacentHTML('afterbegin', createMarkupCatImg(data));
    })
    .catch(err => {
      console.log(err);
      textError.hidden = false;
      textLoading.hidden = true;
    });

  fetchBreeds()
    .then(data => {
      data.forEach(({ name, description, temperament, id }) => {
        if (id === currentCat) {
          catInfo.insertAdjacentHTML(
            'beforeEnd',
            `<h1 class="cat-name">${name}</h1>
          <p class="cat-description">${description}</p>
          <p class="cat-temperament"><b>Temperament: </b>${temperament}</p>`
          );
        }
      });
    })
    .catch(err => {
      console.log(err);
      textError.hidden = false;
      textLoading.hidden = true;
    });
}

function createMarkupCatImg(arr) {
  return arr
    .map(({ url }) => `<img src="${url}" alt="" height="250px">`)
    .join('');
}
