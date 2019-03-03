window.onload = function() {
  chrome.identity.getAuthToken({interactive: true}, function(token) {
    main(token);
  });
}; /* end window onload */

function main(token) {
  let init = {
    method: 'GET',
    async: true,
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    'contentType': 'json'
  };

  var url = getCalendarUrl(); // calendar api url

  // retrieve data from calendar api
  fetch(url, init)
  .then((response) => response.json())
  .then(function(data) {
    handleEventsData(data);
  });
}

function getStringDate(date) {
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  var date_str = year + "-" + month + "-" + day;
  return date_str;
}

function getEndStringDate() {
  var end_date = new Date((today.getTime() + 7*24*60*60*1000));
  return getStringDate(end_date);
}

// retrieve api call url from today to the next 7 days
function getCalendarUrl() {
  var today_date = new Date();
  var start_date = getStringDate(today_date);
  var end_date = getEndStringDate();
  var url = "https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMax=" + start_date + "T12%3A00%3A00Z&timeMin=" + end_date + "T12%3A00%3A00Z&key=AIzaSyA3Ph01ZChAs9Tr5Fo19XTT38OsZxU4yzw";
  return url;
}

// retrieve rescue time api url call
function getRescueTimeUrl() {
  var today_date = new Date();
  var start_date = getTodayStringDate(today_date);
  var url = "https://www.rescuetime.com/anapi/data?key=B632wraD8A3HtIF2ZF9nPrwRz2AIpnbWsKW_s0rY&perspective=interval&restrict_kind=productivity&interval=minute&restrict_begin=" + today_date + "&restrict_end=" + today_date + "&format=json";
}

function handleEventsData(data) {
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
}

// return productivity level
function retrieveCurrentProductivity() {
  //get API data & productivity
  var xhr = new XMLHttpRequest();
  var url = getRescueTimeUrl();
  xhr.open("GET", url, true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var resp = JSON.parse(xhr.responseText);
      var result = resp.rows;
      console.log(result);
      console.log(datetime);
      // check time period to get productivity
      for (i in result){
        var x = result[i][0];
        if (x === datetime){
          prod = result[i][3];
          console.log(prod);
          break;
        }
      }
    }
  }

  xhr.send();
}

// front-end thingy
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
