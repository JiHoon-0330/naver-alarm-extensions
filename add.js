// 인풋 데이터 형식 2020-12-31 00:59
const scheduleKye = document.querySelector(".schedule__key");
const scheduleAdd = document.querySelector(".schedule__add");
const scheduleContainer = document.querySelector(".schedule__container");
const repeatInput = document.querySelector(".repeat__input");
const repeatSelect = document.querySelector("#repeat__select");
const scheduleDate = document.querySelector(".schedule__date");
const scheduleTime = document.querySelector(".schedule__time");
const scheduleExit = document.querySelector(".schedule__exit");
const days = document.querySelectorAll(".days");

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
  repeatInput.value = "";
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
  console.log(repeat === "0");
  const repeatTime = repeat === "0" ? "" : repeatInput.value;
  const currentDate = new Date().getTime();
  const getTimeDate = new Date(`${date} ${time}:00`).getTime();
  const alarmDate = getTimeDate - currentDate;
  const onAlarm = getTimeDate > currentDate;
  const key = getTimeDate / 1000 + "" + currentDate;

  if (alarmDate / 1000 <= 0) {
    alert("일정 등록은 현재 시간 이후로 가능합니다.");
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
      repeatTime,
      onAlarm
    };
    setStorage(storageObj);
    resetForm();
    successSubmit("일정이 등록되었습니다.", "schedule");
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

const checkDays = () => {
  let check = false;
  for (let i = 0; i < days.length; i++) {
    if (days[i].checked) {
      check = true;
    }
  }
  if (check) {
    if (!document.querySelector(".date").classList.contains("hidden__input")) {
      document.querySelector(".date").classList.add("hidden__input");
      document
        .querySelector(".schedule__repeat")
        .classList.add("hidden__input");
      repeatSelect.classList.add("readOnly");
      scheduleDate.readOnly = true;
      repeatInput.readOnly = true;
    }
  } else {
    document.querySelector(".date").classList.remove("hidden__input");
    document
      .querySelector(".schedule__repeat")
      .classList.remove("hidden__input");
    repeatSelect.classList.remove("readOnly");
    scheduleDate.readOnly = false;
    repeatInput.readOnly = false;
  }
};

days.forEach(day => {
  day.addEventListener("click", () => {
    checkDays();
  });
});

const initAdd = () => {};

initAdd();
