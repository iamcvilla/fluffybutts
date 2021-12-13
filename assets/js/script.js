// Main Variables
var searchFormEl = document.getElementById("search-form");
var postCodeEl = document.getElementById("postcode");
var searchBtn = document.getElementById("search-pet-btn");
var postcode = "";
var myBtn = document.getElementById("myBtn");
var savedpets = JSON.parse(window.localStorage.getItem("savedpets")) || [];
var accessToken = '';

// Retriving Api Key and Secret
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
        fetch('https://api.petfinder.com/v2/animals?type=Cat&limit=12', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }).then(function (response) {
            return response.json()

        // Featured Pets List and Buttons    
        }).then(function (data) {
            var petBox = document.querySelector(".pet-box")
            console.log("data", data)
            var animals = data.animals;
            for (var i = 0; i < animals.length; i++) {
                var petLi = document.createElement("li");
                var viewButton = document.createElement("a")
                viewButton.textContent = "view";
                viewButton.classList.add("btn", "btn-primary", "btn-lg")
                viewButton.classList.add("btn", "btn-info", "btn-lg", "btn-view")
                viewButton.target = "_blank"
                viewButton.href = animals[i].url
                viewButton.setAttribute("value", animals[i].url)
                viewButton.onclick = viewSelectedPet;
                var saveButton = document.createElement("button")
                saveButton.textContent = "save";
                saveButton.classList.add("btn", "btn-primary", "btn-lg")
                saveButton.classList.add("btn", "btn-info", "btn-lg", "btn-save")
                saveButton.setAttribute("value", animals[i].id)
                saveButton.setAttribute("petname", animals[i].name)
                saveButton.onclick = saveSelectedPet;
                petLi.textContent = animals[i].name + ': ' + animals[i].breeds.primary;
                petLi.appendChild(viewButton)
                petLi.appendChild(saveButton)
                let divEl = document.createElement("div");
                let pEl = document.createElement("p");
                console.log("animals.description", animals[i].description)
                pEl.textcontent = animals[i].description;
                divEl.append(pEl);
                petBox.appendChild(petLi)
            }
        }).catch(function (err) {
            console.log('err', err);
        })
    });
};

// View Pet Function
function viewSelectedPet() {
    var petID = this.value
    console.log(petID)
}
// Save Pet Function and Modal
function saveSelectedPet() {
    var petID = this.value
    console.log(petID)
    savedpets =
        JSON.parse(window.localStorage.getItem("savedpets")) || [];
    var newPet = {
        name: this.petname,
        id: petID
    }
    console.log(this.petname);
    savedpets.push(newPet);
    window.localStorage.setItem("savedpets", JSON.stringify(savedpets));
    $('#myModal_product').modal('show');
    console.log(petID)
}
// Pet Search Function, Input, and Button
var catSearchHandler = function (event) {
    event.preventDefault();

    
    var searchedPostcodeEl = document.getElementById("postcode");
    var searchedPostcode = searchedPostcodeEl.value.trim();
    postcode = searchedPostcode;

    console.log("postcode", postcode);
    fetch('https://api.petfinder.com/v2/animals?type=Cat&limit=6&location=' + postcode, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    }).then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log(data)
        var localCats = document.getElementById("localCats")
        localCats.innerHTML = ""
        for (var i = 0; i < data.animals.length; i++) {
            var localCat = document.createElement("li");
            var name = document.createElement("p");
            var image = document.createElement("img");
            var link = document.createElement("a");
            var animal = data.animals[i]
            name.textContent = animal.name
            if(animal.photos[0].medium !==null){
                image.src = animal.photos[0].medium
            }
            link.href = animal.url
            link.target = "_blank"
            link.appendChild(image)
            link.appendChild(name)
            localCat.appendChild(link)
            localCats.appendChild(localCat)
        }
    })
};

// Calling getAccessToken
getAccessToken();

// Cat Facts Function and Button
function catFacts() {
    var factsListEl = document.getElementById("cat-facts");
    factsListEl.innerHTML = "";
    fetch("https://cat-fact.herokuapp.com/facts")
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log("data", data);
            for (var i = 0; i < data.length; i++) {
            }
            var index = Math.floor(Math.random() * data.length)
            var factListItem = document.createElement("p");
            factListItem.innerText = data[index].text;
            factsListEl.appendChild(factListItem);
        });
}

//Event Listeners for Pet Search and Cat Facts buttons
searchFormEl.addEventListener("submit", catSearchHandler);
myBtn.addEventListener("click", catFacts)
