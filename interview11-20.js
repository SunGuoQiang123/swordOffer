// 11 模拟 Math.pow
function pow(base, exponent) {
  if(exponent === 0) return 1;
  if(base === 0 && exponent > 0) return 0;
  if(base === 0 && exponent < 0) return Infinity;
  let res = pow(base, exponent >> 1);
  res = res * res;
  if(exponent & 1 === 1) {
    res *= base;
  }
  return res;
}

// 12 打印 1 到 n 位最大整数
function printMaxN(n) {
  if(n <= 0) return;
  for(let i = 1; i < 10; i++) {
    console.log(i);
  }
  let res = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let i = 2;
  while(i <= n) {
    let tmp = res.slice();
    for(let k = 1; k < 10; k++) {
      for(let j = 0; j < res.length; j++) {
        console.log(k + tmp[j]);
        tmp.push(k + tmp[j]);
      }
    }
    i++;
    res = tmp;
  }
}

// 13 O(1) 删除链表中节点
function LinkNode(val) {
  this.val = val;
  this.next = null;
}
function DeleteNode(head, node) {
  const next = node.next;
  if (next) {
    node.val = next.val;
    node.next = next.next;
  } else if(head === node) {
    head = null;
  } else {
    let cur = head;
    while(cur.next !== node) {
      cur = cur.next;
    }
    cur.next = null;
  }
  return head;
}

// 14 奇数放在偶数前 数组 可扩展性
function reorderArr(arr, fun) {
  if(arr.length <= 1) return arr;
  let i = 0;
  let j = arr.length - 1;
  while(i < j) {
    if (fun(arr[i]) && !fun(arr[j])) {
      i++;
      j--;
    } else if(fun(arr[i]) && fun(arr[j])) {
      i++;
    } else if(!fun(arr[i]) && !fun(arr[j])) {
      j--;
    } else {
      swap(arr, i, j);
      i++;
      j--;
    }
  }
  return arr;
  function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}

// 15 查找链表倒数第 k 个节点
function getLastKNode(head, k) {
  if (!head) {
    return null;
  }
  if(k === 0) return null;
  let n = 1;
  let cur = head;
  let second = head;
  while(n < k) {
    if(!cur) return null;
    cur = cur.next;
    n++;
  }
  while(cur.next) {
    second = second.next;
    cur = cur.next;
  }
  return second;
}
// 15.1 求链表中间节点
function getMiddleNode(head) {
  if(!head) return null;
  let first = head;
  let second = head;
  while(second && second.next) {
    second = second.next.next;
    first = first.next;
  }
  return first;
}
// 15.2 判断链表成环
function isCircleNode(head) {
  if(!head || !head.next) return false;
  let second = head;
  let first = head;
  while(second && second.next) {
    second = second.next.next;
    first = first.next;
    if (first === second) {
      return true;
    }
  }
  return false;
}
