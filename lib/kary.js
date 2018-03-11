'use strict';

const Queue = require('./queue');

const TreeNode = class {
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.children = [];
  }
};

// K-ary tree
module.exports = class {
  constructor() {
    this.root = null;
  }

  breadthFirst(callback) {
    // BigO(n) - Visit every node once
    if (!callback) throw new Error('Error: callback not defined');
    if (typeof callback !== 'function')
      throw new Error('Error: callback is not a function');
    if (!this.root) return;

    let q = new Queue();
    q.enqueue(this.root);

    while (q.len) {
      let ele = q.dequeue();
      callback(ele);
      ele.children.map(child => q.enqueue(child));
    }
  }

  insert(value, parentVal) {
    // BigO(n) - Traverse at most n nodes to find where to insert the new node
    if (!value && value !== 0)
      throw new Error('Error: value is falsey and non-zero');

    let tn = new TreeNode(value);

    if (!this.root) {
      this.root = tn;
      return tn;
    }

    if (!parentVal && parentVal !== 0)
      throw new Error('Error: parentVal is falsey and non-zero');

    // push it or do a no-op
    this.breadthFirst(node => {
      if (node.value === parentVal) {
        tn.parent = node;
        node.children.push(tn);
      }
    });

    return tn;
  }

  removeByVal(value) {
    // BigO(n) - Traverse entire tree visiting all nodes to remove value
    if (!value && value !== 0) throw new Error('Error: value is falsey and non-zero');
    if (!this.root) return null;

    if (this.root.value === value) {
      console.log('Snipping root');
      this.root.value = null;
      return this;
    }

    // This is a snip - any children are effectively removed along with the node in question
    this.breadthFirst(node => node.children = node.children.filter(n => n.value !== value));

    return this;
  }
};
