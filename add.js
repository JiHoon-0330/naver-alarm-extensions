// 인풋 데이터 형식 2020-12-31 00:59

const content = document.querySelector(".content");
const addForm = document.querySelector(".add__form");
const addSchedule = document.querySelector(".add__schedule");
const addMusic = document.querySelector(".add__music");
const addSubmit = document.querySelector(".add_submit");
const add = document.querySelector(".add");
const addCancel = document.querySelector(".add_cancel");

add.addEventListener("click", () => {
  content.classList.toggle("hidden");
  addForm.classList.toggle("hidden");
  add.classList.toggle("hidden");
});

addCancel.addEventListener("click", () => {
  location.reload();
});

const setData = () => {
  const schedule = addSchedule.value;
  const date = addDate.value;
  const time = addTime.value;
  const music = addMusic.value;
  const currentDate = new Date().getTime();
  const getTimeDate = new Date(`${date} ${time}:00`).getTime();
  const scheduleDate = getTimeDate - currentDate;
  const key = getTimeDate / 1000;
  console.log(``, getTimeDate, currentDate);
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
      patten: "everyday"
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
    console.log(
      `저장 완료, 데이터 =>
    `,
      storage
    );
  });
};

addForm.addEventListener("submit", e => {
  e.preventDefault();
  setData();
});

const initAdd = () => {};

initAdd();
