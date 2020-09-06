let ul = document.querySelector("body > div > ul");
const exit = document.querySelector("#exit");
const repeatFive = document.querySelector("#repeat__five");
const audio = document.querySelector("audio");
const firstData = {};
const schedule = [];
let firstKey = null;

exit.addEventListener("click", () => {
  location.href = "index.html";
});

repeatFive.addEventListener("click", () => {
  const { scheduleList, getTimeDate: preTimeDate, patten } = firstData[
    firstKey
  ];

  let { alarmDate, key } = firstData[firstKey];
  console.log(key);

  const currentDate = new Date().getTime();
  const getTimeDate = preTimeDate + 300000;
  const newDate = new Date();
  newDate.setTime(getTimeDate);
  alarmDate = getTimeDate - currentDate;
  key = getTimeDate / 1000 + "" + currentDate;

  const dateObj = getDate(newDate);
  const timeObj = getTime(newDate);
  const date = getDateFormat(dateObj);
  const time = getTimeFormat(timeObj);

  const obj = {
    scheduleList,
    date,
    time,
    getTimeDate,
    alarmDate,
    key,
    patten
  };
  console.log(obj.key);
  setStorage(obj);

  location.href = "index.html";
});

const printSchedule = data => {
  console.log(data.length);
  for (let i = 0; i < data.length; i++) {
    let text = data[i];
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    ul.appendChild(li);
  }

  chrome.storage.local.get("options", result => {
    if (!Object.keys(result).length) {
      return;
    } else {
      const { volume, music } = result["options"];
      audio.setAttribute("src", `audio/${music}`);
      audio.volume = volume / 10;
    }
  });
};

const setData = data => {
  console.log(``, data, data.length);
  for (let i = 0; i < data.length; i++) {
    schedule.push(data[i]);
  }
};

const getData = (data, keys) => {
  let time = null;
  for (let i = 0; i < keys.length; i++) {
    const { scheduleList, getTimeDate } = data[keys[i]];
    if (time) {
      if (!(time == getTimeDate)) {
        return;
      } else {
        printSchedule(scheduleList);
      }
    } else {
      time = getTimeDate;
      printSchedule(scheduleList);
    }
  }
};

const initTest = () => {
  getAllStorage(getData);
};

initTest();
