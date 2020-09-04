/* <li>
  <span>1111111111111111111111111111111111111111111111111111111111111</span>
  <i class="fas fa-trash-alt"></i>
</li>; */

const ul = document.querySelector(".content > ul");
let trash = null;

const printContent = (result, keys) => {
  let li = "";
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] == "options") {
      continue;
    } else {
      const { schedule, date, time, key } = result[keys[i]];
      li += `
    <li id="${key}">
      <div>
        <span class="schedule">${schedule}</span>
        <span class="datetime">${date} ${time}</span>
      </div>
      <i class="fas fa-trash-alt"></i>
    </li>`;
    }
  }
  ul.innerHTML = li;
  trash = document.querySelectorAll(".content > ul > li > i");
  console.log(trash);
  for (let i = 0; i < trash.length; i++) {
    trash[i].addEventListener("click", e => {
      console.log(e.target.parentNode.id);
      chrome.alarms.clear(e.target.parentNode.id);
      chrome.storage.local.remove(e.target.parentNode.id);
      e.target.parentNode.remove();
    });
  }
};

const removeStorage = (result, k) => {
  const { schedule, music, getTimeDate: preTimeDate, patten } = result;
  let { scheduleDate, key } = result;

  if (key < parseInt(Date.now() / 1000)) {
    if (patten) {
      const currentDate = new Date().getTime();
      const getTimeDate = preTimeDate + patten;
      const newDate = new Date();
      newDate.setTime(getTimeDate);
      scheduleDate = getTimeDate - currentDate;
      key = getTimeDate / 1000;

      const dateObj = getDate(newDate);
      const timeObj = getTime(newDate);
      const date = getDateFormat(dateObj);
      const time = getTimeFormat(timeObj);

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

      setStorage(storageObj);
    }
    chrome.alarms.clear(k);
    chrome.storage.local.remove(k);
  }
};

const getStorageAllData = () => {
  chrome.storage.local.get(null, result => {
    const keys = Object.keys(result);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (k == "options") {
        continue;
      } else {
        removeStorage(result[k], k);
      }
    }
    chrome.storage.local.get(null, result => {
      const keys = Object.keys(result);
      keys.sort();
      printContent(result, keys);
    });
  });
};

const initContent = () => {
  getStorageAllData();
};

initContent();
