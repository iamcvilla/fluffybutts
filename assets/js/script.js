
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
