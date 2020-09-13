const themes = {
  black: {
    mainBgColor: "#454A52", // 슬라이드 아래 배경
    mainBg2Color: "#191818", // 슬라이드 윗 배경
    secondBgColor: "#333030", // 하단 메뉴바
    thirdBgColor: "#292C30", // 컨텐츠 박스 색상
    mainTextColor: "#FFFFFF", // 텍스트 색상
    secondTextColor: "#D1D1D1", // input placeholder, 수정,삭제아이콘 색상
    thirdTextColor: "#888888",
    daysTextColor: "#454545",
    daysSubColor: "#ffffff",
    daysBgColor: "#DBDBDB",
    sundayTextColor: "#FF5340",
    saturdayTextColor: "#3370FF"
  },
  white: {
    mainBgColor: "#E0E3DA",
    mainBg2Color: "#ffffff",
    secondBgColor: "#B8B6B6",
    thirdBgColor: "#F5F5F5",
    mainTextColor: "#1e2022",
    secondTextColor: "#6A6B67",
    thirdTextColor: "#5E5E5E",
    daysTextColor: "#FFFFFF",
    daysSubColor: "#ffffff",
    daysBgColor: "#6E6E6E",
    sundayTextColor: "#FF3019",
    saturdayTextColor: "#0043D1"
  },
  green: {
    mainBgColor: "#77AF9C",
    mainBg2Color: "#8CD790",
    secondBgColor: "#2F694F",
    thirdBgColor: "#619191",
    mainTextColor: "#ffffff",
    secondTextColor: "#B5C9C0",
    thirdTextColor: "#888888",
    daysTextColor: "#397070",
    daysSubColor: "#ffffff",
    daysBgColor: "#ffffff",
    sundayTextColor: "#FF3019",
    saturdayTextColor: "#0043D1"
  },
  purple: {
    mainBgColor: "#CBA6C3",
    mainBg2Color: "#AAABD3",
    secondBgColor: "#4C4D5E",
    thirdBgColor: "#8283a7",
    mainTextColor: "#F8FAFF",
    secondTextColor: "#C0C1CF",
    thirdTextColor: "#888888",
    daysTextColor: "#737494",
    daysSubColor: "#ffffff",
    daysBgColor: "#ffffff",
    sundayTextColor: "#FF3019",
    saturdayTextColor: "#0043D1"
  },
  multi: {
    mainBgColor: "#ffc952",
    mainBg2Color: "#ff7473",
    secondBgColor: "#47b8e0",
    thirdBgColor: "#34314c",
    mainTextColor: "#F8FAFF",
    secondTextColor: "#BCBBC4",
    thirdTextColor: "#888888",
    daysTextColor: "#34314C",
    daysSubColor: "#ffffff",
    daysBgColor: "#ffffff",
    sundayTextColor: "#FF5340",
    saturdayTextColor: "#3370FF"
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
    thirdTextColor,
    daysTextColor,
    daysSubColor,
    daysBgColor,
    sundayTextColor,
    saturdayTextColor
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
  document.documentElement.style.setProperty(
    "--days-text-color",
    daysTextColor
  );
  document.documentElement.style.setProperty("--days-sub-color", daysSubColor);
  document.documentElement.style.setProperty("--days-bg-color", daysBgColor);
  document.documentElement.style.setProperty(
    "--sunday-text-color",
    sundayTextColor
  );
  document.documentElement.style.setProperty(
    "--saturday-text-color",
    saturdayTextColor
  );
};
