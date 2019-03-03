// convert string to date
function parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[0], mdy[1]-1, mdy[2]);
}

// identify days to test
function daysToTest(item){
      var result = [8];
      var today = new Date();
      for (i in item) {
        if (item[i].summary === "test"){
          var incoming = (item[i].start["dateTime"]).substring(0,10);
          var t2 = (parseDate(incoming)).getTime();
          var t1 = today.getTime();
//compute days difference
          var diff =  Math.ceil((t2-t1)/(24*60*60*1000));
          result.push(diff);
        }
      }
      return result;
}

// var item = [{"summary":"test", "start": {"dateTime":"2019-03-07T03:00:00abc"}}, {"summary":"makeout", "start": {"dateTime":"2019-03-05T03:00:00"}},
// {"summary":"test", "start": {"dateTime":"2019-03-05T03:00:00"}}];
// console.log(daysToTest(item));
// console.log(Math.min.apply(null,daysToTest(item)));

function messType(dtt,prod){
  var countdown = Math.min.apply(null,dtt);
  var result = 0;
  if (-1 <= prod <= 1) {
    if (countdown = 8){
      return 0;
    }
    if (2<=countdown <= 7){
      return 1;
    }
    if (countdown=1){
      return -1;
    }
  }

  if (prod = -2){
    if (countdown = 8){
      return -2;
    }
    if (2<=countdown <= 7){
      return -3;
    }
    if (countdown=1){
      return -4;
    }
  }

  if (prof = 2){
    if (countdown = 8){
      return 4;
    }
    if (2<=countdown <= 7){
      return 3;
    }
    if (countdown=1){
      return 2;
    }
  }
}

//return "friendly" message

function genMess(type){
    var type0 = [""];

    var type1 = [""];

    var type2 = [""];

    var type0 = [""];

    var type1 = [""];

    var type1 = [""];

    var type0 = [""];

    var type1 = [""];

    var type1 = [""];
}
