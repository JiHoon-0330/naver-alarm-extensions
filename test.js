let body = document.querySelector("body");

const removeKey = key => {
  chrome.storage.local.remove(key);
};

const printSchedule = (data, key) => {
  console.log(``, data[key].schedule);
  body.innerHTML = `<h1>${data[key].schedule}</h1>`;
  removeKey(key);
};

const getFirstKey = () => {
  chrome.storage.local.get(null, result => {
    const keys = Object.keys(result);
    keys.sort();
    console.log(keys[0]);
    getFirstData(keys[0]);
  });
};

const getFirstData = key => {
  chrome.storage.local.get(key, result => {
    printSchedule(result, key);
  });
};

const initTest = () => {
  getFirstKey();
};

initTest();
