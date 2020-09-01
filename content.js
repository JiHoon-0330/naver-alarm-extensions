/* <li>
  <span>1111111111111111111111111111111111111111111111111111111111111</span>
  <i class="fas fa-trash-alt"></i>
</li>; */

const main = document.querySelector(".content > ul");

const printData = (data, key) => {
  let mainContent = "";

  for (let i = 0; i < key.length; i++) {
    mainContent += `<li id="${key[i]}">
    <div>
    <span class="schedule">${data[key[i]].schedule}</span>
    <span class="datetime">${data[key[i]].date} ${data[key[i]].time}</span>
    </div>
    <i class="fas fa-trash-alt"></i></li>`;
  }
  main.innerHTML = mainContent;
};

const getStorageAllData = () => {
  chrome.storage.local.get(null, result => {
    const keys = Object.keys(result);
    keys.sort();
    printData(result, keys);
  });
};
const initContent = () => {
  getStorageAllData();
};

initContent();
