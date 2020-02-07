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

// 16 反转链表
function reverseLink(head) {
  if(!head || !head.next) return head;
  let newHead = reverseLink(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
}

// 16.1 循环反转
function iterateReverseLink(head) {
  if(!head || !head.next) return head;
  let prev = null;
  let cur = head;
  let newHead = null;
  while(cur) {
    if(!cur.next) {
      newHead = cur;
    }
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return newHead;
}

// 17 合并有序链表
function mergeLinkList(head1, head2) {
  if(!head1 && !head2) return null;
  if(!head1 || !head2) return head1 || head2;
  const newHead = new LinkNode(-1);
  let cur = newHead;
  while(head1 && head2) {
    if(head1.val <= head2.val) {
      cur.next = head1;
      head1 = head1.next;
    } else {
      cur.next = head2;
      head2 = head2.next;
    }
    cur = cur.next;
  }
  cur.next = head1 || head2;
  return newHead.next;
}

// 18 二叉树是否为另一颗树字结构
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}
function isSubTree(parent, child) {
  if(!child) return true;
  if(!parent) return false;
  let isRootSub = false;
  function reallyHasChil(root1, root2) {
    if (!root2) {
      return true;
    }
    if(!root1) {
      return false;
    }
    if (root1.val !== root2.val) {
      return false;
    }
    return reallyHasChil(root1.left, root2.left) && reallyHasChil(root1.right, root2.right);
  }
  if (parent.val === child.val) {
    isRootSub = reallyHasChil(parent, child);
  }
  return isRootSub || isSubTree(parent.left, child) || isSubTree(parent.right, child);
}

// 19 二叉树镜像
function mirrorTree(root) {
  if(!root) return root;
  const tmp = root.left;
  root.left = mirrorTree(root.right);
  root.right = mirrorTree(tmp);
  return root;
}

// 19.1 二叉树镜像 遍历
function mirrorIterate(root) {
  if(!root) return root;
  const queue = [root];
  while(queue.length) {
    const node = queue.shift();
    const tmp = node.left;
    node.left = node.right;
    node.right = tmp;
    if(node.left) queue.push(node.left);
    if(node.right) queue.push(node.right);
  }
  return root;
}

// 20 顺时针打印矩阵
function printMatrix(matrix) {
  const rows = matrix.length;
  const columns = matrix[0].length;
  let start = 0;
  while(start * 2 < rows && start * 2 < columns) {
    // 打印上面的行
    for(let i = start; i < columns - start; i++) {
      console.log(matrix[start][i]);
    }
    // 打印右侧的列
    if (rows - start - 1) {
      for(let i = start + 1; i < rows - start; i++) {
        console.log(matrix[i][columns - 1 - start]);
      }
    }
    // 打印下面的行
    if (rows - start - 1 && start < columns - start - 1) {
      for(let i = columns - start - 2; i >= start; i--) {
        console.log(matrix[rows - 1 - start][i]);
      }
    }
    // 打印左边的列
    if (rows - start > 2 && columns - start - 1 > start) {
      for(let i = rows - start - 2; i >= start + 1; i--) {
        console.log(matrix[i][start]);
      }
    }
    start++;
  }
}
