const themes = {
  black: {
    mainBgColor: "#454A52", // 슬라이드 아래 배경
    mainBg2Color: "#191818", // 슬라이드 윗 배경
    secondBgColor: "#333030", // 하단 메뉴바
    thirdBgColor: "#292C30", // 컨텐츠 박스 색상
    mainTextColor: "#FFFFFF", // 텍스트 색상
    secondTextColor: "#CAD4E0", // input placeholder, 수정,삭제아이콘 색상
    thirdTextColor: "#888888"
  },
  white: {
    mainBgColor: "#E0E3DA", 
    mainBg2Color: "#ffffff", 
    secondBgColor: "#B8B6B6",
    thirdBgColor: "#F5F5F5",
    mainTextColor: "#1e2022",
    secondTextColor: "#6A6B67",
    thirdTextColor: "#5E5E5E"
  },
  green: {
    mainBgColor: "#77AF9C", 
    mainBg2Color: "#8CD790", 
    secondBgColor: "#2F694F",  
    thirdBgColor: "#619191", 
    mainTextColor: "#ffffff", 
    secondTextColor: "#D4E8B3",
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
  },
  multi: {
    mainBgColor: "#ffc952",
    mainBg2Color: "#ff7473",
    secondBgColor: "#47b8e0",
    thirdBgColor: "#34314c",
    mainTextColor: "#F8FAFF",
    secondTextColor: "#e1eef6",
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
