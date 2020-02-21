// 41 排序数组中和为指定值的2个元素
function findNumBySum(arr, num) {
  let i = 0;
  let j = arr.length - 1;
  while(i < j) {
    if(arr[i] + arr[j] === num) {
      return [arr[i], arr[j]];
    } else if(arr[i] + arr[j] > num) {
      j--;
    } else {
      i++;
    }
  }
  return false;
}
// 41.1 和为s的连续正数序列
function findContinuArr(num) {
  if(num < 3) return;
  const res = [];
  let small = 1;
  let big = 2;
  let sum = small + big;
  const middle = Math.floor(num / 2);
  while(small <= middle) {
    if(sum === num) {
      res.push([small, big]);
    }
    while(sum > num && small <= middle) {
      sum -= small;
      small++;
      if(sum === num) {
        res.push([small, big]);
      }
    }
    big++;
    sum += big;
  }
  return res;
}

// 42 翻转单词顺序
function reverseWords (str) {
  if(str.length === 1) return str;
  let reversed = '';
  let res = '';
  for(let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  let start = 0;
  let end = 0;
  for(let i = 1; i < reversed.length; i++) {
    if(reversed[i] === ' ') {
      let reversedPart = reversePart(reversed, start, end);
      if(start !== 0) {
        res += ' ';
      }
      res += reversedPart;
      start = i + 1;
    }
    end++;
  }
  res += ' ' + reversePart(reversed, start, end);
  function reversePart(str, start, end) {
    let res = '';
    for(let i = end; i >= start; i--) {
      res += str[i];
    }
    return res;
  }
  return res;
}
// 42.1 左旋转字符串中的一部分
function leftRotateStr(str, num) {
  let frontN = '';
  let res = '';
  for(let i = 0; i < str.length; i++) {
    if (i < num) {
      frontN += str[i];
    } else {
      res += str[i];
    }
  }
  res += frontN;
  return res;
}

// 43 n 个骰子的点数
function getPointsByShazi(n) {
  if (n < 1) {
    return;
  }
  const sArr = [];
  const maxVal = n * 6;
  const total = Math.pow(6, n);
  for (let i = n; i <= maxVal; i++) {
    sArr[i - n] = 0;
  }
  for (let i = n; i <= maxVal; i++) {
    sArr[i - n] = getCount(n, i);
  }
  for(let i = 0; i < sArr.length; i++) {
    console.log(i + n, ' ratio ', sArr[i] / total);
  }
  function getCount(n, sum) {
    if(n === 0) return 0;
    if(sum < 1) return 0;
    if(n === 1) {
      if(sum < 1 || sum > 6) {
        return 0;
      } else {
        return 1;
      }
    }
    let res = 0;
    for(let i = 1; i <= 6; i++) {
      res += getCount(n - 1, sum - i);
    }
    return res;
  }
}

// 44 扑克牌的顺子
function isShunzi(n) {
  n.sort((a, b) => a - b);
  let numberZero = 0;
  let numberGap = 0;
  let last = 0;
  for(let i = 0; i < n.length; i++) {
    if(n[i] === 0) {
      numberZero++;
    } else {
      if(n[i] === last) return false;
       if(last !== 0) {
         numberGap += n[i] - last - 1;
       }
      last = n[i];

    }
  }
  return numberZero + 1 >= numberGap;
}

// 45 圆圈中最后剩余的数字
function getCircleLast(n, m) {
  let tmp = 1;
  let cur = head = {val: 0, next: null};
  while(tmp < n) {
    cur.next = {val: tmp, next: null};
    cur = cur.next;
    tmp++;
  }
  cur.next = head;
  let prev = cur;
  cur = head;
  tmp = 1;
  while(prev !== cur) {
    while(tmp < m) {
      prev = cur;
      cur = cur.next;
      tmp++;
    }
    prev.next = cur.next;
    cur = cur.next;
    tmp = 1;
  }
  return cur.val;
}

// 46 求 1 + 2 + ... + n
function getSum(n) {
  const arr = {
    false: function () { return 0; },
    true: getSum
  };
  return n + arr[!!n](n - 1);
}

// 47 不能用加减乘除做加法
function twoNumSum(a, b) {
  let sum, canary;
  sum = a ^ b;
  canary = (a & b) << 1;
  while(canary) {
    let tmp = sum;
    sum = sum ^ canary;
    canary = (tmp & canary) << 1;
  }
  return sum;
}

// 47.1 交换两个变量的值
function swap(a, b) {
  a = a + b;
  b = a - b;
  a = a - b;
}
function swapXor(a, b) {
  a = a ^ b;
  b = a ^ b;
  a = a ^ b;
}

// 48 构造函数 检测 this instanceof constructor 才执行

// 49 字符串转为整数
function strToInt(str) {
  let num = NaN;
  if(!str) return NaN;
  const numReg = /\d/;
  const minus = str[0] === '-';
  for(let i = 1; i < str.length; i++) {
    if(numReg.test(str[i])) {
      if(i === 1) num = 0;
      num = num * 10 + (+str[i]);
      minus && (num = -1 * num);
    } else {
      break;
    }
  }
  return num;
}

// 50 树中两个节点最低公共祖先
function findCommonParent(root, node1, node2) {
  if(!root || !node1 || !node2) return null;
  function findPath(root, node, path) {
    if(root === node) return true;
    path.push(root);
    let found = false;
    for (let i = 0; i < root.children.length; i++) {
      found = findPath(root.children[i], node, path);
      if(found) {
        return true;
      }
    }
    if(!found) {
      path.pop();
    }
  }
  function findCommonNode(path1, path2) {
    let tmp = Math.abs(path1.length - path2.length);
    let i = path1.length - 1, j = path2.length - 1;
    if(path1.length > path2.length) {
      i = i - tmp;
    } else if(path1.length < path2.length) {
      j = j - tmp;
    }
    while(i >= 0 && j >= 0) {
      if(path1[i] === path2[j]) {
        return path1[i];
      }
      i--;
      j--;
    }
    return null;
  }
  const path1 = [];
  const path2 = [];
  findPath(root, node1, path1);
  findPath(root, node2, path2);
  return findCommonNode(path1, path2);
}
