let h1 = document.querySelector("h1");
const exit = document.querySelector("#exit");
const repeatFive = document.querySelector("#repeat__five");
const firstData = {};
let firstKey = null;

exit.addEventListener("click", () => {
  location.href = "index.html";
});

repeatFive.addEventListener("click", () => {
  const { schedule, music, getTimeDate: preTimeDate, patten } = firstData[
    firstKey
  ];

  let { scheduleDate, key } = firstData[firstKey];
  console.log(key);

  const currentDate = new Date().getTime();
  const getTimeDate = preTimeDate + 300000;
  const newDate = new Date();
  newDate.setTime(getTimeDate);
  scheduleDate = getTimeDate - currentDate;
  key = getTimeDate / 1000;

  const dateObj = getDate(newDate);
  const timeObj = getTime(newDate);
  const date = getDateFormat(dateObj);
  const time = getTimeFormat(timeObj);

  const obj = {
    schedule,
    date,
    time,
    music,
    getTimeDate,
    scheduleDate,
    key,
    patten
  };
  console.log(obj.key);
  setStorage(obj);

  location.href = "index.html";
});

const printSchedule = data => {
  const { schedule, key } = data;
  firstData[key] = data;
  firstKey = key;
  h1.textContent = schedule;
};

const getFirstKey = () => {
  chrome.storage.local.get(null, result => {
    const keys = Object.keys(result);
    keys.sort();
    getFirstData(keys[0]);
  });
};

const getFirstData = key => {
  chrome.storage.local.get(key, result => {
    printSchedule(result[key]);
  });
};

const initTest = () => {
  getFirstKey();
};

initTest();
