const setStorage = data => {
  const storage = {};
  const { key, getTimeDate, alarmDate } = data;

  if (getTimeDate > Date.now()) {
    chrome.alarms.create(key + "", {
      when: Date.now() + alarmDate
    });
  }
  storage[key] = data;
  chrome.storage.local.set(storage, () => {});
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
