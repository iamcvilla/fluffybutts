var searchelement = document.getElementById ("search")
var infoelement = document.getElementById ("info")

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
        fetch('https://api.petfinder.com/v2/animals?type=Cat&limit=100', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }).then(function (response) {
            return response.json()
        }).then(function (data) {
            var animals = data.animals;
            console.log('animals', animals);
            for (var i = 0; i < animals.length; i++) {
                if (animals[i].photos.length > 0) {
                    
                    console.log(animals[i].name + ': ' + animals[i].breeds.primary + " - " + animals[i].description + " sex: " + animals[i].gender);
                    // display data 
                    var name= document.createElement ("h2")
                    var breedEl = document.createElement ("p")
                    var descriptionEl = document.createElement ("p")
                    var genderEl = document.createElement ("p")
                    var environmentEl = document.createElement ("p")
                    name.textContent = `name: ${animals[i].name}`;
                    breedEl.textContent = `breed: ${animals[i].breeds.primary}`
                    descriptionEl.innerHTML = `description: ${animals[i].description}`
                    genderEl.textContent = `gender ${animals[i].gender}`
                    environmentEl.textContent = `environment: ${JSON.stringify(animals[i].environment)}`
    
                    infoelement.append(name,breedEl,descriptionEl,environmentEl, genderEl)
                    
                }
            }
        }).catch(function (err) {
            console.log('err', err);
        })
    });
};
searchelement.addEventListener ("click", getAccessToken)
// getAccessToken();

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