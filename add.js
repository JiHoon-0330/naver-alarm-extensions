/* <li>
  <span>1111111111111111111111111111111111111111111111111111111111111</span>
  <i class="fas fa-trash-alt"></i>
</li>; */

// 12313 2020-12-31 00:59

const content = document.querySelector(".content");
const form = document.querySelector(".add__form");
const schedule = document.querySelector(".add__schedule");
const music = document.querySelector(".add__music");
const submit = document.querySelector(".add_submit");
const add = document.querySelector(".add");
const cancel = document.querySelector(".add_cancel");

add.addEventListener("click", () => {
  content.classList.toggle("hidden");
  form.classList.toggle("hidden");
  add.classList.toggle("hidden");
});

cancel.addEventListener("click", () => {
  location.reload();
});

form.addEventListener("submit", e => {
  e.preventDefault();
  const dataStorage = {};
  const currentDate = new Date().getTime();
  const addDate = new Date(`${date.value} ${time.value}:00`).getTime();
  const scheduleDate = (addDate - currentDate) / 1000;
  const key = addDate / 10000;
  if (scheduleDate <= 0) {
    alert("등록할 수 없는 시간입니다.");
    return;
  }

  const data = {
    schedule: schedule.value,
    date: date.value,
    time: time.value,
    music: music.value,
    key: key
  };

  dataStorage[key] = data;

  console.log(dataStorage);
  chrome.storage.local.set(dataStorage, () => {
    chrome.alarms.create(`""${addDate}`, {
      //   when: Date.now() + scheduleDate
      when: Date.now() + (addDate - currentDate)
    });
    console.log(`저장 완료`);
  });
  console.log(``, data, addDate);
});

const initAdd = () => {};

initAdd();
