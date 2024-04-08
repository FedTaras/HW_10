import { textLoading, select, HEADER } from './const';

function fetchBreeds() {
  return fetch(`${HEADER}breeds?x-api-key`).then(resp => {
    if (!resp.ok) {
      console.log(resp.statusText);
      throw new Error(resp.statusText);
    }
    textLoading.hidden = true;
    select.hidden = false;
    return resp.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${HEADER}images/search/?breed_ids=${breedId}`).then(resp => {
    if (!resp.ok) {
      console.log(resp.statusText);
      throw new Error(resp.statusText);
    }
    textLoading.hidden = true;
    select.hidden = false;
    return resp.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
