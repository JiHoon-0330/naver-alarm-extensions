// 12313 2020-12-31 00:59  // "2019/05/16/0:0:10"

const clock = document.querySelector(".clock");
const ampm = document.querySelector(".ampm");
const addDate = document.querySelector(".add__date");
const addTime = document.querySelector(".add__time");

const getDate = (date = new Date()) => {
  const currentDate = date;
  const year = currentDate.getFullYear();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const currentDateObj = {
    year,
    day,
    month
  };

  return currentDateObj;
};

const getTime = (time = new Date()) => {
  const currentTime = time;
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const currentTimeObj = {
    hours,
    minutes,
    seconds
  };

  return currentTimeObj;
};

const getDateFormat = date => {
  const { year, month, day } = date;
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};

const getTimeFormat = (time, options) => {
  const { hours, minutes, seconds } = time;

  if (options === "clock") {
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  } else {
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`;
  }
};

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
