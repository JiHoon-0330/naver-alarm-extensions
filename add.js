/* <li>
  <span>1111111111111111111111111111111111111111111111111111111111111</span>
  <i class="fas fa-trash-alt"></i>
</li>; */

// 12313 2020-12-31 00:59

const content = document.querySelector(".content");
const form = document.querySelector(".add__form");
const schedule = document.querySelector(".add__schedule");
const label = document.querySelector("label");
// const date = document.querySelector(".add__date");
// const time = document.querySelector(".add__time");
const submit = document.querySelector(".add_submit");
const button = document.querySelector(".add");

button.addEventListener("click", () => {
  content.classList.toggle("hidden");
  form.classList.toggle("hidden");
});

form.addEventListener("submit", e => {
  e.preventDefault();
  console.log(``, schedule.value, date.value, time.value);
});
