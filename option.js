const audioSelect = document.querySelector("#audio__select");
const audioPlay = document.querySelector(".audio__play");
const audioPause = document.querySelector(".audio__pause");

const volumeValue = document.querySelector(".volume__value");
const voulmUp = document.querySelector(".voulme__up");
const voulmDown = document.querySelector(".voulme__down");

const audio = document.querySelector("audio");

let optionVolume;
let optionMusic;

const setAudioVolum = volume => {
  audio.volume = volume / 10;
};

optionForm.addEventListener("submit", e => {
  e.preventDefault();
  setSaveOptions();
});

audioSelect.addEventListener("change", e => {
  audio.setAttribute("src", `audio/${e.target.value}`);
});

audioPlay.addEventListener("click", () => {
  audio.play();
});

audioPause.addEventListener("click", () => {
  audio.pause();
});

voulmUp.addEventListener("click", () => {
  if (volumeValue.textContent >= 10) {
    alert("볼륨은 0 ~ 10 까지 설정 가능합니다.");
  } else {
    volumeValue.textContent = parseInt(volumeValue.textContent) + 1;
    setAudioVolum(parseInt(volumeValue.textContent));
  }
});

voulmDown.addEventListener("click", () => {
  if (volumeValue.textContent <= 0) {
    alert("볼륨은 0 ~ 10 까지 설정 가능합니다.");
  } else {
    volumeValue.textContent = parseInt(volumeValue.textContent) - 1;
    setAudioVolum(parseInt(volumeValue.textContent));
  }
});

const getSaveOptions = (saveVolume, saveMusic) => {
  volumeValue.textContent = saveVolume;
  setAudioVolum(saveVolume);
  audioSelect.value = saveMusic;
  audio.setAttribute("src", `audio/${saveMusic}`);
};

const setSaveOptions = () => {
  const volume = volumeValue.textContent;
  const music = audioSelect.value;
  const appOptions = { options: { volume, music } };
  chrome.storage.local.set(appOptions, () => {});
};

const getOptions = (data, keys) => {
  if (keys.length) {
    optionVolume = data["options"].volume;
    optionMusic = data["options"].music;
    getSaveOptions(optionVolume, optionMusic);
  } else {
    const appOptions = { options: { volume: 0, music: "" } };
    chrome.storage.local.set(appOptions, () => {});
    getSaveOptions(0, "");
  }
};

const initOption = () => {
  getAllStorage(getOptions);
};

initOption();
