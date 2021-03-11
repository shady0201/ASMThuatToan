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
  //  console.log("SelectionSort : " + data[midIndex].id);
    return midIndex;
  }

  if (findValue < data[midIndex].id) {
    maxIndex = midIndex;
  } else {
    minIndex = midIndex;
  }

  if (maxIndex - minIndex == 1) {
    if (findValue == data[minIndex].id) {
   //   console.log("SelectionSort : " + data[midIndex].id);
      return minIndex;
    } else if (findValue == data[maxIndex].id) {
  //   console.log("SelectionSort : " + data[maxIndex].id);
      return maxIndex;
    } else {
  //    console.log("SelectionSort : not found" );
      return -1;
    }
  }
  showBinary(data.slice(minIndex,maxIndex));
  return timKiemNhiPhan(data, findValue, minIndex, maxIndex);
}

// sắp xếp nổi bọt
function bubbleSort(data, index)
{
    if (index == 1){
      return;
    }

    for (let i = 0; i < index - 1; i++)
        if (data[i].luong < data[i+1].luong)
          swap(data,i, i+ 1);
        
    bubbleSort(data, index-1);
}

// xắp xếp selectionSort
function recurSelectionSort(data, lenght, index = 0) 
{ 
    if (index == lenght) 
       return; 
  
    let k = minIndex(data, index, lenght-1); 
  
    if (k != index) 
        swap(data,k, index);
  
    recurSelectionSort(data, lenght, index + 1); 
}

function minIndex(arr, i, j) 
{ 
    if (i == j) 
        return i; 
  
    let k = minIndex(arr, i + 1, j); 
  
    return (arr[i].luong < arr[k].luong) ? i : k;
} 

// hàm đổi vị trí dùng cho bubblesort và SelectionSort
function swap(arr, first_Index, second_Index) {
  var temp = arr[first_Index];
  arr[first_Index] = arr[second_Index];
  arr[second_Index] = temp;
}

function showBinary(data){
  let result = "";
  for (let i = 0; i < data.length; i++) {
    result += data[i].id + " "
  }
 // console.log("SelectionSort : " +result);
}

function showSelectionSort(data, min) {
  let result = "";
  for (let i = 0; i < data.length; i++) {
    if (i == min) result += "[" + data[i].luong + "] ";
    else {
      result += data[i].luong + " ";
    }
  }
 // console.log("SelectionSort : " + result);
}

function showBubbleSort(data, index1, index2) {
  let result = "";
  for (let i = 0; i < data.length; i++) {
    if (i == index1 || i == index2) result += "[" + data[i].luong + "] ";
    else {
      result += data[i].luong + " ";
    }
  }
//  console.log("BubbleSort : " + result);
}
