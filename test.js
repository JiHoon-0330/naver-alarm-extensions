let h1 = document.querySelector("h1");
const exit = document.querySelector("#exit");

exit.addEventListener("click", () => {
  location.href = "index.html";
});

const printSchedule = data => {
  const { schedule } = data;

  h1.textContent = schedule;
};

const getFirstKey = () => {
  chrome.storage.local.get(null, result => {
    const keys = Object.keys(result);
    keys.sort();
    getFirstData(keys[0]);
  });
};

const getFirstData = key => {
  chrome.storage.local.get(key, result => {
    printSchedule(result[key]);
  });
};

const initTest = () => {
  getFirstKey();
};

initTest();
