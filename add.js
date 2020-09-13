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
  days.forEach(day => {
    day.checked = false;
  });
  disableElement(checkDays());
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

const getFormDate = checkDays => {
  const scheduleList = getScheduleList();
  const currentDate = new Date();
  let date = scheduleDate.value;
  const time = scheduleTime.value;
  let dayArr = null;
  if (checkDays) {
    let newDate = new Date();
    let dateObj = null;
    let getTimeDate = null;
    let alarmDate = null;
    let key = null;
    let repeat = null;
    let repeatTime = null;
    let onAlarm = null;
    let first = true;
    dayArr = getDays();
    for (let i = 0; i < dayArr.length; i++) {
      day = dayArr[i];
      if (day < currentDate.getDay()) {
        day += 7;
      } else if (first) {
        first = false;
        newDate.setTime(
          currentDate.getTime() + (day - currentDate.getDay()) * 86400000
        );
        dateObj = getDate(newDate);
        date = getDateFormat(dateObj);
        getTimeDate = new Date(`${date} ${time}`).getTime();
        alarmDate = getTimeDate - currentDate.getTime();
        key = getTimeDate / 1000 + "" + currentDate.getTime();
        repeat = "0";
        repeatTime = "";
        onAlarm = getTimeDate > currentDate.getTime();
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
      repeatTime,
      onAlarm,
      dayArr
    };

    return obj;
  } else {
    const repeat = repeatSelect.value;
    const repeatTime = repeat === "0" ? "" : repeatInput.value;
    const getTimeDate = new Date(`${date} ${time}:00`).getTime();
    const alarmDate = getTimeDate - currentDate.getTime();
    const onAlarm = getTimeDate > currentDate.getTime();
    const key = getTimeDate / 1000 + "" + currentDate.getTime();

    if (alarmDate / 1000 <= 0) {
      alert("일정 등록은 현재 시간 이후로 가능합니다.");
      return;
    } else {
      const obj = {
        scheduleList,
        date,
        time,
        getTimeDate,
        alarmDate,
        key,
        repeat,
        repeatTime,
        onAlarm,
        dayArr
      };

      return obj;
    }
  }
};

const setData = () => {
  const storageObj = getFormDate(checkDays());
  console.log(storageObj);
  setStorage(storageObj);
  resetForm();
  successSubmit("일정이 등록되었습니다.", "schedule");
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
      return check;
    }
  }
  return check;
};

const disableElement = check => {
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

const getDays = () => {
  const arr = [];
  days.forEach(day => {
    if (day.checked) {
      console.log(day.value);
      arr.push(day.value);
    }
  });
  return arr;
};

days.forEach(day => {
  day.addEventListener("change", () => {
    disableElement(checkDays());
  });
});

const initAdd = () => {};

initAdd();
