const audioSelect = document.querySelector("#audio__select");
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const volumeInput = document.querySelector("#volume__input");
const voulmUp = document.querySelector("#voulme__up");
const voulmDown = document.querySelector("#voulme__down");
const optionForm = document.querySelector("#option__form");
const optionExit = document.querySelector("#option__exit");
const audio = document.querySelector("audio");
let optionVolume;
let optionMusic;

const setAudioVolum = volume => {
  console.log(volume / 10);
  audio.volume = volume / 10;
};

optionForm.addEventListener("submit", e => {
  e.preventDefault();
  setSaveOptions();
});

optionExit.addEventListener("click", () => {
  location.reload();
});

audioSelect.addEventListener("change", e => {
  console.log(e.target.value);
  audio.setAttribute("src", `audio/${e.target.value}`);
});

play.addEventListener("click", () => {
  audio.play();
});

pause.addEventListener("click", () => {
  audio.pause();
});

voulmUp.addEventListener("click", () => {
  if (volumeInput.textContent >= 10) {
    alert("볼륨은 0 ~ 10 까지 설정 가능합니다.");
  } else {
    volumeInput.textContent = parseInt(volumeInput.textContent) + 1;
    setAudioVolum(parseInt(volumeInput.textContent));
  }
});

voulmDown.addEventListener("click", () => {
  if (volumeInput.textContent <= 0) {
    alert("볼륨은 0 ~ 10 까지 설정 가능합니다.");
  } else {
    volumeInput.textContent = parseInt(volumeInput.textContent) - 1;
    setAudioVolum(parseInt(volumeInput.textContent));
  }
});

const getSaveOptions = (saveVolume, saveMusic) => {
  volumeInput.textContent = saveVolume;
  setAudioVolum(saveVolume);
  audioSelect.value = saveMusic;
  audio.setAttribute("src", `audio/${saveMusic}`);
};

const setSaveOptions = () => {
  const volume = volumeInput.textContent;
  const music = audioSelect.value;
  const appOptions = { options: { volume, music } };
  chrome.storage.local.set(appOptions, () => {});
};

const initOption = () => {
  chrome.storage.local.get("options", result => {
    if (Object.keys(result).length) {
      optionVolume = result["options"].volume;
      optionMusic = result["options"].music;
      getSaveOptions(optionVolume, optionMusic);
    } else {
      const appOptions = { options: { volume: 0, music: "" } };
      chrome.storage.local.set(appOptions, () => {});
      getSaveOptions(0, "");
    }
  });
};

initOption();
