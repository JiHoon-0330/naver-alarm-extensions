{
  /* <li>
  <span>1111111111111111111111111111111111111111111111111111111111111</span>
  <i class="fas fa-trash-alt"></i>
</li>; */
}
const content = document.querySelector(".content");
const add__form = document.querySelector(".add__form");
const addButton = document.querySelector(".add");

addButton.addEventListener("click", () => {
  content.classList.toggle("hidden");
  add__form.classList.toggle("hidden");
});
