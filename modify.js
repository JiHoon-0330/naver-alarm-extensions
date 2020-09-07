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
      repeat,
      repeatTime
    } = result[id];
    scheduleDate.value = date;
    scheduleTime.value = time;
    scheduleKye.value = key;
    repeatSelect.value = repeat;
    repeatInput.value = repeatTime;
    document.querySelector(".schedule__input").value = list[0];

    for (let i = 1; i < list.length; i++) {
      let input = document.createElement("input");
      input.type = "text";
      input.className = "schedule__input";
      input.setAttribute("value", list[i]);
      scheduleContainer.appendChild(input);
    }
  });
};
