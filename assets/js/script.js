var accessToken = '';
function getAccessToken() {
    var apiKey = "3Wnc44BRP16qJhv80lVv1yI8VZZLbe2B0udJQtJIw9UUBS3UI3";
    var apiSecret = "NsSeJWrTc9EIPcPVtJORv2Mb0P5WYRBZDn89Pt7g";
    fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            grant_type: 'client_credentials',
            client_id: apiKey,
            client_secret: apiSecret
        })
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log('data', data);
        accessToken = data.access_token;
        return accessToken;
    }).then(function (accessToken) {
        fetch('https://api.petfinder.com/v2/animals', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }).then(function (response) {
            return response.json()
        }).then(function (data) {
            var animals = data.animals;
            console.log('animals', animals);
            for (var i = 0; i < animals.length; i++) {
                console.log(animals[i].name + ': ' + animals[i].breeds.primary);

            }
        }).catch(function (err) {
            console.log('err', err);
        })
    });
};

getAccessToken();

function catFacts() {
    fetch("https://cat-fact.herokuapp.com/facts")
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log("data", data);
            var factsListEl = document.getElementById("cat-facts");
            for (var i = 0; i < data.length; i++) {
                var factListItem = document.createElement("li");
                factListItem.innerText = data[i].text;
                factsListEl.appendChild(factListItem);
            }
        });
}
catFacts();