const iconContent = document.querySelector(".icon__content");
const iconForm = document.querySelector(".icon__form");
const iconHistory = document.querySelector(".icon__history");
const iconClear = document.querySelector(".icon__clear");
const iconOption = document.querySelector(".icon__option");
const contentContainer = document.querySelector(".content__container");

const resetTheme = theme => {
  setTheme(theme);
  document.querySelector(`#${theme}`).checked = true;
};

iconContent.addEventListener("click", () => {
  chrome.storage.local.set({ contentOption: "content" }, () => {});
  resetTheme(currentTheme);
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
  resetTheme(currentTheme);
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

iconHistory.addEventListener("click", () => {
  chrome.storage.local.set({ contentOption: "history" }, () => {});
  resetTheme(currentTheme);
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

iconOption.addEventListener("click", () => {
  optionForm.classList.contains("hidden") &&
    optionForm.classList.remove("hidden");
  !scheduleForm.classList.contains("hidden") &&
    scheduleForm.classList.add("hidden");
  !contentContainer.classList.contains("hidden") &&
    contentContainer.classList.add("hidden");
});

iconClear.addEventListener("click", () => {
  if (!confirm("일정목록을 초기화 하시겠습니까?")) {
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
