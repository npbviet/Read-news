"use strict";
//1. Gọi hàm
const inputTask = document.getElementById("input-task");
const todoList = document.getElementById("todo-list");
const btnAdd = document.getElementById("btn-add");

const KEY = "user";
const userArr = getFromStorage(KEY);
const currentUser = getFromStorage("activeUser");
const todoArr = getFromStorage("todoData");

//2. Hàm bổ sung
//2.1.Hàm hiển thị danh sách todoList
function renderTableData() {
  todoList.innerHTML = "";
  if (currentUser.todoArr != undefined) {
    for (let i = 0; i < currentUser.todoArr.length; i++) {
      const data = currentUser.todoArr[i].task;
      const row = document.createElement("li");
      if (currentUser.todoArr[i].isDone === true) {
        row.innerHTML = `<li class="checked" onclick="toggleChecked(this, ${data})">
        ${data}<span class="close" onclick="deleteTask(this, ${data})">×</span>
        </li>`;
      } else {
        row.innerHTML = `<li onclick="toggleChecked(this, ${data})">
        ${data}<span class="close" onclick="deleteTask(this, ${data})">×</span>
        </li>`;
      }
      todoList.prepend(row);
    }
  }
}

//2.2. Hàm valid
const validData = (todoData) => {
  if (todoData.task === "") {
    alert("Please select Task!");
    return false;
  }
  return true;
};

//2.3 Hàm lưu dữ liệu
const storeUserArr = (userArr) =>
  saveToStorage("user", JSON.stringify(userArr));
const storeCurrentUser = () =>
  saveToStorage("activeUser", JSON.stringify(currentUser));

//2.4. Hàm xóa input
const clearInput = () => {
  inputTask.value = "";
};

//3. Bắt đầu sự kiện
//Thiết lập mặc định ban đầu
renderTableData();

//Event click
btnAdd.addEventListener("click", function () {
  console.log("test");
  //3.1. Lấy thông tin
  let todoData = new TodoData(inputTask.value, currentUser.username);
  console.log(todoData);

  //3.2.Valid + add thông tin
  if (validData(todoData)) {
    if (currentUser.todoArr == undefined) currentUser.todoArr = [];
    currentUser.todoArr.push(todoData);
    clearInput();
    storeCurrentUser();
    renderTableData(currentUser.userName);

    //Tìm user và lưu vào userArr
    // }

    for (let i = 0; i < userArr.length; i++) {
      if (
        userArr[i].username === currentUser.username &&
        userArr[i].password === currentUser.password
      ) {
        userArr[i].todoArr = currentUser.todoArr;
      }
    }
    storeUserArr(userArr);
    console.log(userArr);
  }
});

//4. Chức năng đánh dấu đã làm - Hàm toggle checked (lỗi đánh dấu isDone khi logout)
function toggleChecked(curr, data) {
  for (let i = 0; i < currentUser.todoArr.length; i++) {
    if (currentUser.todoArr[i].task == data) {
      curr.classList.toggle("checked");
      const check = curr.classList.value;
      currentUser.todoArr[i].isDone = check === "" ? false : true;
      storeCurrentUser();
      console.log(currentUser);
    }
  }
}

//5. Chức năng xóa task - Hàm delete task (lỗi trùng toggle chưa sửa)
function deleteTask(curr, data) {
  for (let i = 0; i < currentUser.todoArr.length; i++) {
    if (currentUser.todoArr[i].task == data) {
      if (confirm("Are you sure?")) {
        currentUser.todoArr.splice(i, 1);
        storeCurrentUser();
        renderTableData();
      } else {
        curr.parentElement.classList.toggle("checked");
      }
    }
  }
}
