/* <li>
  <span>1111111111111111111111111111111111111111111111111111111111111</span>
  <i class="fas fa-trash-alt"></i>
</li>; */

const ul = document.querySelector(".content__container > ul");

const toggleHidden = child => {
  for (let i = 1; i < child.length; i++) {
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
        <div class="content__icons">
          <i class="fas fa-pencil-alt"></i>
          <i class="fas fa-trash-alt"></i>
        </div>
      </li>`;
    }
  }

  ul.innerHTML = li;

  let pencil = document.querySelectorAll(".content__icons > .fa-pencil-alt");
  let trash = document.querySelectorAll(".content__icons > .fa-trash-alt");
  let allList = document.querySelectorAll(".content__content > button");

  for (let i = 0; i < pencil.length; i++) {
    pencil[i].addEventListener("click", e => {
      modifyContent(e.target.parentNode.parentNode.id);
    });
    trash[i].addEventListener("click", e => {
      chrome.alarms.clear(e.target.parentNode.parentNode.id);
      chrome.storage.local.remove(e.target.parentNode.parentNode.id);
      e.target.parentNode.parentNode.remove();
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
  console.log(``, keys, keys.length);
  for (let i = 0; i < keys.length; i++) {
    const { getTimeDate, patten, key } = data[keys[i]];
    if (keys[i] == "options") {
      continue;
    } else {
      if (getTimeDate < parseInt(Date.now())) {
        console.log(
          ``,
          keys[i],
          key,
          getTimeDate < parseInt(Date.now()),
          patten
        );
        if (patten) {
          reStorage(data[keys[i]]);
        }
        chrome.alarms.clear(key);
        chrome.storage.local.remove(key);
      }
    }
  }
  getAllStorage(printContent);
};

const initContent = () => {
  getAllStorage(removeStorage);
};

initContent();
