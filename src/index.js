import './css/styles.css';
import debounce from 'lodash.debounce';
import countriesMarkupTpl from './templates/countriesMarkup';
import coutryMarkupTpl from './templates/coutryMarkup.hbs';

const DEBOUNCE_DELAY = 300;

const searchbox = document.querySelector('#search-box');
const countriesEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

searchbox.addEventListener('input', e => {
  e.preventDefault();
  const name = searchbox.value;
  fetchCountries(name).then(showCountries);
});

function showCountries(name) {
  const coutryOneMarkup = coutryMarkupTpl(name);
  countryInfoEl.innerHTML = coutryOneMarkup;
  console.log(coutryOneMarkup);
}

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(res => res.json());
}
