// 31 最大连续子数组的和
function getMaxCount(arr) {
  if(arr.length <= 0) return 0;
  let res = arr[0];
  let maxSubArr = [arr[0]];
  let tmp = arr[0];
  let tmpSubArr = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    if(tmp < 0 && arr[i] >= 0) {
      res = arr[i];
      maxSubArr = [arr[i]];
      tmp = arr[i];
      tmpSubArr = [arr[i]];
    } else {
      tmp += arr[i];
      tmpSubArr.push(arr[i]);
      if(tmp > res) {
        res = tmp;
        maxSubArr = [...tmpSubArr];
      }
    }
  }
  return {res, maxSubArr};
}

//31.1 动态规划处理最大子数组和
function dmMaxCount(arr) {
  if(arr.length <= 0) return 0;
  function getIndex(i) {
    if(i === 0) return arr[i];
    if(getIndex(i - 1) < 0) return arr[i];
    return getIndex(i - 1) + arr[i];
  }
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(getIndex(i));
  }
  return Math.max.apply(null, res);
}

// 32 从1到n整数中1出现的次数
function getNumFromOneToN(num) {
  if(num <= 0) return 0;
  if(num > 0 && num < 10) return 1;
  num = num + '';
  const first = +num[0];
  let firstDigit;
  let otherDigit;
  let recursive;
  if(first > 1) {
    firstDigit = Math.pow(10, num.length - 1);
  } else {
    firstDigit = num - Math.pow(10, num.length - 1) + 1;
  }
  otherDigit = first * (num.length - 1) * Math.pow(10, num.length - 2);
  recursive = getNumFromOneToN(+num - first * Math.pow(10, num.length - 1));
  recursive = getNumFromOneToN(+num - first * Math.pow(10, num.length - 1));
  return firstDigit + otherDigit + recursive;
}

// 33 把数组排成最小的数
function getMinNum(arr) {
  function compare(a, b) {
    let astr = '' + a + b;
    let bstr = '' + b + a;
    let i = 0;
    while(i < astr.length) {
      if(astr[i] < bstr[i]) {
        return -1;
      } else if(astr[i] > bstr[i]) {
        return 1;
      } else {
        i++;
      }
    }
    return -1;
  }
  return +(arr.sort(compare).join(''));
}

// 34 第1500 个臭数
function getUglyNumber(index) {
  if (index <= 0) {
    return 0;
  }
  const uglyArr = [1];
  let next = 1;
  let next2 = 1;
  let next3 = 1;
  let next5 = 1;
  while(next < index) {
    const tmp = Math.min(next2 * 2, next3 * 3, next5 * 5);
    uglyArr.push(tmp);
    next++;
    while(next2 * 2 <= tmp) {
      next2++;
    }
    while(next3 * 3 <= tmp) {
      next3++;
    }
    while(next5 * 5 <= tmp) {
      next5++;
    }
  }
  return uglyArr[index - 1];
}

