chrome.alarms.onAlarm.addListener(() => {
  chrome.windows.getCurrent(window => {
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
