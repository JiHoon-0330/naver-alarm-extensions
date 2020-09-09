const scheduleForm = document.querySelector(".schedule__form");
const optionForm = document.querySelector(".option__form");
const success = document.querySelector(".success");

const successSubmit = (text, flag) => {
  iconContent.click();
  const contentContainer = document.querySelector(".content__container");
  success.textContent = text;
  success.classList.toggle("success__hidden");
  contentContainer.classList.toggle("content__hidden");
  setTimeout(() => {
    success.classList.toggle("success__hidden");
    contentContainer.classList.toggle("content__hidden");
  }, 1000);
};
