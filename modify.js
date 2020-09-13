const dayID = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];
const modifyContent = id => {
  iconForm.click();
  chrome.storage.local.get(id, result => {
    console.log(result[id]);
    const {
      scheduleList,
      date,
      time,
      getTimeDate,
      alarmDate,
      key,
      repeat,
      repeatTime,
      dayArr
    } = result[id];
    scheduleDate.value = date;
    scheduleTime.value = time;
    scheduleKye.value = key;
    repeatSelect.value = repeat;
    repeatInput.value = repeatTime;
    document.querySelector(".schedule__input").value = scheduleList[0];

    for (let i = 1; i < scheduleList.length; i++) {
      let input = document.createElement("input");
      input.type = "text";
      input.className = "schedule__input";
      input.setAttribute("value", scheduleList[i]);
      scheduleContainer.appendChild(input);
    }
    for (let i = 0; i < dayArr.length; i++) {
      document.querySelector(`#${dayID[dayArr[i]]}`).checked = true;
    }
    disableElement(checkDays());
  });
};
