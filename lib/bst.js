'use strict';

const bst = module.exports = {};

bst.TreeNode = class {
  constructor(value) {
    if (typeof value !== 'number')
      throw new TypeError('TreeNode value must be a number');

    this.value = value;
    this.right = this.left = null;
  }
};

bst.BinarySearchTree = class {
  constructor(root=null) {
    if (root && !(root instanceof bst.TreeNode))
      throw new TypeError('root must be a TreeNode');
    if (root && typeof root.value !== 'number')
      throw new TypeError('value on root must be a number');

    this.root = root;
  }

  insert(node) {
    if (!(node instanceof bst.TreeNode))
      throw new TypeError('node must be a TreeNode');
    if (typeof node.value !== 'number')
      throw new TypeError('node.value must be a number');
    // special case of empty bst
    if (this.root === null)
      this.root = node;
    else
      this._insert(this.root,node);
  }

  // insert helper
  _insert(root, node){
    if (node.value < root.value) {
      // go left when value < root.value
      if (!root.left)
        root.left = node;
      else
        this._insert(root.left, node);
    } else {
      // go right when value > root.value
      if (!root.right)
        root.right = node;
      else
        this._insert(root.right, node);
    }
  }

  find(value) {
    if (typeof value !== 'number')
      throw new TypeError('value to find must be a number');

    return this._find(this.root, value);
  }

  // find helper
  _find(root, value){
    if (!root)
      return null;
    else if (root.value === value)
      return root;
    else if (root.value < value)
      return this._find(root.right, value);
    else
      return this._find(root.left, value);
  }

  remove(value) {
    if (typeof value !== 'number')
      throw new TypeError('value must be a number');
    // nothing to remove if the tree is empty
    if (!this.root)
      return false;

    // edge case: value to remove is the root
    // use the dummy root approach
    if (value === this.root.value) {
      let dummy = new bst.TreeNode(0);
      // set dummy node as parent of actual root
      dummy.left = this.root;
      let retVal = this._remove(this.root, value, dummy);
      // set new root to the left child of dummy
      this.root = dummy.left;
      return retVal;
    }

    // common case: value to be removed is somewhere in the BST
    return this._remove(this.root, value);
  }

  // remove helper function
  // node: the current node
  // value: the value to remove
  // parent: the parent node to the current node
  _remove(node, value, parent) {
    // assume success, set false when not possible
    let retVal = true;

    // first, step is to find the node needing removal
    switch (true) {
    case value < node.value:
      retVal = node.left ? this._remove(node.left, value, node) : false;
      break;
    case value > node.value:
      retVal =node.right ? this._remove(node.right, value, node): false;
      break;
    // value === this.value
    default:
      // this is the node to remove
      // Handle the three cases here
      if (node.left && node.right) {
        // 1) Node to remove has two children
        //    a) Find the minimum value in the right subtree
        //    b) Replace the current nodes value with it (the value to remove)
        //    c) Remove the minimum from the right subtree
        node.value = this._findMinimum(node.right);
        // recurse the right subtree to remove the duplicated value
        this._remove(node.right, node.value, node);
      } else if (parent.left === node) {
        // 2) Node to remove is the left child of parent
        parent.left = node.left ? node.left : node.right;
      } else if (parent.right === node) {
        // 3) Node to remove is the right child of parent
        parent.right = node.left ? node.left : node.right;
      }
      break;
    }

    return retVal;
  }

  _findMinimum(node) {
    if (!node || !(node instanceof bst.TreeNode))
      throw new TypeError('must have a valid node of type TreeNode');

    // recurse or return the minimum value
    return node.left
      ? this._findMinimum(node.left)
      : node.value;
  }

  inOrderTraversal(cb) {
    if (!this.root) return null;
    if (typeof cb !== 'function')
      throw new TypeError('cb must be a function');

    this._inOrderTraversal(this.root, cb);
  }

  // inOrderTraversal helper
  _inOrderTraversal(root, cb) {
    if (!root) return null;

    // visit left
    this._inOrderTraversal(root.left, cb);
    // visit root
    cb(root.value);
    // visit right
    this._inOrderTraversal(root.right, cb);
  }

  preOrderTraversal(cb) {
    if (!this.root) return null;
    if (typeof cb !== 'function')
      throw new TypeError('cb must be a function');

    this._preOrderTraversal(this.root, cb);
  }

  // preOrderTraversal helper
  _preOrderTraversal(root, cb) {
    if (!root) return null;

    // visit root
    cb(root.value);
    // visit left
    this._preOrderTraversal(root.left, cb);
    // visit right
    this._preOrderTraversal(root.right, cb);
  }

  postOrderTraversal(cb) {
    if (!this.root) return null;
    if (typeof cb !== 'function')
      throw new TypeError('cb must be a function');

    this._postOrderTraversal(this.root, cb);
  }

  // postOrderTraversal helper
  _postOrderTraversal(root, cb) {
    if (!root) return null;

    // visit left
    this._postOrderTraversal(root.left, cb);
    // visit right
    this._postOrderTraversal(root.right, cb);
    // visit root
    cb(root.value);
  }

  printTree() {
    if (!this.root)
      return;

    this._printTree(this.root, '');
  }

  // print tree helper function
  _printTree(root, space) {
    if (!root) return;

    // Increase distance between levels
    space += '          ';

    // Process right child first
    this._printTree(root.right, space);

    // Print current node after space count
    console.log(`\n${space}${root.value}`);

    // Process left child
    this._printTree(root.left, space);
  }

  isBalanced() {
    // an empty tree is balanced
    if (!this.root)
      return true;
    let info = {
      shallow: Infinity,
      deep: 1
    };

    this._isBalanced(this.root, 1, info);
    return (info.deep - info.shallow) <= 1;
  }

  // isBalanced helper function
  _isBalanced(node, level, info) {
    if (!info || typeof info !== 'object')
      throw new Error('info must be a valid object');
    if (typeof level !== 'number')
      throw new TypeError('level must be a number');
    if (level <= 0)
      throw new Error('level must be a value > 1');

    if (!node) {
      if (info.deep < (level - 1))
        info.deep = level - 1;
      if ((level - 1) < info.shallow)
        info.shallow = level - 1;

      return;
    }

    this._isBalanced(node.left, level + 1, info);
    this._isBalanced(node.right, level + 1, info);
  }
};
