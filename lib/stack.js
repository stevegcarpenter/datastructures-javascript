'use strict';

const Node = require('./node');

// Stack implementation - LIFO
module.exports = class {
  constructor(max=1024) {
    // BigO(1) to create a new Stack
    if (typeof max !== 'number' || !max || max < 0)
      throw new Error('Error: Max size must be a valid non-zero number');
    this.max = max;
    this.size = 0;
    this.top = null;
  }

  push(value) {
    // BigO(1) to insert an item
    if (!value && value !== 0)
      throw new Error('Error: Value must be valid');
    if (this.size === this.max)
      throw new Error('Error: Stack is at max size');

    let node = new Node(value);
    node.next = this.top;
    this.top = node;
    this.size++;
  }

  pop() {
    // BigO(1) to pop an item from the stack
    if (!this.size)
      throw new Error('Error: Stack is empty');
    let node = this.top;
    this.top = node.next;
    node.next = null;
    this.size--;
    return node.value;
  }

  peek() {
    // BigO(1) to peek at the top of the stack
    if (!this.size)
      throw new Error('Error: Stack is empty');
    return this.top.value;
  }
};