// 35 第一个只出现一次的字符
function findOnlyOne(str) {
  const map = new Map();
  for(let i = 0; i < str.length; i++) {
    if(map.has(str[i])) {
      map.set(str[i], map.get(str[i]) + 1);
    } else {
      map.set(str[i], 1);
    }
  }
  for(const key of map.keys()) {
    if(map.get(key) === 1) {
      return key;
    }
  }
}
// 35.1 从str1 中删除在str2 中出现过的字符
function deleteStr1Fromstr2(str1, str2) {
  const obj = {};
  for (const char of str2) {
    obj[char] = true;
  }
  let res = '';
  for (const key of str1) {
    if(!obj[key]) {
      res += key;
    }
  }
  return res;
}
// 35.2 删除重复出现的字符
function deleteRepeatedChar(str) {
  let res = '';
  const obj = {};
  for (const key of str) {
    if(!obj[key]) {
      obj[key] = true;
      res += key;
    }
  }
  return res;
}
// 35.3 判断两个单词为变位词，即: 出现的字母种类相同，而且每种字母出现的次数相同
function IsBianweiWord(str1, str2) {
  if(str1.length !== str2.length) return false;
  const obj1 = {};
  const obj2 = {};
  let i = 0;
  while(i < str1.length) {
    if(obj1[str1[i]]) {
      obj1[str1[i]] += 1;
    } else {
      obj1[str1[i]] = 1;
    }
    if(obj2[str2[i]]) {
      obj2[str2[i]] += 1;
    } else {
      obj2[str2[i]] = 1;
    }
    i++;
  }
  for (const key of Object.keys(obj1)) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

// 36 求数组中逆序对数量
function findReverseNum(arr) {
  if(arr.length === 0) return 0;
  const copy = [];
  for (let i = 0; i < arr.length; i++) {
    copy.push(arr[i]);
  }
  function calcNum(arr, copy, start, end) {
    if(start === end) {
      copy[start] = arr[start];
      return 0;
    }
    let count = 0;
    const len = Math.floor((end - start) / 2);
    const left = calcNum(copy, arr, start, start + len);
    const right = calcNum(copy, arr, start + len + 1, end);
    let copyI = end;
    let j = end;
    i = start + len;
    while(i >= start && j >= start + len + 1) {
      if(arr[i] > arr[j]) {
        copy[copyI] = arr[i];
        i--;
        copyI--;
        count += j - start - len;
      } else {
        copy[copyI] = arr[j];
        j--;
        copyI--;
      }
    }
    for(; i >= start; i--) {
      copy[copyI] = arr[i];
      copyI--;
    }
    for(; j >= start + len + 1; j--) {
      copy[copyI] = arr[j];
      copyI--;
    }
    return left + right + count;
  }
  return calcNum(arr, copy, 0, arr.length - 1);
}

// 37 两个链表的第一个公共节点
function findCommonNode(head1, head2) {
  let len1 = 0;
  let len2 = 0;
  let cur1 = head1;
  let cur2 = head2;
  while(cur1) {
    cur1 = cur1.next;
    len1++;
  }
  cur2 = head2;
  while(cur2) {
    cur2 = cur2.next;
    len2++;
  }
  cur2 = head2;
  cur1 = head1;
  if(len2 > len1) {
    let d = len2 - len1;
    let tmp = 0;
    while(tmp < d) {
      cur2 = cur2.next;
      tmp++;
    }
  } else if(len2 < len1) {
    let d = len1 - len2;
    let tmp = 0;
    while(tmp < d) {
      cur1 = cur1.next;
      tmp++;
    }
  }
  while(cur1 && cur2) {
    if(cur1 === cur2) return cur1;
    cur1 = cur1.next;
    cur2 = cur2.next;
  }
  return null;
}

// 38 数组中数字的出现次数
function findNumCount(arr, num) {
  if(arr.length === 0) return 0;
  function findIndex(arr, num, start, end) {
    if(start > end) return false;
    const mid = Math.floor((end - start) / 2);
    if(arr[mid] > num) return findIndex(arr, num, start, mid - 1);
    if(arr[mid] < num) return findIndex(arr, num, mid + 1, end);
    if(arr[mid] === num) {
      const res = {};
      if(arr[mid - 1] !== num) {
        res.start = mid - 1;
      } else {
        res.start = findFirst(arr, num, start, mid - 1);
      }
      if(arr[mid + 1] !== num) {
        res.end = mid + 1;
      } else {
        res.end = findLast(arr, num, mid + 1, end);
      }
      return res;
    }
  }
  function findFirst(arr, num, start, end) {
    const mid = Math.floor((start + end) / 2);
    if(arr[mid] < num) {
      return findFirst(arr, num, mid + 1, end);
    } else if(arr[mid] === num) {
      if(arr[mid - 1] !== num) {
        return mid;
      } else {
        return findFirst(arr, num, start, mid - 1);
      }
    }
  }

  function findLast(arr, num, start, end) {
    const mid = Math.floor((start + end) / 2);
    if(arr[mid] > num) {
      return findLast(arr, num, start, mid - 1);
    } else if(arr[mid] === num) {
      if(arr[mid + 1] !== num) {
        return mid;
      } else {
        return findLast(arr, num, mid + 1, end);
      }
    }
  }
  const res = findIndex(arr, num, 0, arr.length - 1);
  return res ? res.end - res.start + 1 : 0;
}

// 39 二叉树的深度
function findTreeDepth(root) {
  if(!root) return 0;
  return 1 + Math.max(findTreeDepth(root.left), findTreeDepth(root.right));
}

// 39.1 判断是是否为平衡二叉树
function isBalancedTree(root) {
  const obj = {
    left: 0,
    right: 0
  };
  function isbalanced(root, isLeft, obj) {
    if(!root) {
      return true;
    }
    const depth = {left: 0, right: 0};
    if(isbalanced(root.left, true, depth) && isbalanced(root.right, false, depth)) {
      const diff = depth.left - depth.right;
      if(diff <= 1 && diff >= -1) {
        if (isLeft) {
          obj.left = 1 + Math.max(depth.left, depth.right);
        } else {
          obj.right = 1 + Math.max(depth.left, depth.right);
        }
        return true;
      }
    }
    return false;
  }
  if(isbalanced(root.left, true, obj) && isbalanced(root.right, false, obj)) {
    const diff = obj.left - obj.right;
    if(diff  <= 1 && diff >= -1) {
      return true;
    }
  }
  return false;
}

// 40 数组中只出现一次的数字
function findOnlyOnce(arr) {
  let tmp = arr[0];
  let n = 0;
  for (let i = 1; i < arr.length; i++) {
    tmp = arr[i] ^ tmp;
  }
  if(tmp) {
    for(;;n++) {
      if((tmp & Math.pow(2, n)) !== 0) {
        break;
      }
    }
    const swap = function(arr, i, j) {
      let tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    };
    let compare = Math.pow(2, n);
    let i = 0;
    let j = arr.length - 1;
    while(i <= j) {
      if((arr[i] & compare) === compare && (arr[j] & compare) === 0) {
        i++;
        j--;
      } else if((arr[i] & compare) === 0 && (arr[j] & compare) === compare) {
        swap(arr, i, j);
        i++;
        j--;
      } else if((arr[i] & compare) === 0 && (arr[j] & compare) === 0) {
        j--;
      } else if((arr[i] & compare) === compare && (arr[j] & compare) === compare) {
        i++;
      }
    }
    const res = [arr[0], arr[i]];
    for(let m = 1; m < i; m++) {
      res[0] = arr[m] ^ res[0];
    }
    for(let k = i + 1; k < arr.length; k++) {
      res[1] = res[1] ^ arr[k];
    }
    return res;
  }
}
