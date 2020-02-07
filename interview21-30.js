// 21 包含 min 函数的栈
function Stack() {
  this.arr = [];
  this._minArr = [];
}
Stack.prototype.min = function() {
  if (this._minArr.length > 0) {
    const last = this._minArr.length - 1;
    return this._minArr[last];
  }
};
Stack.prototype.push = function(val) {
  if (val < this.min() || this._minArr.length === 0) {
    this._minArr.push(val);
  }
  this.arr.push(val);
};
Stack.prototype.pop = function() {
  const out = this.arr.pop();
  if(out === this.min()) {
    this._minArr.pop();
  }
};

// 22 压栈 入栈顺序
function isPopOrder(stack1, stack2) {
  if (!stack2.length) {
    return true;
  }
  if(!stack1.length) {
    return false;
  }
  const asistStack = [];
  for(let i = 0; i < stack2.length; i++) {
    const last = asistStack.length - 1;
    if (asistStack[last] === stack2[i]) {
      asistStack.pop();
    } else {
      if(stack1.length === 0) return false;
      for(let j = 0; j < stack1.length; j++) {
        if(stack1[j] !== stack2[i]) {
          asistStack.push(stack1.shift());
          if(stack1.length === 0) return false;
          j--;
        } else {
          stack1.splice(j, 1);
          break;
        }
      }
    }
  }
  return true;
}

// 23 bfs 广度优先遍历二叉树
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}
function bfsTree(root) {
  if(!root) return false;
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    console.log(node.val);
    if (node.left) {
      queue.push(node.left);
    }
    if(node.right) {
      queue.push(node.right);
    }
  }
}

// 24 判断数组为后序遍历二叉搜索树
function isBackTraverse(arr) {
  if(arr.length <= 2) return true;
  const root = arr[arr.length - 1];
  const left = [];
  const right = [];
  let startRight = false;
  for(let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < root) {
      if(startRight) return false;
      left.push(arr[i]);
    } else if(arr[i] >= root) {
      !startRight && (startRight = true);
      right.push(arr[i]);
    }
  }
  return isBackTraverse(left) && isBackTraverse(right);
}
// 24.1 判断数组为前序遍历二叉搜索树
function isPreTraverse(arr) {
  if(arr.length <= 2) return true;
  const root = arr[0];
  const left = [];
  const right = [];
  let startRight = false;
  for (let i = 1; i < arr.length; i++) {
    if(arr[i] < root) {
      if(startRight) return false;
      left.push(arr[i]);
    } else {
      !startRight && (startRight = true);
      right.push(arr[i]);
    }
  }
  return isPreTraverse(left) && isPreTraverse(right);
}

// 25 找出二叉树中节点值和为指定值的路径
function findPath(root, total) {
  if(!root) return false;
  const isLeaf = !root.left && !root.right;
  if(isLeaf) {
    return root.val === total ? [[root.val]] : false;
  } else {
    const res = [];
    const divide = total - root.val;
    const left = findPath(root.left, divide);
    const right = findPath(root.right, divide);
    if(left) {
      for (let i = 0; i < left.length; i++) {
        res.push([root.val, ...left[i]]);
      }
    }
    if(right) {
      for (let i = 0; i < right.length; i++) {
        res.push([root.val, ...right[i]]);
      }
    }
    return res;
  }
}

// 26 复杂链表的复制
function ComplexNode(val) {
  this.val = val;
  this.next = null;
  this.sibling = null;
}
function complexCopy(root) {
  if(!root) return null;
  const newHead = new ComplexNode(root.val);
  let newCur = newHead;
  let cur = root.next;
  const map = new Map();
  map.set(root, newHead);
  while(cur) {
    const node = new ComplexNode(cur.val);
    newCur.next = node;
    map.set(cur, node);
    newCur = newCur.next;
    cur = cur.next;
  }
  cur = root;
  newCur = newHead;
  while(cur) {
    const sibling = cur.sibling;
    const newSibling = map.get(sibling);
    newCur.sibling = newSibling;
    cur = cur.next;
    newCur = newCur.next;
  }
  return newHead;
}
// 26.1 O(n) 原地复制
function complexCopyInplace(root) {
  if(!root) return null;
  let cur = root;
  // 原地复制相同节点在当前节点后面
  while(cur) {
    node = new ComplexNode(cur.val);
    let tmp = cur.next;
    cur.next = node;
    node.next = tmp;
    cur = tmp;
  }
  // 原地设置sibling
  cur = root;
  while(cur) {
    const sibling = cur.sibling;
    if(sibling) {
      cur.next.sibling = sibling.next;
    }
    cur = cur.next;
  }
  // 切分为2个链表
  cur = root;
  const newHead = cur.next;
  let newCur = newHead;
  while(cur) {
    cur.next = cur.next.next;
    if(cur.next) {
      newCur.next = cur.next.next;
    }
    cur = cur.next;
    newCur = newCur.next;
  }
  return newHead;
}

// 27 BST 转双向链表
function BSTConvartLink(root) {
  if(!root) return null;
  let lastNode = null;
  function convert(root) {
    if(!root) return;
    if(root.left) {
      convert(root.left);
    }
    if(lastNode) {
      lastNode.right = root;
    }
    root.left = lastNode;
    lastNode = root;
    if(root.right) {
      convert(root.right);
    }
  };
  convert(root);
  while(lastNode && lastNode.left) {
    lastNode = lastNode.left;
  }
  return lastNode;
}

