chrome.alarms.onAlarm.addListener(alarm => {
  chrome.windows.getCurrent(function (window) {
    const winId = window.id;
    const state = "minimized";
    if (window.state == state) {
      chrome.windows.update(winId, { state: "maximized" });
    }
    whale.sidebarAction.show({
      url: whale.runtime.getURL("alarm.html")
    });
  });
});
