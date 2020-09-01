const clock = document.querySelector(".clock");
const ampm = document.querySelector(".ampm");

const getDateTime = option => {
  const date = new Date();

  if (option === "time") {
    const dateObj = {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    };

    return dateObj;
  }

  const year = date.getFullYear();
  const day = date.getDate();
  const month = date.getMonth() + 1;
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

const init = () => {
  getTime();
  setInterval(getTime, 1000);
};

init();
