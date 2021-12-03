var accessToken = '';
var tokenEl = document.getElementById('accesstoken');
var buttonEl = document.getElementById('buttonToken');
buttonEl.addEventListener('click', function() {
   var apiKey = document.getElementById('apikey').value;
   var apiSecret = document.getElementById('apisecret').value;
  if (!apiKey) alert('You need to provide api key from your petfinder account settings page');
  if (!apiSecret) alert('You need to provide api secret from your pet finder account settings page');
  fetch('https://api.petfinder.com/v2/oauth2/token', {method: 'POST',                                                           headers: {
      'Content-Type': 'application/json'
    },
body: JSON.stringify({grant_type: 'client_credentials',
                      client_id:apiKey,
                      client_secret: apiSecret})                                                                                                           }).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log('data', data);
    tokenEl.innerText = data.access_token;
    accessToken = data.access_token;
  }).catch(function(err) {
    console.log('err', err);
  });
});

var animalsButton = document.getElementById('getAnimals');
var animalsListEl = document.getElementById('animals');
animalsButton.addEventListener('click', function() {
  if (accessToken) {
      fetch('https://api.petfinder.com/v2/animals', {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      }).then(function(response) {
        return response.json()
      }).then(function(data) {
        var animals = data.animals;
        loopAndRenderAnimalsOnPage(animals);
      })
  } else {
    alert('Error: You need to get an oauth token first.');
  }

});

function loopAndRenderAnimalsOnPage(animals) {
  console.log('animals', animals);
  for (var i = 0; i < animals.length; i++) {
    var listItemEl = document.createElement('li');
    listItemEl.innerText = animals[i].name + ': ' + animals[i].breeds.primary;
    animalsListEl.appendChild(listItemEl);
    
  }
}

