"use strict";

//1.Gọi hàm
const submitBtn = document.getElementById("btn-submit");
const usernameInput = document.getElementById("input-username");
const pwInput = document.getElementById("input-password");

const KEY = "user";
const userArr = getFromStorage(KEY);

//2.Hàm bổ sung
//2.1. Hàm xóa input
const clearInput = () => {
  firstnameInput.value = "";
  lastnameInput.value = "";
  usernameInput.value = "";
  pwInput.value = "";
  pwconfirmInput.value = "";
};

//2.2. Hàm valid
const validData = (userData) => {
  //Valid chỗ trống
  if (userData.username === "") {
    alert("Please select Username!");
    return false;
  }
  if (userData.password === "") {
    alert("Please select Password!");
    return false;
  }
  //Valid username không tồn tại
  console.log(userArr);
  console.log(userData);
  const checkExist = userArr.some((p) => p.username === userData.username);
  if (checkExist !== true) {
    alert("Username does not exists!");
    return false;
  }
  const activeUser = userArr.find(
    (p) => p.username === userData.username && p.password == userData.password
  );
  if (activeUser) {
    alert("Login success!");
    saveToStorage("activeUser", JSON.stringify(activeUser));
    return true;
  } else {
    alert("Password does not match!");
    return false;
  }
};

//3. Bắt đầu sự kiện
submitBtn.addEventListener("click", function () {
  console.log("test");
  //3.1. Lấy thông tin
  const userData = {
    username: usernameInput.value,
    password: pwInput.value,
  };
  console.log(userData);
  //3.2.Valid + add thông tin
  if (validData(userData)) {
    window.location.href = "../index.html";
  }
  console.log(userArr);
});
