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
