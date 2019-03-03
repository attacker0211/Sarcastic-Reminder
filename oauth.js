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
  console.log(returnEvents);
  retrieveProductivityData(data);
}

// START HANDLE DATE DATA/OBJECT
// convert a date object to string object
// convert string to date
function parseDate(str) {
  var mdy = str.split('-');
  return new Date(mdy[0], mdy[1]-1, mdy[2]);
}

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
  var url = "https://www.rescuetime.com/anapi/data?key=B63JSO2MuMNikxX1chntsvpC9PLpJR7h5XCkhnwH&perspective=interval&restrict_kind=productivity&interval=minute&restrict_begin=" + start_date + "&restrict_end=" + start_date + "&format=json";
  console.log(url);
  return url;
}
// END RETRIEVE API URL

function daysToNextTest(data) {
  var result = [8];
  var today = new Date();
  for (let i = 0; i < data.length; i += 1) {
    console.log(data[i].summary);
    if (data[i].summary.toLowerCase().includes("test")) {
      var incoming = (data[i].start["dateTime"]).substring(0,10);
      var t2 = (parseDate(incoming)).getTime();
      var t1 = today.getTime();
      //compute days difference
      var diff =  Math.ceil((t2-t1)/(24*60*60*1000));
      result.push(diff);
    }
  }
  var countdown = Math.min.apply(null,result);
  return countdown;
}

function messType(prod, data) {
  countdown = daysToNextTest(data);
  if ( prod >=-1 && prod <= 1) {
    if (countdown == 8){
      return 0;
    }
    if (countdown >= 2 && countdown <= 7){
      return 1;
    }
    if (countdown==1){
      return -1;
    }
  }

  if (prod == -2){
    if (countdown = 8){
      return -2;
    }
    if (countdown >= 2 && countdown <= 7){
      return -3;
    }
    if (countdown==1){
      return -4;
    }
  }

  if (prod == 2){
    if (countdown == 8){
      return 4;
    }
    if (countdown >= 2 && countdown <= 7){
      return 3;
    }
    if (countdown==1){
      return 2;
    }
  }
  return 0;
}

function genMess(data, prod) {
  var type = messType(daysToNextTest(data), prod);
  var t0 = [""];
  var t1 = ["You have an exam in a few days, better start studying!", "Have you checked what will be on the exam?", "An important exam in a few days! Have you worked on some past samples?"];
  var tneg1 = ["Exam tomorrow! Be more productive!", "Exam tomorrow! Do something please.", "You need to work harder than that for the exam tomorrow!"];
  var tneg2 = ["Keep chilling, you don't have any exams yet", "Have you ever looked back and regret not studying for your exam earlier?", "How expensive is your education?"];
  var tneg3 = ["You may want to start studying for the exam now!", "How's your grade looking now?", "Do you think you can scam half the book in 1 "];
  var tneg4 = ["The PROCRASTINATION king is probably something to be PROUD of.", "Exam tomorrow and still not study, you MUST HAVE MASTERED all the materials.", "You must be the smartest student in your class to not study now.", "Your parents must be PROUD of you."];
  var t2 = ["Keep on going!", "Keep up the good work!"];
  var t3 = ["You should be proud of yourself!", "You will ace the test no doubt!!"];
  var t4 = ["At this rate, you will be the VALEDICTORIAN.", "There is NOTHING you can't achieve in life!", "You are THE MOST HARDWORKING person in your generation!", "You work harder than CRISTIANO RONALDO!!"];
  if (type == 1){
    return t1[Math.floor(Math.random()*t1.length)];
  }
  if (type == 2){
    return t2[Math.floor(Math.random()*t1.length)];
  }
  if (type == 3){
    return t3[Math.floor(Math.random()*t1.length)];
  }
  if (type == 4){
    return t4[Math.floor(Math.random()*t1.length)];
  }
  if (type == -1) {
    return tneg1[Math.floor(Math.random()*tneg1.length)];
  }
  if (type == -2) {
    return tneg2[Math.floor(Math.random()*tneg2.length)];
  }
  if (type == -3) {
    return tneg3[Math.floor(Math.random()*tneg3.length)];
  }
  if (type == -4) {
    return tneg4[Math.floor(Math.random()*tneg4.length)];
  }
  return null;
}

function handleProductivityData(result, data) {
  console.log(result);
  // check time period to get productivity
  for (i in result) {
    var datetime = result[i][0]; // x is current time date
    if (checkMatchCurrentDateTime(datetime)) {
      var prod = result[i][3];
      console.log("prod rate is")
      console.log(prod);
      // output passage to user
      var message = genMess(data, prod);
      if(message != null) {
        alert(message);
      }
      else {
        alert("You have nothing to do.");
      }
      break;
    }
  }
  setUI(data.summary, data, prod);
}

// return productivity level
function retrieveProductivityData(data) {
  //get API data & productivity
  setInterval(function() {
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
  }, 1000);

}

// START MANIPULATING FRONT-END
function setUI(email, data, prod) {
  // set user name at welcome title
  setTitle(email);
  // tell user their productivity rate
  setProductivity(prod);
  // show tests you will have
  showTests(data);
}

function setTitle(email) {
  console.log(email);
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

function showTests(data) {
  // TODO: do something here
  console.log("tests");
  for(let i = 0; i < data.length; i += 1) {
    console.log(data[i].primary);
  }
}
// END MANIPULATING FRONT-END
