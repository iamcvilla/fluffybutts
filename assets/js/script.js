var myBtn = document.getElementById("myBtn");
var savedpets =
      JSON.parse(window.localStorage.getItem("savedpets")) || [];
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
        fetch('https://api.petfinder.com/v2/animals?type=Cat&limit=12', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }).then(function (response) {
            return response.json()
        }).then(function (data) {
            var petBox = document.querySelector(".pet-box")
            var animals = data.animals;
            console.log('animals', animals);
            for (var i = 0; i < animals.length; i++) {
                var petLi = document.createElement("li");
                var viewButton = document.createElement("button")
                viewButton.textContent = "view";
                viewButton.setAttribute("value", animals[i].id)
                viewButton.onclick = viewSelectedPet;
                var saveButton = document.createElement("button")
                saveButton.textContent = "save";
                saveButton.setAttribute("value", animals[i].id)
                saveButton.setAttribute("petname",animals[i].name)
                saveButton.onclick = saveSelectedPet;
                petLi.textContent = animals[i].name + ': ' + animals[i].breeds.primary;
                petLi.appendChild(viewButton)
                petLi.appendChild(saveButton)
               // let divEl = document.createElement("div");
                //let pEl = document.createElement("p");
                //pEl.textcontent =this.animals[i].description;
                //divEl.append(pEl);
                petBox.appendChild(petLi)
            }
        }).catch(function (err) {
            console.log('err', err);
        })
    });
};
function viewSelectedPet(){
    var petID = this.value
    console.log(petID)
    //creat new modal append the information 
}
function saveSelectedPet(){
    var petID = this.value
    console.log (petID)
    savedpets =
      JSON.parse(window.localStorage.getItem("savedpets")) || [];
    var newPet = {
       // name: this.petname,
        id: petID
    }
    //console.log(this.petname);
    savedpets.push (newPet);
    window.localStorage.setItem("savedpets", JSON.stringify(savedpets));
    $('#myModal_product').modal('show');
    console.log(petID)
}

getAccessToken();

function catFacts() {
    var factsListEl = document.getElementById("cat-facts");
    factsListEl.innerHTML = "";
    fetch("https://cat-fact.herokuapp.com/facts")
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log("data", data);
            // for (var i = 0; i < data.length; i++) {
            // }
            var index = Math.floor(Math.random() * data.length)
            var factListItem = document.createElement("p");
            factListItem.innerText = data[index].text;
            factsListEl.appendChild(factListItem);

        });
}

myBtn.addEventListener("click", catFacts)