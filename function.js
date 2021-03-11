
// load data nếu chưa có trong local
setLocalData();

// hiển thị local lên DOM khi mới mở trang
showLocalData();

// tìm kiếm lần đầu khi load trang
search();


// tìm kiếm tổng : lương , tên, pagination
function search() {
  let searchBar = document.getElementById("searchBar");
  let select = document.getElementById("selectSalary");
  let type = document.getElementById("searchType");

  let searchResult = [];
  let searchString = searchBar.value;
  let sortType = select.value === "luongTang" ? 0 : 1;
  let searchType = type.getAttribute("value");

  // xử lý search bar
  if (searchString.length > 0 || searchString.trim().length > 0) {
    if(searchType == "name")
      searchResult = findItemByName(searchString);
    else
      searchResult.push(findItemById(searchString));

  } else {
      searchResult = getLocalAsObject(keyData);
  }

  // sort kết quả theo lương
  if (sortType === 0) {
    // lương tăng dần
    recurSelectionSort(searchResult,searchResult.length);
  } else {
    // lương giảm dần
    bubbleSort(searchResult,searchResult.length);
  }

  // lấy thông tin chia trang
  setupPagination(searchResult);

}


// lấy kết quả tìm kiếm bằng tên
function findItemByName(name) {
  let data = getLocalAsObject(keyData);
  let result = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].ten.toLowerCase().includes(name.toLowerCase())) {
      result.push(data[i]);
    }
  }
  return result;
}

// lấy kết quả tìm kiếm bằng id
function findItemById(id){
  let data = getLocalAsObject(keyData);
  
  let index = timKiemNhiPhan(data,id,0,data.length -1);

  return data[index];
}

// click đổi loại tìm kiếm
function clickSearchType(button){
  let value = button.getAttribute("value");
  value =  value == "name" ? "id" : "name";
  
  button.className = value == "name"? "search-type type-name" : "search-type type-id";

  button.classList.toggle("run");
  button.classList.toggle("run");

  button.setAttribute("value",value);
  button.innerHTML = value == "name" ? "Tên" : "Id";
}

function setLocalData() {
  let local = getLocalAsObject(keyData);
  if (local === null || local.length == 0) {
    restoreData();
  }
}

function showLocalData() {
  let data = getLocalAsObject(keyData);
  loadDataToDOM(data);
}

function loadDataToDOM(data) {
  let body = document.getElementById("list");

  // clean list in DOM
  body.innerHTML = "";

  //them item vao danh sach
  for (let i = 0; i < data.length; i++) {
    body.append(makeItemDOM(data[i], (i ^ 1) > i));
  }
}

function makeItemDOM(item, even) {
  let itemDOM = document.createElement("div");
  itemDOM.className = even ? "item" : "item odd-item";
  itemDOM.id = item.id;

  let idDOM = document.createElement("div");
  idDOM.className = "header-id";
  idDOM.innerHTML = item.id;

  let nameDOM = document.createElement("div");
  nameDOM.className = "header-name";
  nameDOM.innerHTML = item.ten;

  let salaryDOM = document.createElement("div");
  salaryDOM.className = "header-salary";
  salaryDOM.innerHTML = item.luong;

  let actionDOM = document.createElement("div");
  actionDOM.className = "header-action";

  let removeDOM = document.createElement("img");
  removeDOM.className = "remove-icon";
  removeDOM.src = "/ASMThuatToan/remove.png";
  removeDOM.addEventListener("click", () => removeItem(item.id));

  actionDOM.append(removeDOM);

  itemDOM.append(idDOM);
  itemDOM.append(nameDOM);
  itemDOM.append(salaryDOM);
  itemDOM.append(actionDOM);

  return itemDOM;
}

function removeItem(id) {
  // xoa dom
  let itemDOM = document.getElementById(id);
  let listDOM = document.getElementById("list");

  if (itemDOM !== null) listDOM.removeChild(itemDOM);

  // xoa data trong local
  let data = getLocalAsObject(keyData);

  //dung vong lap de xoa phan tu
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      data.splice(i, 1);
    }
  }

  // luu lai data da xoa len local
  updateLocal(keyData, data);
}
