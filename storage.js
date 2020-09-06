const setStorage = data => {
  const storage = {};
  const { key, alarmDate } = data;
  console.log(``, key, alarmDate);
  storage[key] = data;

  chrome.storage.local.set(storage, () => {
    chrome.alarms.create(`${key}`, {
      when: Date.now() + alarmDate
    });
  });
};
