// 인풋 데이터 형식 2020-12-31 00:59
const scheduleKye = document.querySelector(".schedule__key");
const scheduleAdd = document.querySelector(".schedule__add");
const scheduleContainer = document.querySelector(".schedule__container");
const repeatInput = document.querySelector(".repeat__input");
const repeatSelect = document.querySelector("#repeat__select");
const scheduleDate = document.querySelector(".schedule__date");
const scheduleTime = document.querySelector(".schedule__time");
const scheduleForm = document.querySelector(".schedule__form");
const scheduleExit = document.querySelector(".schedule__exit");

const setDate = () => {
  const currentTimeObj = getTime();
  const currentDateObj = getDate();
  scheduleDate.value = getDateFormat(currentDateObj);
  scheduleTime.value = getTimeFormat(currentTimeObj, "addTime");
};

const resetForm = () => {
  const schedule = document.querySelectorAll(".schedule__input");
  for (let i = 0; i < schedule.length; i++) {
    if (i === 0) {
      schedule[i].value = "";
    } else {
      schedule[i].remove();
    }
  }
  repeatSelect.value = 0;
  repeatInput.value = 0;
};

const getScheduleList = () => {
  const schedule = document.querySelectorAll(".schedule__input");
  const scheduleList = [];

  for (let i = 0; i < schedule.length; i++) {
    const value = schedule[i].value;
    if (!value) {
      continue;
    } else {
      scheduleList.push(value);
    }
  }
  return scheduleList;
};

const setData = () => {
  const scheduleList = getScheduleList();

  const date = scheduleDate.value;
  const time = scheduleTime.value;
  const repeat = repeatSelect.value;
  const repeatTime = repeatInput.value;
  const currentDate = new Date().getTime();
  const getTimeDate = new Date(`${date} ${time}:00`).getTime();
  const alarmDate = getTimeDate - currentDate;
  const key = getTimeDate / 1000 + "" + currentDate;

  if (alarmDate / 1000 <= 0) {
    alert("등록할 수 없는 시간입니다.");
    return;
  } else {
    const storageObj = {
      scheduleList,
      date,
      time,
      getTimeDate,
      alarmDate,
      key,
      repeat,
      repeatTime
    };
    setStorage(storageObj);
    resetForm();
  }
};

scheduleForm.addEventListener("submit", e => {
  e.preventDefault();
  setData();
  if (scheduleKye.value) {
    chrome.alarms.clear(scheduleKye.value);
    chrome.storage.local.remove(scheduleKye.value);
  }
});

scheduleAdd.addEventListener("click", () => {
  let input = document.createElement("input");
  input.type = "text";
  input.className = "schedule__input";
  input.setAttribute("placeholder", "일정을 입력하세요.");
  scheduleContainer.appendChild(input);
});

scheduleExit.addEventListener("click", () => {
  resetForm();
  iconContent.click();
});

const initAdd = () => {};

initAdd();
