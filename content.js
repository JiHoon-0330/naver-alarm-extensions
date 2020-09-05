/* <li>
  <span>1111111111111111111111111111111111111111111111111111111111111</span>
  <i class="fas fa-trash-alt"></i>
</li>; */

const ul = document.querySelector(".content > ul");

const toggleHidden = child => {
  console.log(``, child, child.length);
  for (let i = 1; i < child.length; i++) {
    console.log(child[i].tagName);
    if (!(child[i].tagName === "SPAN")) {
      if (child[i].tagName === "BUTTON") {
        child[i].classList.toggle("allList");
        child[i].classList.contains("allList")
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
  const moreButton = `<button type="button" class="allList">더보기</button>`;
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] == "options") {
      continue;
    } else {
      let span = "";
      const { scheduleList, date, time, key } = result[keys[i]];
      console.log(scheduleList);
      for (let j = 0; j < scheduleList.length; j++) {
        span += `<span class="schedule ${j > 0 ? hidden : ""}">${
          scheduleList[j]
        }</span>`;
      }
      li += `
      <li id="${key}">
        <div>
        ${span}
        ${scheduleList.length > 1 ? moreButton : ""}
        <span class="datetime">${date} ${time}</span>
      </div>
      <i class="fas fa-trash-alt"></i>
    </li>`;
    }
  }
  ul.innerHTML = li;
  let trash = document.querySelectorAll(".content > ul > li > i");
  let allList = document.querySelectorAll(".content > ul > li > div > button");

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
