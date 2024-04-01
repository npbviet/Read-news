"use strict";
//1.Gọi hàm
const newsContainer = document.getElementById("news-container");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
const currentUser = getFromStorage("activeUser");
const apiKey = "22f941edc5474d0a8278be003963d13d";

//2. Hàm bổ sung
//2.1. Hàm hiển thị tin tức
const renderNews = function (data, classname = "") {
  newsContainer.innerHTML = "";
  for (let i = 0; i < data.articles.length; i++) {
    newsContainer.innerHTML += `
      <div class="card flex-row flex-wrap">
      <div class="card mb-3" style="">
      <div class="row no-gutters">
      <div class="col-md-4">
        <img src="${data.articles[i].urlToImage}" class="card-img" alt="${data.articles[i].title}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${data.articles[i].title}</h5>
          <p class="card-text">${data.articles[i].content}</p>
          <a href="${data.articles[i].url}"
            class="btn btn-primary">View</a>
        </div>
      </div>
      </div></div></div>`;
  }
};

//3. Bắt đầu sự kiện
//3.1. Load API + Hiển thị tin tức
let p = 1;
let totalResults = 0;
const loadNews = async function (currentUser) {
  try {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${p}&apiKey=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();
    totalResults = data.totalResults;
    console.log(data);
    renderNews(data);

    // Hiển thị page number
    pageNum.innerHTML = `${p}`;
    // Hiển thị nút prev
    if (p >= 2) {
      prevBtn.style.display = "block";
    } else {
      prevBtn.style.display = "none";
    }

    // Hiển thị nút next
    if (totalResults / 5 >= p) {
      nextBtn.style.display = "block";
    } else {
      nextBtn.style.display = "none";
    }
  } catch (err) {
    console.error(err);
  }
};

loadNews(currentUser);

//3.2. Chức năng cho phím next/previous
//3.2.1 Chức năng phím prev
prevBtn.addEventListener("click", function () {
  console.log("test");
  if (p >= 2) {
    p--;
    loadNews(currentUser);
  }
});

//3.2.2 Chức năng phím next
nextBtn.addEventListener("click", function () {
  console.log("test");
  if (totalResults / 5 >= p) {
    p++;
    loadNews(currentUser);
  }
});
