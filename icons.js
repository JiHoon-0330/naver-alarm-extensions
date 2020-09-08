const iconContent = document.querySelector(".icon__content");
const iconForm = document.querySelector(".icon__form");
const iconClear = document.querySelector(".icon__clear");
const iconOption = document.querySelector(".icon__option");
const contentContainer = document.querySelector(".content__container");

iconContent.addEventListener("click", () => {
  contentContainer.classList.contains("hidden") &&
    contentContainer.classList.remove("hidden");
  !scheduleForm.classList.contains("hidden") &&
    scheduleForm.classList.add("hidden");
  !optionForm.classList.contains("hidden") &&
    optionForm.classList.add("hidden");
  if (onPlayAudio) {
    audio.pause();
  }
});

iconForm.addEventListener("click", () => {
  scheduleForm.classList.contains("hidden") &&
    scheduleForm.classList.remove("hidden");
  !contentContainer.classList.contains("hidden") &&
    contentContainer.classList.add("hidden");
  !optionForm.classList.contains("hidden") &&
    optionForm.classList.add("hidden");
  if (onPlayAudio) {
    audio.pause();
  }
  setDate();
});

iconOption.addEventListener("click", () => {
  optionForm.classList.contains("hidden") &&
    optionForm.classList.remove("hidden");
  !scheduleForm.classList.contains("hidden") &&
    scheduleForm.classList.add("hidden");
  !contentContainer.classList.contains("hidden") &&
    contentContainer.classList.add("hidden");
});

iconClear.addEventListener("click", () => {
  const result = confirm("일정목록을 초기화 하시겠습니까?");
  if (!result) {
    return;
  } else {
    getAllStorage((data, keys) => {
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (k == "options") {
          continue;
        } else {
          chrome.storage.local.remove(k);
        }
      }
    });
    chrome.alarms.clearAll(() => {
      console.log("clear");
    });
    location.reload();
  }
});
