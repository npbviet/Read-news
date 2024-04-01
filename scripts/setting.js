"use strict";
//1. Gọi hàm
const inputPagesize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const btnSubmit = document.getElementById("btn-submit");

const KEY = "user";
const userArr = getFromStorage(KEY);
const currentUser = getFromStorage("activeUser");

//2. Hàm bổ sung
//2.1. Hàm lấy input ban đầu từ kho dữ liệu
const startInput = () => {
  inputPagesize.value = currentUser.pageSize;
  inputCategory.value = currentUser.category;
};
//2.2. Hàm valid
const validData = (settingData) => {
  //Valid chỗ trống
  if (settingData.pageSize === "") {
    alert("Please select Page Size!");
    return false;
  }
  if (settingData.pageSize < 1) {
    alert("Page Size have to higher than 1!");
    return false;
  }

  return true;
};
//2.3 Hàm lưu dữ liệu
const storeUserArr = (userArr) =>
  saveToStorage("user", JSON.stringify(userArr));
const storeCurrentUser = () =>
  saveToStorage("activeUser", JSON.stringify(currentUser));

//3. Bắt đầu sự kiện
//Thiết lập mặc định ban đầu
startInput();
//Event click
btnSubmit.addEventListener("click", function () {
  console.log("test");
  //3.1. Lấy thông tin
  const settingData = {
    pageSize: inputPagesize.value,
    category: inputCategory.value,
  };

  console.log(settingData);
  //3.2.Valid + add thông tin
  if (validData(settingData)) {
    //____________________________________________________________________
    /*Tìm user và lưu vào userArr cách 1
    const activeUser = userArr.find(
      (a) =>
        a.username === currentUser.username &&
        a.password === currentUser.password
    );
    const index = userArr.findIndex(
      (a) =>
        a.username === currentUser.username &&
        a.password === currentUser.password
    );

    if (activeUser) {
      currentUser.pageSize = settingData.pageSize;
      currentUser.category = settingData.category;
    }
    userArr[index] = currentUser; 
_____________________________________________________________________*/
    //Tìm user và lưu vào userArr cách 2
    for (let i = 0; i < userArr.length; i++) {
      if (
        userArr[i].username === currentUser.username &&
        userArr[i].password === currentUser.password
      ) {
        userArr[i].pageSize = settingData.pageSize;
        userArr[i].category = settingData.category;
        currentUser.pageSize = settingData.pageSize;
        currentUser.category = settingData.category;
      }
    }

    //userArr.push(settingData);
    storeUserArr(userArr);

    //currentUser.push(settingData);
    storeCurrentUser();

    window.location.href = "news.html";
  }
  console.log(userArr);
});
