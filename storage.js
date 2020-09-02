const setStorage = data => {
  const storage = {};
  const { key, scheduleDate } = data;
  console.log(``, key, scheduleDate);
  storage[key] = data;

  chrome.storage.local.set(storage, () => {
    chrome.alarms.create(`""${key}`, {
      when: Date.now() + scheduleDate
    });
  });
};
