// 인풋 데이터 형식 2020-12-31 00:59

const content = document.querySelector("#content");
const addForm = document.querySelector("#add__form");
const addSchedule = document.querySelector("#add__schedule");
const addMusic = document.querySelector("#add__music");
const addSubmit = document.querySelector("#add_submit");
const add = document.querySelector("#add");
const addCancel = document.querySelector("#add_cancel");
const clear = document.querySelector("#clear");
const addRepeat = document.querySelector("#add__repeat");
const repeat = document.querySelector("#repeat");
const button = document.querySelector(".button");

add.addEventListener("click", () => {
  content.classList.toggle("hidden");
  addForm.classList.toggle("hidden");
  button.classList.toggle("hidden");
});

clear.addEventListener("click", () => {
  chrome.storage.local.clear();
  chrome.alarms.clearAll(() => {
    console.log("clear");
  });
});

addCancel.addEventListener("click", () => {
  location.reload();
});

const setData = () => {
  const schedule = addSchedule.value;
  const date = addDate.value;
  const time = addTime.value;
  const music = addMusic.value;
  const patten = addRepeat.value * repeat.value;
  const currentDate = new Date().getTime();
  const getTimeDate = new Date(`${date} ${time}:00`).getTime();
  const scheduleDate = getTimeDate - currentDate;
  const key = getTimeDate / 1000;

  console.log(``, patten);
  if (scheduleDate / 1000 <= 0) {
    alert("등록할 수 없는 시간입니다.");
    return;
  } else {
    const storageObj = {
      schedule,
      date,
      time,
      music,
      getTimeDate,
      scheduleDate,
      key,
      patten
    };
    console.log(``, storageObj);
    setStorage(storageObj);
  }
};

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

addForm.addEventListener("submit", e => {
  e.preventDefault();
  setData();
});

const initAdd = () => {};

initAdd();
