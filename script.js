'use strict';
const searchURL = "https://api.github.com/users";


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
    $('#results-list').empty();

   for (let i = 0; i < responseJson.length; i++){

    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></h3>
      <p>${responseJson[i].name}</p>
      </li>`
    )};
    $('#results').removeClass('hidden');
   
};

function getNews(query) {
  const url = searchURL + '/' + query + '/repos';

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getNews(searchTerm);
  });
}

$(watchForm);

