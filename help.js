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
    return midIndex;
  }

  if (findValue < data[midIndex].id) {
    maxIndex = midIndex;
  } else {
    minIndex = midIndex;
  }

  if (maxIndex - minIndex == 1) {
    if (findValue == data[minIndex].id) {
      return minIndex;
    } else if (findValue == data[maxIndex].id) {
      return maxIndex;
    } else {
      return -1;
    }
  }

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
    // Finding the smallest number in the subarray
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (data[j].luong < data[min].luong) {
        min = j;
      }
    }
    if (min != i) {
      // Swapping the elements
      let tmp = data[i];
      data[i] = data[min];
      data[min] = tmp;
    }
  }
  return data;
}

