// 인풋 데이터 형식 2020-12-31 00:59
const scheduleKye = document.querySelector(".schedule__key");
const scheduleAdd = document.querySelector(".schedule__add");
const scheduleContainer = document.querySelector(".schedule__container");
const repeatInput = document.querySelector(".repeat__input");
const repeatSelect = document.querySelector("#repeat__select");

const contentContainer = document.querySelector(".content__container");
const scheduleForm = document.querySelector(".schedule__form");
const optionForm = document.querySelector(".option__form");

const iconContent = document.querySelector(".icon__content");
const iconForm = document.querySelector(".icon__form");
const iconClear = document.querySelector(".icon__clear");
const iconOption = document.querySelector(".icon__option");

iconContent.addEventListener("click", () => {
  location.reload();
});

iconForm.addEventListener("click", () => {
  scheduleForm.classList.contains("hidden") &&
    scheduleForm.classList.remove("hidden");
  !contentContainer.classList.contains("hidden") &&
    contentContainer.classList.add("hidden");
  !optionForm.classList.contains("hidden") &&
    optionForm.classList.add("hidden");
});

iconOption.addEventListener("click", () => {
  optionForm.classList.contains("hidden") &&
    optionForm.classList.remove("hidden");
  !scheduleForm.classList.contains("hidden") &&
    scheduleForm.classList.add("hidden");
  !contentContainer.classList.contains("hidden") &&
    contentContainer.classList.add("hidden");
});

iconClear.addEventListener("click", () => {
  const result = confirm("일정목록을 초기화 하시겠습니까?");
  if (!result) {
    return;
  } else {
    getAllStorage((data, keys) => {
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (k == "options") {
          continue;
        } else {
          chrome.storage.local.remove(k);
        }
      }
    });
    chrome.alarms.clearAll(() => {
      console.log("clear");
    });
    location.reload();
  }
});

scheduleAdd.addEventListener("click", () => {
  let input = document.createElement("input");
  input.type = "text";
  input.className = "schedule__input";
  input.setAttribute("placeholder", "일정을 입력하세요.");
  scheduleContainer.appendChild(input);
});

const getScheduleList = () => {
  const schedule = document.querySelectorAll(".schedule__input");
  const scheduleList = [];

  console.log(schedule);
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
  const patten = repeatInput.value * repeatSelect.value;
  const currentDate = new Date().getTime();
  const getTimeDate = new Date(`${date} ${time}:00`).getTime();
  const alarmDate = getTimeDate - currentDate;
  const key = getTimeDate / 1000 + "" + currentDate;

  if (scheduleDate / 1000 <= 0) {
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
      patten
    };
    console.log(``, storageObj);
    setStorage(storageObj);
  }
};

scheduleForm.addEventListener("submit", e => {
  e.preventDefault();
  setData();
  if (scheduleKye.value) {
    chrome.alarms.clear(scheduleKye.value);
    chrome.storage.local.remove(scheduleKye.value);
  }
  location.reload();
});

const initAdd = () => {};

initAdd();
