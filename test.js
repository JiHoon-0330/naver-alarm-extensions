let h1 = document.querySelector("h1");
const exit = document.querySelector("#exit");
const repeatFive = document.querySelector("#repeat__five");
const firstData = {};
let firstKey = null;

const getDate = (date = new Date()) => {
  const currentDate = date;
  const year = currentDate.getFullYear();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const currentDateObj = {
    year,
    day,
    month
  };

  return currentDateObj;
};

const getTime = (time = new Date()) => {
  const currentTime = time;
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const currentTimeObj = {
    hours,
    minutes,
    seconds
  };

  return currentTimeObj;
};

const getDateFormat = date => {
  const { year, month, day } = date;
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};

const getTimeFormat = (time, options) => {
  const { hours, minutes, seconds } = time;

  if (options === "clock") {
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  } else {
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`;
  }
};

const setStorage = data => {
  const storage = {};
  const { key, scheduleDate } = data;

  storage[key] = data;

  chrome.storage.local.set(storage, () => {
    chrome.alarms.create(`""${key}`, {
      when: Date.now() + scheduleDate
    });
  });
};

console.log(``, exit, repeatFive);
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
