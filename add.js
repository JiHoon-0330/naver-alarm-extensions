// 인풋 데이터 형식 2020-12-31 00:59

const addSchedule = document.querySelector("#add__schedule");
const addMusic = document.querySelector("#add__music");
const addRepeat = document.querySelector("#add__repeat");
const repeat = document.querySelector("#repeat");
const addSubmit = document.querySelector("#add_submit");
const addCancel = document.querySelector("#add_cancel");

const content = document.querySelector("#content");
const addForm = document.querySelector("#add__form");
const optionContent = document.querySelector("#option__Content");

const list = document.querySelector("#list");
const add = document.querySelector("#add");
const clear = document.querySelector("#clear");
const option = document.querySelector("#option");

list.addEventListener("click", () => {
  location.reload();
});

add.addEventListener("click", () => {
  addForm.classList.contains("hidden") && addForm.classList.remove("hidden");
  !content.classList.contains("hidden") && content.classList.add("hidden");
  !optionContent.classList.contains("hidden") &&
    optionContent.classList.add("hidden");
});

option.addEventListener("click", () => {
  optionContent.classList.contains("hidden") &&
    optionContent.classList.remove("hidden");
  !addForm.classList.contains("hidden") && addForm.classList.add("hidden");
  !content.classList.contains("hidden") && content.classList.add("hidden");
});

clear.addEventListener("click", () => {
  const result = confirm("일정목록을 초기화 하시겠습니까?");
  if (!result) {
    return;
  } else {
    chrome.storage.local.clear();
    chrome.alarms.clearAll(() => {
      console.log("clear");
    });
    location.reload();
  }
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

addForm.addEventListener("submit", e => {
  e.preventDefault();
  setData();
});

const initAdd = () => {};

initAdd();
