import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './api-services/api-service';
import countriesMarkupTpl from './templates/countriesMarkup';
import coutryMarkupTpl from './templates/coutryMarkup.hbs';

const DEBOUNCE_DELAY = 300;

const searchbox = document.querySelector('#search-box');
const countriesEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

let markup = '';

searchbox.addEventListener(
  'input',
  debounce(() => {
    const name = searchbox.value.trim();

    if (name === '') {
      countriesEl.innerHTML = '';
      countryInfoEl.innerHTML = '';
      return;
    }
    fetchCountries(name).then(showCountries).catch(showError);
  }, DEBOUNCE_DELAY),
);

function showCountries(name) {
  countriesEl.innerHTML = '';
  countryInfoEl.innerHTML = '';

  if (name.length > 10) {
    return Notify.success('Too many matches found. Please enter a more specific name.');
  }

  if (name.length >= 2 && name.length <= 10) {
    markup = countriesMarkup(name);
    return countriesEl.insertAdjacentHTML('beforeend', markup);
  }

  markup = oneCountryMarkup(name);
  return countryInfoEl.insertAdjacentHTML('beforeend', markup);
}

function countriesMarkup(name) {
  return countriesMarkupTpl(name);
}

function oneCountryMarkup(name) {
  return coutryMarkupTpl(name);
}

function showError() {
  countriesEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
  return Notify.failure('Oops, there is no country with that name');
}
