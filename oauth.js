window.onload = function() {
  document.querySelector('button').addEventListener('click', function() {
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
            console.log(data)
          });
    });
  });
};
