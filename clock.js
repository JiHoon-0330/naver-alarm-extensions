// 12313 2020-12-31 00:59  // "2019/05/16/0:0:10"

const clockTime = document.querySelector(".clock__time");
const clockAmpm = document.querySelector(".clock__ampm");
const scheduleDate = document.querySelector(".schedule__date");
const scheduleTime = document.querySelector(".schedule__time");

const getAMPM = time => {
  const { hours } = time;
  return hours >= 12 ? "PM" : "AM";
};

const setDate = () => {
  const currentTimeObj = getTime();
  const currentDateObj = getDate();
  scheduleDate.value = getDateFormat(currentDateObj);
  scheduleTime.value = getTimeFormat(currentTimeObj, "addTime");
};

const setDateTime = () => {
  const currentTimeObj = getTime();
  clockTime.textContent = getTimeFormat(currentTimeObj, "clock");
  clockAmpm.textContent = getAMPM(currentTimeObj);
};

const initClock = () => {
  setDate();
  setDateTime();
  setInterval(setDateTime, 1000);
};

initClock();
