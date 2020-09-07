let ul = document.querySelector("body > div > ul");
let span = document.querySelector("body > div > span");
const exit = document.querySelector("#exit");
const repeatFive = document.querySelector("#repeat__five");
const audio = document.querySelector("audio");

exit.addEventListener("click", () => {
  location.href = "index.html";
});

repeatFive.addEventListener("click", () => {
  const scheduleList = [];
  const scheduleLi = document.querySelectorAll(".schedule__li");
  const preTimeDate = parseInt(document.querySelector(".getTimeDate").value);
  const repeat = parseInt(document.querySelector(".repeat").value);
  const repeatTime = parseInt(document.querySelector(".repeatTime").value);

  const currentDate = new Date().getTime();
  const getTimeDate = preTimeDate + 300000;
  const newDate = new Date();
  newDate.setTime(getTimeDate);
  const alarmDate = getTimeDate - currentDate;
  const key = getTimeDate / 1000 + "" + currentDate;

  const dateObj = getDate(newDate);
  const timeObj = getTime(newDate);
  const date = getDateFormat(dateObj);
  const time = getTimeFormat(timeObj);

  for (let i = 0; i < scheduleLi.length; i++) {
    const value = scheduleLi[i].textContent;

    if (!value) {
      continue;
    } else {
      scheduleList.push(value);
    }
  }
  const obj = {
    scheduleList,
    date,
    time,
    getTimeDate,
    alarmDate,
    key,
    repeat,
    repeatTime
  };

  setStorage(obj);

  location.href = "index.html";
});

const printSchedule = data => {
  const {
    scheduleList,
    date,
    time,
    getTimeDate,
    alarmDate,
    key,
    repeat,
    repeatTime
  } = data;

  document.querySelector(".date").value = date;
  document.querySelector(".time").value = time;
  document.querySelector(".getTimeDate").value = getTimeDate;
  document.querySelector(".alarmDate").value = alarmDate;
  document.querySelector(".key").value = key;
  document.querySelector(".repeat").value = repeat;
  document.querySelector(".repeatTime").value = repeatTime;
  span.textContent = `${date} ${time}`;

  for (let i = 0; i < scheduleList.length; i++) {
    let text = scheduleList[i];
    let li = document.createElement("li");
    li.className = "schedule__li";
    li.appendChild(document.createTextNode(text));
    ul.appendChild(li);
  }

  chrome.storage.local.get("options", result => {
    if (!Object.keys(result).length) {
      return;
    } else {
      const { volume, music } = result["options"];
      if (music) {
        audio.setAttribute("src", `audio/${music}`);
      }
      audio.volume = volume / 10;
    }
  });
};

const getData = (data, keys) => {
  let time = null;
  for (let i = 0; i < keys.length; i++) {
    const { getTimeDate } = data[keys[i]];
    if (time) {
      if (!(time == getTimeDate)) {
        return;
      } else {
        printSchedule(data[keys[i]]);
      }
    } else {
      time = getTimeDate;
      printSchedule(data[keys[i]]);
    }
  }
};

const initTest = () => {
  getAllStorage(getData);
};

initTest();
