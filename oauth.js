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

function handleEventsData(data) {
  let returnEvents = data.items;
  console.log(data.summary);
  console.log(returnEvents);
  retrieveProductivityData(data);
}

// START HANDLE DATE DATA/OBJECT
// convert a date object to string object
function getStringDate(date) {
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  var date_str = year + "-" + month + "-" + day;
  return date_str;
}

function getStringDateTime(date) {
  var string_date = getStringDate(date);
  var time = ("0" + date.getHours()).slice(-2) + ":00:00";
  var datetime = string_date + 'T' + time;
  return datetime;
}
// get end date (string) to set to calendar url
function getEndStringDate() {
  var today = new Date();
  var end_date = new Date(today.getTime() + 7*24*60*60*1000);
  return getStringDate(end_date);
}

// check match current datetime
function checkMatchCurrentDateTime(datetime) {
  var current_datetime = getStringDateTime(new Date());
  return current_datetime === datetime; // careful with this
}
// END HANDLE DATE DATA/OBJECT

// START RETRIEVE API URL
// retrieve api call url from today to the next 7 days
function getCalendarUrl() {
  var start_date = getStringDate(new Date());
  var end_date = getEndStringDate();
  var url = "https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMax=" + end_date + "T12%3A00%3A00Z&timeMin=" + start_date + "T12%3A00%3A00Z&key=AIzaSyA3Ph01ZChAs9Tr5Fo19XTT38OsZxU4yzw";
  console.log(url);
  return url;
}

// retrieve rescue time api url call
function getRescueTimeUrl() {
  var start_date = getStringDate(new Date());
  var url = "https://www.rescuetime.com/anapi/data?key=B632wraD8A3HtIF2ZF9nPrwRz2AIpnbWsKW_s0rY&perspective=interval&restrict_kind=productivity&interval=minute&restrict_begin=" + start_date + "&restrict_end=" + start_date + "&format=json";
  console.log(url);
  return url;
}
// END RETRIEVE API URL

function handleProductivityData(result, data) {
  console.log(result); 
  // check time period to get productivity
  for (i in result) {
    var datetime = result[i][0]; // x is current time date
    if (checkMatchCurrentDateTime(datetime)) {
      var prod = result[i][3];
      console.log(prod);
      // TODO: add a function here to alert shit
      break;
    }
  }
  setUI(data.summary);
}

// return productivity level
function retrieveProductivityData(data) {
  //get API data & productivity
  var xhr = new XMLHttpRequest();
  var url = getRescueTimeUrl();

  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var responses = JSON.parse(xhr.responseText);
      // responses.rows are arrays of productivity over time
      handleProductivityData(responses.rows, data);
    }
  }
  xhr.send();

  //get API data & productivity
  // var xhr = new XMLHttpRequest();
  // xhr.open("GET", url, true);
  //
  // xhr.onreadystatechange = function() {
  //   if (xhr.readyState == 4) {
  //     var resp = JSON.parse(xhr.responseText);
  //     var result = resp.rows;
  //     console.log(result);
  //     // check time period to get productivity
  //     for (i in result){
  //       var datetime = result[i][0]; // current_datetime
  //       if (checkMatchCurrentDateTime(datetime)){
  //         prod = result[i][3];
  //         console.log(prod);
  //         break;
  //       }
  //     }
  //   }
  // }

  // xhr.send();
}

// START MANIPULATING FRONT-END
function setUI(email, prod) {
  // set user name at welcome title
  setTitle(email);
  // tell user their productivity rate
  setProductivity(prod);
}

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
// END MANIPULATING FRONT-END
