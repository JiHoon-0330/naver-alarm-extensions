/* <li>
  <span>1111111111111111111111111111111111111111111111111111111111111</span>
  <i class="fas fa-trash-alt"></i>
</li>; */

const main = document.querySelector(".content > ul");

const printData = (data, key) => {
  let mainContent = "";
  for (let i = 0; i < key.length; i++) {
    mainContent += `<li id="${key[i]}">
    <div
    <span>${data[key[i]].schedule}</span>
    <span>${data[key[i]].date} ${data[key[i]].time}</span>
    </div>
    <i class="fas fa-trash-alt"></i></li>`;
  }
  main.innerHTML = mainContent;
  console.log(mainContent);
};

const initContent = () => {
  printData();
};

initContent();
