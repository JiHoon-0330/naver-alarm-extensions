// 12313 2020-12-31 00:59  // "2019/05/16/0:0:10"

const clock = document.querySelector(".clock");
const ampm = document.querySelector(".ampm");
const date = document.querySelector(".add__date");
const time = document.querySelector(".add__time");

const getDateTime = option => {
  const date = new Date();

  if (option === "time") {
    const dateObj = {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    };
    return dateObj;
  } else {
    const dateObj = {
      year: date.getFullYear(),
      day: date.getDate(),
      month: date.getMonth() + 1
    };
    return dateObj;
  }
};

const getAMPM = hours => (hours >= 12 ? "PM" : "AM");

const getTime = () => {
  const { hours, minutes, seconds } = getDateTime("time");

  ampm.textContent = `${getAMPM(hours)}`;
  clock.textContent = `
    ${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}
    `;
};

const setDate = () => {
  const { year, month, day } = getDateTime("date");
  const { hours, minutes } = getDateTime("time");

  date.value = `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
  time.value = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
};

const init = () => {
  getTime();
  setDate();
  setInterval(getTime, 1000);
};

init();
