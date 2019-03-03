//get date

var today = new Date();
var year = today.getFullYear();
var month = ("0" + (today.getMonth() + 1)).slice(-2);
var day = ("0" + today.getDate()).slice(-2);
var date = year + "-" + month + "-" + day;
var hour = ("0" + today.getHours()).slice(-2);
var time = hour + ":00:00";
var datetime = date+'T'+time;
var prod = 0;

//get API data & productivity
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.rescuetime.com/anapi/data?key=B632wraD8A3HtIF2ZF9nPrwRz2AIpnbWsKW_s0rY&perspective=interval&restrict_kind=productivity&interval=minute&restrict_begin=2019-03-03&restrict_end=2019-03-03&format=json", true);

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
