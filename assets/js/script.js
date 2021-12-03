
function catFacts() {
    fetch('https://cat-fact.herokuapp.com/facts')
    .then(function(response) {
      return response.json();
    }).then(function(data) {
       console.log('data', data);
      var factsListEl = document.getElementById('cat-facts');
  
      for (var i = 0 ; i < data.length; i++) {
            var factListItem = document.createElement('li');
            factListItem.innerText = data[i].text;
            factsListEl.appendChild(factListItem);
      }
    });
  }
  
  catFacts(); 


  function dogFacts() {
    fetch('https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?number=1')
    .then(function(response) {
      return response.json();
    }).then(function(data) {
       console.log('data', data);
      var factsListEl = document.getElementById('dog-facts');
  
      for (var i = 0 ; i < data.length; i++) {
            var factListItem = document.createElement('li');
            factListItem.innerText = data[i].text;
            factsListEl.appendChild(factListItem);
      }
    });
  }
  
  dogFacts(); 
  
