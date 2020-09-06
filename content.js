/* <li>
  <span>1111111111111111111111111111111111111111111111111111111111111</span>
  <i class="fas fa-trash-alt"></i>
</li>; */

const ul = document.querySelector(".content__container > ul");

const toggleHidden = child => {
  console.log(``, child, child.length);
  for (let i = 1; i < child.length; i++) {
    console.log(child[i].tagName);
    if (!(child[i].tagName === "SPAN")) {
      if (child[i].tagName === "BUTTON") {
        child[i].classList.toggle("content__more");
        child[i].classList.contains("content__more")
          ? (child[i].textContent = "더보기")
          : (child[i].textContent = "접기");
        break;
      }
    } else {
      child[i].classList.toggle("hidden");
    }
  }
};

const printContent = (result, keys) => {
  let li = "";
  const hidden = "hidden";
  const moreButton = `<button type="button" class="content__more">더보기</button>`;
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] == "options") {
      continue;
    } else {
      let span = "";
      const { scheduleList, date, time, key } = result[keys[i]];
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
        <span class="datetime">${date} ${time}</span>
      </div>
      <i class="fas fa-trash-alt"></i>
    </li>`;
    }
  }

  ul.innerHTML = li;

  let trash = document.querySelectorAll(".content__li > i");
  let allList = document.querySelectorAll(".content__content > button");

  for (let i = 0; i < trash.length; i++) {
    trash[i].addEventListener("click", e => {
      chrome.alarms.clear(e.target.parentNode.id);
      chrome.storage.local.remove(e.target.parentNode.id);
      e.target.parentNode.remove();
    });
  }

  for (let i = 0; i < allList.length; i++) {
    allList[i].addEventListener("click", e => {
      toggleHidden(e.target.parentNode.children);
    });
  }
};

const reStorage = data => {
  const { scheduleList, getTimeDate: preTimeDate, patten } = data;
  let { alarmDate, key } = data;

  const currentDate = new Date().getTime();
  const getTimeDate = preTimeDate + patten;
  const newDate = new Date();
  newDate.setTime(getTimeDate);
  alarmDate = getTimeDate - currentDate;
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
    patten
  };

  setStorage(storageObj);
};

const removeStorage = (data, keys) => {
  for (let i = 0; i < keys.length; i++) {
    const { getTimeDate, patten, key } = data[keys[i]];
    if (keys[i] == "options") {
      continue;
    } else {
      if (getTimeDate < parseInt(Date.now())) {
        if (!patten) {
          chrome.alarms.clear(key);
          chrome.storage.local.remove(key);
        } else {
          reStorage(data);
        }
      }
    }
  }
  getAllStorage(printContent);
};

const getStorageAllData = () => {
  getAllStorage(removeStorage);
};

const initContent = () => {
  getStorageAllData();
};

initContent();
