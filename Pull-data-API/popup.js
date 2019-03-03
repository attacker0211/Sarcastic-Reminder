// convert string to date
function parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[0], mdy[1]-1, mdy[2]);
}

// identify days to test
function daysToNextTest(item){
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
      var countdown = Math.min.apply(null,result);
      return countdown;
}

// var item = [{"summary":"test", "start": {"dateTime":"2019-03-07T03:00:00abc"}}, {"summary":"makein", "start": {"dateTime":"2019-03-05T03:00:00"}},
// {"summary":"test", "start": {"dateTime":"2019-03-09T03:00:00"}}];
// return message type from day to exam and


function messType(countdown,prod){
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
console.log(messType(5,2));

//return "friendly" message

function genMess(type){

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
      return t1[Math.floor(Math.random()*t1.length)];}
    if (type == 2){
      return t2[Math.floor(Math.random()*t1.length)];}
    if (type == 3){
      return t3[Math.floor(Math.random()*t1.length)];}
    if (type == 4){
      return t4[Math.floor(Math.random()*t1.length)];}

    if (type == -1){
      return tneg1[Math.floor(Math.random()*tneg1.length)];}
    if (type == -2){
      return tneg2[Math.floor(Math.random()*tneg2.length)];}
    if (type == -3){
      return tneg3[Math.floor(Math.random()*tneg3.length)];}
    if (type == -4){
      return tneg4[Math.floor(Math.random()*tneg4.length)];}
}