// 28 字符串全排列
function strAll(str) {
  if(!str.length) return [];
  if(str.length === 1) return [str];
  const res = [];
  const strArr = str.split('');
  const first = [];
  for(let i = 0; i < strArr.length; i++) {
    if(i === 0) {
      const arr = strAll(strArr.slice(1).join(''));
      for(let j = 0; j < arr.length; j++) {
        res.push(strArr[i] + arr[j]);
      }
      first.push(strArr[i]);
    } else {
      if(!first.includes(strArr[i])) {
        first.push(strArr[i]);
        let tmp = strArr.slice();
        tmp.splice(i, 1);
        const arr = strAll(tmp.join(''));
        for (let j = 0; j < arr.length; j++) {
          res.push(strArr[i] + arr[j]);
        }
      }
    }
  }
  return res;
}

// 28.1 获取排列满足立方体相对面顶点和相等
function getNumberSort(arr) {
  const res = getGroup(arr);
  const result = [];
  for (let i = 0; i < res.length; i++) {
    const tmp = res[i];
    if(
      tmp[0] + tmp[1] + tmp[2] + tmp[3] === tmp[4] + tmp[5] + tmp[6] + tmp[7] &&
      tmp[0] + tmp[2] + tmp[4] + tmp[6] === tmp[1] + tmp[3] + tmp[5] + tmp[7] &&
      tmp[0] + tmp[1] + tmp[4] + tmp[5] === tmp[2] + tmp[3] + tmp[6] + tmp[7]
    ) {
      result.push(tmp);
    }
  }
  return result;
}
function getGroup(arr) {
  const res = [];
  const first = [];
  for (let i = 0; i < arr.length; i++) {
    if(i === 0) {
      first.push(arr[i]);
      tmp = getGroup(arr.slice(1));
      for (let j = 0; j < tmp.length; j++) {
        tmp[j].unshift(arr[i]);
        res.push(tmp[j]);
      }
    } else {
      if(!first.includes(arr[i])) {
        first.push(arr[i]);
        tmp = arr.slice();
        tmp.splice(i, 1);
        tmpArr = getGroup(tmp);
        for (let j = 0; j < tmpArr.length; j++) {
          tmpArr[j].unshift(arr[i]);
          res.push(tmpArr[j]);
        }
      }
    }

  }
}
// 28.2 获取皇后排列
function getQueenOrder() {
  const arr = [0,1,2,3,4,5,6,7];
  const orderList = getGroup(arr);
  const res = [];
  for (let i = 0; i < orderList.length; i++) {
    let out = false;
    for(let j = 0; j < orderList[i].length; j++) {
      const start = orderList[i][j];
      for(let k = j + 1; k < orderList[i].length; k++) {
        const compare = orderList[i][k];
        if(compare - start !== k - j || compare - start !== j - k) {
          out = true;
          break;
        }
      }
      if(out) {
        break;
      }
    }
    !out && res.push(orderList[i]);
  }
  return res;
}

// 28.3 求出全部组合
function getCompo(str) {
  if (!str.length) {
    return [];
  }
  if(str.length === 1) return str;
  let res = [];
  const first = str[0];
  function getChar(str) {
    if(!str.length) return [];
    if(str.length === 1) return ['', str[0]];
    let res = [];
    const first = str[0];
    const tmp = getChar(str.slice(1));
    res = res.concat(tmp);
    for(let i = 0; i < tmp.length; i++) {
      res.push(tmp[i] + first);
    }
    return res;
  }
  // 不包含第一个字符
  const tmp = getChar(str.slice(1));
  res = res.concat(tmp.filter(it => it));
  // 包含第一个字符
  for (let i = 0; i < tmp.length; i++) {
    res.push(tmp[i] + first);
  }
  return res;
}

// 29 找出出现次数大于数组长度一半的数字
function findHalfNum(arr) {
  let num = arr[0];
  let time = 1;
  for (let i = 0; i < arr.length; i++) {
    if(time === 0) {
      num = arr[0];
      time = 1;
    }
    if(arr[i] === num) {
      time++;
    } else {
      time--;
    }
  }
  return num;
}

// 30 查找最小 K 个数
function getLeastK(nums, k) {
  if(nums.length < k) return false;
  function partition(nums, start, end) {
    const mi = Math.floor((end - start) / 2);
    const middle = nums[mi];
    while(start <= end) {
      if(nums[start] < middle && nums[end] > middle) {
        start++;
        end--;
      } else if(nums[start] >= middle && nums[end] > middle) {
        end--;
      } else if(nums[start] >= middle && nums[end] <= middle) {
        swap(nums, start, end);
        start++;
        end--;
      } else if(nums[start] < middle && nums[end] <= middle) {
        start++;
      }
    }
    return start;
  }
  function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  let start = 0;
  let end = nums.length - 1;
  let index = partition(nums, start, end);
  const res = [];
  while(index !== k) {
    if(index < k) {
      start = index;
      index = partition(nums, start, end);
    } else {
      end = index - 1;
      index = partition(nums, start, end);
    }
  }
  for(let i = 0; i < k; i++) {
    res.push(nums[i]);
  }
  return res;
}
// 30.1 用堆找出最小 K 个数
function getLeastN(nums, k) {
  if(nums.length < k) return false;
  function buildHeap(arr, size) {
    const start = Math.floor(size / 2) - 1;
    for(let i = start; i >= 0; i--) {
      heapify(arr, i, size - 1);
    }
  }
  function heapify(arr, i, last) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    const leftV = left <= last ? arr[left] : null;
    const rightV = right <= last ? arr[right] : null;
    const maxI = rightV >= leftV ? right : left;
    if(Math.max(leftV, rightV, arr[i]) !== arr[i]) {
      swap(arr, maxI, i);
      heapify(arr, maxI, last);
    }
  }
  buildHeap(nums, k);
  for(let i = k; i < nums.length; i++) {
    if(nums[i] < nums[0]) {
      swap(nums, i, 0);
      buildHeap(nums, k);
    }
  }
  function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return nums.slice(0, k);
}
