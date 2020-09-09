const scheduleForm = document.querySelector(".schedule__form");
const optionForm = document.querySelector(".option__form");
const success = document.querySelector(".success");

const successSubmit = (text, flag) => {
  success.textContent = text;
  success.classList.toggle("success__hidden");
  flag === "schedule"
    ? scheduleForm.classList.toggle("form__blur")
    : optionForm.classList.toggle("form__blur");
  setTimeout(() => {
    success.classList.toggle("success__hidden");
    flag === "schedule"
      ? scheduleForm.classList.toggle("form__blur")
      : optionForm.classList.toggle("form__blur");
  }, 1000);
};
