import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_Z8rk7r6o2o5bKYW0PZDYGLMnKNHaWQwj31xP2mvX7g6bDmnP0hnfnXCspDC5loHY';

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { select, textError, textLoading, catInfo } from './const';

// const HEADER = 'https://api.thecatapi.com/v1/';
// const select = document.querySelector('.breed-select');
// const textLoading = document.querySelector('.loader');
// const textError = document.querySelector('.error');
// const catInfo = document.querySelector('.cat-info');

// function fetchBreeds() {
//   return fetch(`${HEADER}breeds?x-api-key`).then(resp => {
//     if (!resp.ok) {
//       console.log(resp.statusText);
//       throw new Error(resp.statusText);
//     }
//     textLoading.hidden = true;
//     select.hidden = false;
//     return resp.json();
//   });
// }

// function fetchCatByBreed(breedId) {
//   return fetch(`${HEADER}images/search/?breed_ids=${breedId}`).then(resp => {
//     if (!resp.ok) {
//       console.log(resp.statusText);
//       throw new Error(resp.statusText);
//     }
//     textLoading.hidden = true;
//     select.hidden = false;
//     return resp.json();
//   });
// }

select.hidden = true;
textError.hidden = true;
textLoading.hidden = false;
// catInfo.style.margin = '10px';

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
