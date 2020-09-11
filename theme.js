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
    secondBgColor: "#2F694F", // 하단 메뉴
    thirdBgColor: "#619191", // 일정박스 색
    mainTextColor: "#ffffff", // 시계, 폰트, 아이콘 색
    secondTextColor: "#BED1C0", // placeholder, 시계언더바, 일정수정,삭제아이콘
    thirdTextColor: "#888888"
  }
};

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
