const modifyContent = id => {
  iconForm.click();
  chrome.storage.local.get(id, result => {
    const {
      scheduleList: list,
      date,
      time,
      getTimeDate,
      alarmDate,
      key,
      patten
    } = result[id];
    document.querySelector(".schedule__input").value = list[0];
    for (let i = 1; i < list.length; i++) {
      let input = document.createElement("input");
      input.type = "text";
      input.className = "schedule__input";
      input.setAttribute("value", list[i]);
      scheduleContainer.appendChild(input);
    }

    const scheduleList = getScheduleList();
    scheduleDate.value = date;
    scheduleTime.value = time;

    if (scheduleDate / 1000 <= 0) {
      alert("등록할 수 없는 시간입니다.");
      return;
    } else {
      const storageObj = {
        scheduleList,
        date,
        time,
        getTimeDate,
        alarmDate,
        key,
        patten
      };
      console.log(id);
      console.log(``, storageObj);
      setStorage(storageObj);
      chrome.alarms.clear(key);
      chrome.storage.local.remove(key);
    }
  });
};
