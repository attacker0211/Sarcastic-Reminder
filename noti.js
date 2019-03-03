window.addEventListener('load', function () {
  // At first, let's check if we have permission for notification
  // If not, let's ask for it
  chrome.notifications.getPermissionLevel(function(result) {
    console.log(result);
  });
  if (window.Notification && Notification.permission !== "granted") {
    Notification.requestPermission(function (status) {
      if (Notification.permission !== status) {
        Notification.permission = status;
      }
    });
  }

  var noti_but = document.getElementById("test_noti");

if(noti_but) {
  document.getElementById("test_noti").addEventListener('click', function () {
    console.log("a1");
    chromeNotify();
  }); /* everything in this scope runs when the "black test button" is clicked*/

}


}); /* everything in this scope runs when the window is loaded */


// chrome notification
function chromeNotify() {
  chrome.notifications.getPermissionLevel(function(result) {
    if(result === "granted") {
      var opt = {
        iconUrl: "https://www.google.com/favicon.ico",
        type: 'list',
        title: 'Primary Title',
        message: 'Primary message to display',
        priority: 1,
        items: [
          { title: 'Item1', message: 'This is item 1.'},
          { title: 'Item2', message: 'This is item 2.'},
          { title: 'Item3', message: 'This is item 3.'}
        ]
      };
      chrome.notifications.create('notify1', opt, function() {
        console.log('created!');
        console.log("Last error:", chrome.runtime.lastError);
      });
    }
  });
  console.log("a2");
}
