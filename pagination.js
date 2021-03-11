const itemPerPage = 10;
let maxPageShow = 5;

let curPage = 1;
let totalPage = 0;
let data = [];

// DOM
const pagi = document.getElementById("pagi");

// hàm chạy 1 lần khi có data mới để setup lại pagination, gọi hàm này mỗi khi có data mới
function setupPagination(result) {
  // lấy data
  data = result;

  // tổng số trang
  totalPage = Math.ceil(data.length / itemPerPage);

  // trang select hiện tại
  curPage = 1;

  pagination();
}

function pagination() {

  // làm mới listButton
  pagi.innerHTML = "";

  pagiUpdate(getDataPagination());

  if (totalPage <= 1) { 
    return;
  }

  // ---- BUTTON PAGE ---- ///

    // button pre
    if(curPage > 3 && totalPage > maxPageShow){
        pagi.innerHTML += `<div class="b-dir b-pre" onclick="clickButtonDir(-1)">&lt; Trước</div>`;
    }

   // trường hợp 1: số trang <= max trang mặc định
  if (totalPage <= maxPageShow) {
    for (let i = 1; i <= totalPage; i++) {
      pagi.innerHTML += `<div class="b-page ${i == curPage ? `b-act` : ""}" onclick="onClickPage(${i})">${i}</div>`;
    }
  }else{
    // trường hợp 2: số trang > max trang mặc định

    if(curPage <= 3){
        pagi.innerHTML += `<div class="b-page ${curPage == 1 ? `b-act` : ""}" onclick="onClickPage(1)">1</div>`;
        pagi.innerHTML += `<div class="b-page ${curPage == 2 ? `b-act` : ""}" onclick="onClickPage(2)">2</div>`;
        pagi.innerHTML += `<div class="b-page ${curPage == 3 ? `b-act` : ""}" onclick="onClickPage(3)">3</div>`;
        pagi.innerHTML += `<div class="b-page ${curPage == 4 ? `b-act` : ""}" onclick="onClickPage(4)">4</div>`;
         // dot
         pagi.innerHTML += `<div class="dot" onclick="clickButtonDir(3)">. . .</div>`;
         // page cuối
         pagi.innerHTML += `<div class="b-page" onclick="onClickPage(${totalPage})">${totalPage}</div>`;

    }
    else if(totalPage - curPage < 3){

        // page đầu
        pagi.innerHTML += `<div class="b-page" onclick="onClickPage(1)">1</div>`;
        // dot
        pagi.innerHTML += `<div class="dot" onclick="clickButtonDir(-3)">. . .</div>`;
        pagi.innerHTML += `<div class="b-page ${curPage == totalPage - 3 ? `b-act` : ""}" onclick="onClickPage(${totalPage - 3})">${totalPage -3}</div>`;
        pagi.innerHTML += `<div class="b-page ${curPage == totalPage - 2 ? `b-act` : ""}" onclick="onClickPage(${totalPage - 2})">${totalPage -2}</div>`;
        pagi.innerHTML += `<div class="b-page ${curPage == totalPage - 1 ? `b-act` : ""}" onclick="onClickPage(${totalPage -1})">${totalPage -1}</div>`;
        pagi.innerHTML += `<div class="b-page ${curPage == totalPage ? `b-act` : ""}" onclick="onClickPage(${totalPage})">${totalPage}</div>`;

    }else{
        // page đầu
        pagi.innerHTML += `<div class="b-page " onclick="onClickPage(1)">1</div>`;
        // dot
        pagi.innerHTML += `<div class="dot" onclick="clickButtonDir(-3)">. . .</div>`;
        // page left
        pagi.innerHTML += `<div class="b-page" onclick="onClickPage(${curPage-1})">${curPage-1}</div>`;
        // curPage
        pagi.innerHTML += `<div class="b-page b-act" onclick="onClickPage(${curPage})">${curPage}</div>`;
        // page right
        pagi.innerHTML += `<div class="b-page" onclick="onClickPage(${curPage+1})">${curPage+1}</div>`;
        // dot
        pagi.innerHTML += `<div class="dot" onclick="clickButtonDir(3)">. . .</div>`;
        // page cuối
        pagi.innerHTML += `<div class="b-page" onclick="onClickPage(${totalPage})">${totalPage}</div>`;
    }
    
  }

  // button next
  if(totalPage - curPage > 2){
    pagi.innerHTML += `<div class="b-dir b-next" onclick="clickButtonDir(1)">Sau &gt;</div>`;
  }

}

function clickButtonDir(number){

    curPage += number;
    if(curPage < 1){
        curPage++;
    }else if(curPage > totalPage){
        curPage--;
    }

    pagination();
}

function getDataPagination() {
  return data.slice((curPage - 1)*itemPerPage, (curPage - 1)*itemPerPage + itemPerPage);
}

function onClickPage(pageNumber) {
  // đặt lại vị trí trang hiện tại
  curPage = pageNumber;
  pagination();
}
