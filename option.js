const audioSelect = document.querySelector("#audio__select");
const audioPlay = document.querySelector(".audio__play");
const audioPause = document.querySelector(".audio__pause");
const volumeValue = document.querySelector(".volume__value");
const voulmUp = document.querySelector(".voulme__up");
const voulmDown = document.querySelector(".voulme__down");
const audio = document.querySelector("audio");
const optionExit = document.querySelector(".option__exit");
const themeBgcolor = document.querySelector(".theme__bgcolor");
const themeTextcolor = document.querySelector(".theme__textcolor");
const themeReset = document.querySelector(".theme__reset");

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

// themeBgcolor.addEventListener("input", () => {
//   document.documentElement.style.setProperty(
//     "--main-bg-color",
//     themeBgcolor.value
//   );
// });
// themeTextcolor.addEventListener("input", () => {
//   document.documentElement.style.setProperty(
//     "--main-text-color",
//     themeTextcolor.value
//   );
// });

// themeReset.addEventListener("click", () => {
//   const resetBgColor = "#424242";
//   const resetTextColor = "#f5f5f5";
//   themeBgcolor.value = resetBgColor;
//   themeTextcolor.value = resetTextColor;
//   document.documentElement.style.setProperty("--main-bg-color", resetBgColor);
//   document.documentElement.style.setProperty(
//     "--main-text-color",
//     resetTextColor
//   );
// });

const getSaveOptions = data => {
  const { volume, music, bgColor, textColor } = data;
  volumeValue.textContent = volume;
  setAudioVolum(volume);
  audioSelect.value = music;
  // themeBgcolor.value = bgColor;
  // themeTextcolor.value = textColor;
  // document.documentElement.style.setProperty("--main-bg-color", bgColor);
  // document.documentElement.style.setProperty("--main-text-color", textColor);
  if (music) {
    audio.setAttribute("src", `audio/${music}`);
  }
};

const setSaveOptions = () => {
  const volume = volumeValue.textContent;
  const music = audioSelect.value;
  const bgColor = themeBgcolor.value;
  const textColor = themeTextcolor.value;
  const appOptions = { options: { volume, music, bgColor, textColor } };
  chrome.storage.local.set(appOptions, () => {});
  successSubmit("설정이 등록되었습니다.", "option");
};

const getOptions = (data, keys) => {
  if (data["options"]) {
    optionVolume = data["options"].volume;
    optionMusic = data["options"].music;
    getSaveOptions(data["options"]);
    return;
  } else {
    const appOptions = {
      options: {
        volume: 0,
        music: "",
        bgColor: "#424242",
        textColor: "#f5f5f5"
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
