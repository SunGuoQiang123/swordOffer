// one pass

// 2 singleton
const LoginModal = (function() {
  let instance = null;
  function LoginModal () {
    if(!(this instanceof LoginModal)) {
      return new LoginModal();
    }
    if (!instance) {
      instance = this;
    }
    return instance;
  };
  return LoginModal;
})();

// 3 二维数组查找指定数字
function findNum(arr, num) {
  let i = 0;
  let j = arr[0].length - 1;
  while(arr[i][j]) {
    if (arr[i][j] === num) {
      return true;
    } else if(arr[i][j] > num) {
      j--;
    } else {
      i++;
      if (arr[i]) {
        j = arr[i].length - 1;
      } else {
        return false;
      }
    }
  }
  return false;
}

// 4 将字符串中空格 替换为 %20
function replaceBlank(str) {
  if (!str) {
    return '';
  }
  let res = '';
  for(let i = 0; i < str.length; i++) {
    if (str[i] === '') {
      res += '%20';
    } else {
      res += str[i];
    }
  }
  return res;
}

function LinkNode(val) {
  this.val = val;
  this.next = null;
}
// 5 遍历链表从尾到头输出
function reverseLogLinkList(node) {
  if(!node) return;
  reverseLogLinkList(node.next);
  console.log(node.val);
}

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}
// 6 重建二叉树
function refactorTee(preorder, inorder) {
  if(preorder.length === 0) return null;
  const rootVal = preorder[0];
  const root = new TreeNode(rootVal);
  // 根节点在中序遍历中的索引
  const index = inorder.indexOf(rootVal);
  // left inorder and preorder
  const leftinorder = inorder.slice(0, index);
  const leftpreorder = preorder.slice(1, index + 1);
  // right inorder and preorder
  const rightinorder = inorder.slice(index + 1);
  const rightpreorder = preorder.slice(index + 2);
  root.left = refactorTee(leftpreorder, leftinorder);
  root.right = refactorTee(rightpreorder, rightinorder);
  return root;
}

// 7 2个栈实现队列
function Queue() {
  this.stack1 = [];
  this.stack2 = [];
}

Queue.prototype.pushTail = function(val) {
  this.stack1.push(val);
};
Queue.prototype.deleteHead = function() {
  if (!this.stack2.length) {
    let i = this.stack1.length - 1;
    while(i >= 0) {
      this.stack2.push(this.stack1.pop());
      i--;
    }
  }
  this.stack2.pop();
};

// 7 2个队列实现栈
function Stack() {
  this.queue1 = [];
  this.queue2 = [];
}
Stack.prototype.pop = function() {
  const arr = this.queue1.length ? this.queue1 : this.queue2;
  const other = this.queue1.length ? this.queue2 : this.queue1;
  let i = 0;
  while(i < arr.length - 1) {
    other.push(arr.shift());
  }
  arr.shift();
};
Stack.prototype.push = function(val) {
  if (this.queue1.length !== 0) {
    this.queue1.push(val);
  } else {
    this.queue2.push(val);
  }
};

// 8 旋转数组最小数字
function findMinNum(arr) {
  if(arr.length === 1) return arr[0];
  let first = arr[0];
  let last = arr[arr.length - 1];
  let tmp = arr;
  while(tmp.length) {
    const i = Math.floor(tmp.length / 2);
    if(first < tmp[i]) {
      tmp = tmp.slice(i + 1);
    } else if(first > tmp[i]) {
      last = tmp[i];
      tmp = tmp.slice(0, i);
    } else {
      if(first > last) {
        tmp = tmp.slice(i + 1);
      } else {
        let j = 1;
        let k = tmp.length - 1;
        while(tmp[j] === tmp[k] && j < k) {
          j++;
          k--;
        }
        if(j >= k && tmp[j] === tmp[k]) return tmp[j];
        if(tmp[j] > tmp[k]) {
          tmp = tmp.slice(i + 1, k);
          last = tmp[k];
        } else {
          return tmp[k - 1];
        }
      }
    }
  }
  return last;
}

// 9 斐波那契数列
function fibonaqi(n) {
  if(n === 0) return 0;
  if (n === 1) return 1;
  let n1 = 0;
  let n2 = 1;
  let n3;
  for(let i = 2; i <= n; i++) {
    n3 = n1 + n2;
    n1 = n2;
    n2 = n3;
  }
  return n3;
}
// 9.1 跳台阶，一次可以跳1，2，... n
function jumpStair(n) {
  const map = {
    0: 1,
    1: 1,
    2: 2
  };
  function jump(n) {
    if(!map[n]) {
      let res = 0;
      for(let i = 0; i < n; i++) {
        res += jump(i);
      }
      map[n] = res;
    }
    return map[n];
  }
  return jump(n);
}

// 10 获取数字转位2进制后 1的个数
function binaryOneNum(n) {
  let count = 0;
  while(n) {
    count++;
    n = n & (n - 1);
  }
  return count;
}
// 10. 1 判断数字是否为 2的整次方
function isTwoFang(n) {
  if(n === 0) return false;
  return n & (n - 1) === 0;
}
// 10.2 m 到 n 转变需要多少步
function getStepsMn(m, n) {
  let count = 0;
  // m 和 n 取异或 结果包含多少个1 代表需要进行多少次转变
  let tmp = m ^ n;
  while(tmp) {
    count++;
    tmp = tmp & (tmp - 1);
  }
  return count;
}
