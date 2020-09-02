// 12313 2020-12-31 00:59  // "2019/05/16/0:0:10"

const clock = document.querySelector(".clock");
const ampm = document.querySelector(".ampm");
const addDate = document.querySelector(".add__date");
const addTime = document.querySelector(".add__time");

const getAMPM = time => {
  const { hours } = time;
  return hours >= 12 ? "PM" : "AM";
};

const setDate = () => {
  const currentTimeObj = getTime();
  const currentDateObj = getDate();
  addDate.value = getDateFormat(currentDateObj);
  addTime.value = getTimeFormat(currentTimeObj, "addTime");
};

const setDateTime = () => {
  const currentTimeObj = getTime();
  clock.textContent = getTimeFormat(currentTimeObj, "clock");
  ampm.textContent = getAMPM(currentTimeObj);
};

const initClock = () => {
  setDate();
  setDateTime();
  setInterval(setDateTime, 1000);
};

initClock();
