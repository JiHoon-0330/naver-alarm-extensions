/* <li>
  <span>1111111111111111111111111111111111111111111111111111111111111</span>
  <i class="fas fa-trash-alt"></i>
</li>; */

const ul = document.querySelector(".content__container > ul");

const toggleHidden = child => {
  for (let i = 1; i < child.length; i++) {
    if (!(child[i].tagName === "SPAN")) {
      console.log(child[i].classList.contains("content__more"));
      if (child[i].classList.contains("content__more")) {
        child[i].classList.toggle("fa-angle-double-down");
        child[i].classList.toggle("fa-angle-double-up");
        break;
      }
    } else {
      child[i].classList.toggle("hidden");
    }
  }
};

const getPatten = (repeat, repeatTime) => {
  if (!repeat) {
    return "";
  } else {
    if (repeat >= 86400000) {
      return `<i class="fas fa-history"></i> ${repeatTime}일`;
    } else if (repeat >= 3600000) {
      return `<i class="fas fa-history"></i> ${repeatTime}시간`;
    } else {
      return `<i class="fas fa-history"></i> ${repeatTime}분`;
    }
  }
};

const printLi = data => {
  let li = "";
  const hidden = "hidden";
  const moreButton = `<i class="fas fa-angle-double-down content__more"></i>`;
  let span = "";
  const {
    scheduleList,
    date,
    time,
    getTimeDate,
    key,
    repeat,
    repeatTime
  } = data;
  const test = getPatten(parseInt(repeat), repeatTime);
  for (let j = 0; j < scheduleList.length; j++) {
    span += `<span class="schedule ${j > 0 ? hidden : ""}">${
      scheduleList[j]
    }</span>`;
  }

  li += `
  <li id="${key}" class="content__li">
    <div class="content__content">
      ${span}
      ${scheduleList.length > 1 ? moreButton : ""}
      <span class="datetime">${date} ${time} </span>
      <span class="patten">${test}</span>
    </div>
    <div class="content__icons">
      <i class="fas fa-pencil-alt"></i>
      <i class="fas fa-trash-alt"></i>
    </div>
  </li>`;

  return li;
};

const setEvent = () => {
  let pencil = document.querySelectorAll(".content__icons > .fa-pencil-alt");
  let trash = document.querySelectorAll(".content__icons > .fa-trash-alt");
  let allList = document.querySelectorAll(".content__content > .content__more");

  for (let i = 0; i < pencil.length; i++) {
    pencil[i].addEventListener("click", e => {
      console.log(e.target.parentNode.parentNode.id);
      modifyContent(e.target.parentNode.parentNode.id);
    });
    trash[i].addEventListener("click", e => {
      if (!confirm("일정을 삭제하시겠습니까?")) {
        return;
      } else {
        chrome.alarms.clear(e.target.parentNode.parentNode.id);
        chrome.storage.local.remove(e.target.parentNode.parentNode.id);
        e.target.parentNode.parentNode.remove();
      }
    });
  }

  for (let i = 0; i < allList.length; i++) {
    allList[i].addEventListener("click", e => {
      toggleHidden(e.target.parentNode.children);
    });
  }
};

const printContent = (result, keys) => {
  let contentOption = null;
  if (result["contentOption"]) {
    contentOption = result["contentOption"];
  } else {
    chrome.storage.local.set({ contentOption: "content" }, () => {});
    contentOption = "content";
  }
  let li = "";
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.firstChild);
  }

  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === "options" || keys[i] == "contentOption") {
      continue;
    } else {
      const {
        scheduleList,
        date,
        time,
        getTimeDate,
        key,
        repeat,
        repeatTime
      } = result[keys[i]];

      if (contentOption === "content") {
        if (getTimeDate < parseInt(Date.now())) {
          continue;
        }
        li += printLi(result[keys[i]]);
      } else {
        if (getTimeDate > parseInt(Date.now())) {
          break;
        }
        li += printLi(result[keys[i]]);
      }
    }
  }

  ul.innerHTML = li;
  setEvent();
};

const test = (time, repeat) => {
  while (time <= parseInt(Date.now())) {
    time += repeat; // 3600060000
    console.log(``, time, parseInt(Date.now()));
  }
  return time;
};

const reStorage = data => {
  const { scheduleList, getTimeDate: preTimeDate, repeat, repeatTime } = data;
  let { alarmDate, key } = data;
  let getTimeDate = test(preTimeDate, repeat * repeatTime);
  const currentDate = new Date().getTime();
  const newDate = new Date();
  newDate.setTime(getTimeDate);
  alarmDate = getTimeDate - currentDate;
  const onAlarm = getTimeDate > currentDate;
  key = getTimeDate / 1000 + "" + currentDate;
  const dateObj = getDate(newDate);
  const timeObj = getTime(newDate);
  const date = getDateFormat(dateObj);
  const time = getTimeFormat(timeObj);

  const storageObj = {
    scheduleList,
    date,
    time,
    getTimeDate,
    alarmDate,
    key,
    repeat,
    repeatTime,
    onAlarm
  };

  setStorage(storageObj);
};
const removeStorage = (data, keys) => {
  for (let i = 0; i < keys.length; i++) {
    const { getTimeDate, repeat, repeatTime, key, onAlarm } = data[keys[i]];
    if (keys[i] === "options" || keys[i] === "contentOption") {
      continue;
    } else {
      if (getTimeDate < parseInt(Date.now())) {
        if (repeat * repeatTime > 0) {
          reStorage(data[keys[i]]);
          chrome.storage.local.remove(key);
        } else if (onAlarm) {
          const temp = {};
          const obj = data[keys[i]];
          obj.onAlarm = false;
          temp[keys[i]] = obj;
          chrome.storage.local.set(temp);
        }
        chrome.alarms.clear(key);
        if (parseInt(getTimeDate) + 604800000 < parseInt(Date.now())) {
          chrome.storage.local.remove(key);
        }
      }
    }
  }
};

const logChangedStorage = changes => {
  console.log(changes);
  const key = Object.keys(changes)[0];
  key === "options" && getAllStorage(getOptions);
  getAllStorage(printContent);
  getAllStorage(removeStorage);
};

const initContent = () => {
  getAllStorage(printContent);
  getAllStorage(removeStorage);
  changedStorage(logChangedStorage);
};

initContent();
