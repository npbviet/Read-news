"use strict";
//1.Gọi hàm
const submitBtn = document.getElementById("btn-submit");
const firstnameInput = document.getElementById("input-firstname");
const lastnameInput = document.getElementById("input-lastname");
const usernameInput = document.getElementById("input-username");
const pwInput = document.getElementById("input-password");
const pwconfirmInput = document.getElementById("input-password-confirm");

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
  if (userData.firstname === "") {
    alert("Please select First Name!");
    return false;
  }
  if (userData.lastname === "") {
    alert("Please select Last Name!");
    return false;
  }
  if (userData.username === "") {
    alert("Please select Username!");
    return false;
  }
  if (userData.password === "") {
    alert("Please select Password!");
    return false;
  }

  //Valid pw 8 char
  if (userData.password.length <= 8) {
    alert("Please select Password more than 8 letters!");
    return false;
  }

  //Valid pwconfirm khớp password
  if (pwconfirmInput.value !== userData.password) {
    alert("Password confirm does not match!");
    return false;
  }
  //Valid username unique
  const checkExist = userArr.some((p) => p.username === userData.username);
  if (checkExist === true) {
    alert("Username already exists!");
    return false;
  } else {
    return true;
  }
};

//2.3. Hàm chuyển từ JS Object sang Class Instance
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password
  );
  return user;
}

//2.4 Hàm lưu dữ liệu
const storeUser = () => saveToStorage("user", JSON.stringify(userArr));

//3. Bắt đầu sự kiện
submitBtn.addEventListener("click", function () {
  console.log("test");
  //3.1. Lấy thông tin
  let userData = new User(
    firstnameInput.value,
    lastnameInput.value,
    usernameInput.value,
    pwInput.value,
    pwconfirmInput.value
  );
  console.log(userData);
  //3.2.Valid + add thông tin
  if (validData(userData)) {
    userArr.push(userData);
    storeUser();
    clearInput();
    window.location.href = "../pages/login.html";
  }
  console.log(userArr);
});
