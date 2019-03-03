window.onload = function() {
  // document.querySelector('button').addEventListener('click', function() {

    chrome.identity.getAuthToken({interactive: true}, function(token) {
      let init = {
        method: 'GET',
        async: true,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        'contentType': 'json'
      };
      fetch(
          'https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMax=2019-03-03T12%3A00%3A00Z&timeMin=2019-03-01T12%3A00%3A00Z&key=AIzaSyA3Ph01ZChAs9Tr5Fo19XTT38OsZxU4yzw',
          init)
          .then((response) => response.json())
          .then(function(data) {
            let returnEvents = data.items;
            console.log(data.summary);
            console.log(returnEvents);
            for(let i = 0; i < returnEvents.length; i += 1) {
              if(returnEvents[i].status == "confirmed") {
                console.log(returnEvents[i]);
                console.log(returnEvents[i].summary);
                var s = returnEvents[i].start["dateTime"];
                var e = returnEvents[i].end["dateTime"];
              }
            }

            // set user name at welcome title
            setTitle(data.summary);

            // tell user their productivity rate
            prod_rate = 2;
            setProductivity(prod_rate);
          });
    });
  // });

}; /* end window onload */

function setTitle(email) {
  var name = email.substr(0, email.indexOf('@'));
  document.getElementById('title').innerHTML += name;
}

function setProductivity(prod_rate) {
  var prod_html = document.getElementById('productivity');
  if(prod_rate == -2) {
    prod_html.innerHTML += "very unproductive. Stop being distracted and go back to work NOW!!!";
  }
  else if(prod_rate == -1) {
    prod_html.innerHTML += "unproductive. Go back to work as soon as possible!";
  }
  else if(prod_rate == 0) {
    prod_html.innerHTML += "in neutral productivity.";
  }
  else if(prod_rate == 1) {
    prod_html.innerHTML += "productive. Keeps moving forward!";
  }
  else if(prod_rate == 2) {
    prod_html.innerHTML += "very productive! Congratulations and keep being productive!"
  }
}
