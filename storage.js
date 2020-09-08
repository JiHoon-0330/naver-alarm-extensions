const setStorage = data => {
  const storage = {};
  const { key, alarmDate, getTimeDate } = data;
  storage[key] = data;

  chrome.storage.local.set(storage, () => {
    if (getTimeDate > parseInt(Date.now())) {
      chrome.alarms.create(`${key}`, {
        when: Date.now() + alarmDate
      });
    }
  });
};

const getAllStorage = callback => {
  chrome.storage.local.get(null, result => {
    const keys = Object.keys(result);
    keys.sort();
    callback(result, keys);
  });
};

const changedStorage = callback => {
  chrome.storage.onChanged.addListener(callback);
};
