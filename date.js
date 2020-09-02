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
