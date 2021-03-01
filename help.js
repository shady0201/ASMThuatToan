function getLocalAsObject(key) {
  return JSON.parse(localStorage.getItem(key));
}

function updateLocal(key, values) {
  let valuesJs = JSON.stringify(values);
  localStorage.setItem(key, valuesJs);
}

function restoreData() {
  localStorage.setItem(keyData, JSON.stringify(danhSachNhanVien));
}

// tìm kiếm nhị phân
function timKiemNhiPhan(data, findValue, minIndex, maxIndex) {
  let midIndex = Math.ceil((minIndex + maxIndex) / 2);

  if (findValue == data[midIndex].id) {
    console.log("SelectionSort : " + data[midIndex].id);
    return midIndex;
  }

  if (findValue < data[midIndex].id) {
    maxIndex = midIndex;
  } else {
    minIndex = midIndex;
  }

  if (maxIndex - minIndex == 1) {
    if (findValue == data[minIndex].id) {
      console.log("SelectionSort : " + data[midIndex].id);
      return minIndex;
    } else if (findValue == data[maxIndex].id) {
      console.log("SelectionSort : " + data[maxIndex].id);
      return maxIndex;
    } else {
      console.log("SelectionSort : not found" );
      return -1;
    }
  }
  showBinary(data.slice(minIndex,maxIndex));
  return timKiemNhiPhan(data, findValue, minIndex, maxIndex);
}

// sắp xếp nổi bọt
function bubbleSort(data) {
  let len = data.length,
    i,
    j,
    stop;

  for (i = 0; i < len; i++) {
    for (j = 0, stop = len - i; j < stop; j++) {
      if (j + 1 <= len - 1)
        if (data[j].luong < data[j + 1].luong) {
          swap(data, j, j + 1);
          showBubbleSort(data, j, j + 1);
        }
    }
  }

  return data;
}

function swap(arr, first_Index, second_Index) {
  var temp = arr[first_Index];
  arr[first_Index] = arr[second_Index];
  arr[second_Index] = temp;
}

// xắp xếp selectionSort
function selectionSort(data) {
  let n = data.length;

  for (let i = 0; i < n; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (data[j].luong < data[min].luong) {
        min = j;
      }
    }
    if (min != i) {
      let tmp = data[i];
      data[i] = data[min];
      data[min] = tmp;
      showSelectionSort(data, i);
    }
  }
  return data;
}

function showBinary(data){
  let result = "";
  for (let i = 0; i < data.length; i++) {
    result += data[i].id + " "
  }
  console.log("SelectionSort : " +result);
}

function showSelectionSort(data, min) {
  let result = "";
  for (let i = 0; i < data.length; i++) {
    if (i == min) result += "[" + data[i].luong + "] ";
    else {
      result += data[i].luong + " ";
    }
  }
  console.log("SelectionSort : " + result);
}

function showBubbleSort(data, index1, index2) {
  let result = "";
  for (let i = 0; i < data.length; i++) {
    if (i == index1 || i == index2) result += "[" + data[i].luong + "] ";
    else {
      result += data[i].luong + " ";
    }
  }
  console.log("BubbleSort : " + result);
}
