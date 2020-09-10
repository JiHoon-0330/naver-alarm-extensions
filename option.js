const audioSelect = document.querySelector("#audio__select");
const audioPlay = document.querySelector(".audio__play");
const audioPause = document.querySelector(".audio__pause");
const volumeValue = document.querySelector(".volume__value");
const voulmUp = document.querySelector(".voulme__up");
const voulmDown = document.querySelector(".voulme__down");
const audio = document.querySelector("audio");
const optionExit = document.querySelector(".option__exit");
const inputTheme = document.querySelectorAll("input[name='theme']");
const themes = {
  black: {
    mainBgColor: "#1b1b1b",
    secondBgColor: "#333333",
    thirdBgColor: "#484848",
    mainTextColor: "#f5f5f5",
    secondTextColor: "#bdbdbd",
    thirdTextColor: "#888888"
  },
  white: {
    mainBgColor: "#F2F2F2",
    secondBgColor: "#9E9E9E",
    thirdBgColor: "#DEDEDE",
    mainTextColor: "#1A1A1A",
    secondTextColor: "#2B2B2B",
    thirdTextColor: "#5E5E5E"
  },
  green: {
    mainBgColor: "#8CD790",
    secondBgColor: "#85CC88",
    thirdBgColor: "#7BBD7E",
    mainTextColor: "#f5f5f5",
    secondTextColor: "#bdbdbd",
    thirdTextColor: "#888888"
  },
  blue: {
    mainBgColor: "#30A9DE",
    secondBgColor: "#2A82F5",
    thirdBgColor: "#2C6AC7",
    mainTextColor: "#f5f5f5",
    secondTextColor: "#bdbdbd",
    thirdTextColor: "#888888"
  },
  pink: {
    mainBgColor: "#FF78AE",
    secondBgColor: "#FF94BF",
    thirdBgColor: "#FFA1C6",
    mainTextColor: "#f5f5f5",
    secondTextColor: "#FFEBF3",
    thirdTextColor: "#888888"
  },
  beige: {
    mainBgColor: "#FFEEE4",
    secondBgColor: "#F0DFD5",
    thirdBgColor: "#E1D4C4",
    mainTextColor: "#1A1A1A",
    secondTextColor: "#2B2B2B",
    thirdTextColor: "#5E5E5E"
  }
};

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

const setTheme = theme => {
  const {
    mainBgColor,
    secondBgColor,
    thirdBgColor,
    mainTextColor,
    secondTextColor,
    thirdTextColor
  } = themes[theme];
  selectTheme = theme;
  document.querySelector(`#${theme}`).checked = true;
  document.documentElement.style.setProperty("--main-bg-color", mainBgColor);
  document.documentElement.style.setProperty(
    "--second-bg-color",
    secondBgColor
  );
  document.documentElement.style.setProperty("--third-bg-color", thirdBgColor);
  document.documentElement.style.setProperty(
    "--main-text-color",
    mainTextColor
  );
  document.documentElement.style.setProperty(
    "--second-text-color",
    secondTextColor
  );
  document.documentElement.style.setProperty(
    "--third-text-color",
    thirdTextColor
  );
};

const getSaveOptions = data => {
  const { volume, music, theme } = data;

  volumeValue.textContent = volume;
  setAudioVolum(volume);
  audioSelect.value = music;

  setTheme(theme);

  if (music) {
    audio.setAttribute("src", `audio/${music}`);
  }
};

const setSaveOptions = () => {
  const volume = volumeValue.textContent;
  const music = audioSelect.value;
  const appOptions = { options: { volume, music, theme: selectTheme } };
  chrome.storage.local.set(appOptions, () => {});
  successSubmit("설정이 등록되었습니다.", "option");
};

const getOptions = (data, keys) => {
  if (data["options"]) {
    getSaveOptions(data["options"]);
    return;
  } else {
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
