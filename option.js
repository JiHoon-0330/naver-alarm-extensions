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
    mainBgColor: "#454A52",
    mainBg2Color: "#191818",
    secondBgColor: "#333030",
    thirdBgColor: "#292C30",
    mainTextColor: "#FFFFFF",
    secondTextColor: "#CAD4E0",
    thirdTextColor: "#888888"
  },
  white: {
    mainBgColor: "#E0E3DA", // 아랫배경 
    mainBg2Color: "#ffffff", // 윗배경
    secondBgColor: "#B8B6B6",
    thirdBgColor: "#F5F5F5",
    mainTextColor: "#1e2022",
    secondTextColor: "#6A6B67",
    thirdTextColor: "#5E5E5E"
  },
  green: {
    mainBgColor: "#77AF9C", // 배경 아래
    mainBg2Color: "#8CD790", // 배경 위
    secondBgColor: "#2F694F",  // 하단 메뉴
    thirdBgColor: "#619191", // 일정박스 색
    mainTextColor: "#ffffff", // 시계, 폰트, 아이콘 색
    secondTextColor: "#BED1C0", // placeholder, 시계언더바, 일정수정,삭제아이콘
    thirdTextColor: "#888888"
  },
  purple: {
    mainBgColor: "#CBA6C3",
    mainBg2Color: "#AAABD3",
    secondBgColor: "#4C4D5E",
    thirdBgColor: "#8283a7",
    mainTextColor: "#F8FAFF",
    secondTextColor: "#CAD4E0",
    thirdTextColor: "#888888"  
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
    mainBg2Color,
    secondBgColor,
    thirdBgColor,
    mainTextColor,
    secondTextColor,
    thirdTextColor
  } = themes[theme];
  selectTheme = theme;
  document.querySelector(`#${theme}`).checked = true;
  document.documentElement.style.setProperty("--main-bg-color", mainBgColor);
  document.documentElement.style.setProperty("--main-bg2-color", mainBg2Color);
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
