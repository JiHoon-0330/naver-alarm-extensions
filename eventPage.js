chrome.alarms.onAlarm.addListener(function (alarm) {
  
  chrome.windows.getCurrent(function (window) {
      var winId = window.id;
      var state = 'minimized';
      if (window.state == state) {
          chrome.windows.update(winId, { state: 'maximized' });
      }
    });
  whale.sidebarAction.show({
    url: whale.runtime.getURL('alarm.html')
  });
  var memo = document.getElementById('hidden').value;
  var memoData;
  chrome.storage.sync.get(memo, function (result) {
    //alert(result[memo]);
    memoData = result[memo];
    chrome.storage.local.set({'test':memoData}, function () {
     // alert(memoData);
  });
 });

  chrome.storage.sync.remove(memo);
  location.reload();
});
