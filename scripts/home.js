"use strict";

//1.Gọi hàm
const loginModel = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMess = document.getElementById("welcome-message");
const logoutBtn = document.getElementById("btn-logout");

const currentUser = getFromStorage("activeUser");

//2. Bắt đầu sự kiện
//2.1. Thiết lập khởi đầu
if (currentUser.firstname) {
  loginModel.style.display = "none";
  welcomeMess.innerHTML = `Welcome  ${currentUser.firstname}`;
} else {
  mainContent.style.display = "none";
}

//2.2.Nút logout
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("activeUser");
  window.location.href = "./index.html";
});
