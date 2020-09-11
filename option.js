const audioSelect = document.querySelector("#audio__select");
const audioPlay = document.querySelector(".audio__play");
const audioPause = document.querySelector(".audio__pause");
const volumeValue = document.querySelector(".volume__value");
const voulmUp = document.querySelector(".voulme__up");
const voulmDown = document.querySelector(".voulme__down");
const audio = document.querySelector("audio");
const optionExit = document.querySelector(".option__exit");
const inputTheme = document.querySelectorAll("input[name='theme']");
let currentTheme = null;
let selectTheme = null;
let onPlayAudio = false;

const setAudioVolum = volume => {
  audio.volume = volume / 10;
};

optionForm.addEventListener("submit", e => {
  e.preventDefault();
  setSaveOptions();
});

optionExit.addEventListener("click", () => {
  iconContent.click();
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

audio.addEventListener("play", () => {
  onPlayAudio = true;
});

audio.addEventListener("pause", () => {
  onPlayAudio = false;
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

inputTheme.forEach(theme => {
  theme.addEventListener("click", e => {
    console.log(e.target.value);
    setTheme(e.target.value);
  });
});

const getSaveOptions = data => {
  const { volume, music, theme } = data;
  console.log(``, data);
  volumeValue.textContent = volume;
  setAudioVolum(volume);
  audioSelect.value = music;
  currentTheme = theme;
  setTheme(theme);
  document.querySelector(`#${theme}`).checked = true;
  if (music) {
    audio.setAttribute("src", `audio/${music}`);
  }
};

const setSaveOptions = () => {
  const volume = volumeValue.textContent;
  const music = audioSelect.value;
  const appOptions = { options: { volume, music, theme: selectTheme } };
  console.log(appOptions);
  chrome.storage.local.set(appOptions, () => {});
  successSubmit("설정이 등록되었습니다.", "option");
};

const getOptions = (data, keys) => {
  if (data["options"]) {
    console.log("true");
    getSaveOptions(data["options"]);
    return;
  } else {
    console.log("false");
    const appOptions = {
      options: {
        volume: 0,
        music: "",
        theme: "black"
      }
    };
    chrome.storage.local.set(appOptions, () => {});
    getSaveOptions(appOptions["options"]);
  }
};

const initOption = () => {
  getAllStorage(getOptions);
};

initOption();
