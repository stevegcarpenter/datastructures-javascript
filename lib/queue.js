'use strict';

const Node = require('./node');

module.exports = class {
  constructor(max=1024) {
    // BigO(1) to create a new Queue
    if (typeof max !== 'number' || !max || max < 0)
      throw new Error('Error: Max len must be a valid non-zero number');
    this.max = max;
    this.len = 0;
    this.front = this.back = null;
  }

  enqueue(value) {
    // BigO(1) to enqueue a value
    // Add it to the back of the queue unless the queue is empty
    if (!value && value !== 0)
      throw new Error('Error: Value must be valid');
    if (this.len === this.max)
      throw new Error('Error: Queue is at max len');
    let node = new Node(value);

    if (!this.len) {
      this.front = node;
    } else {
      this.back.next = node;
    }
    this.back = node;
    this.len++;
  }

  dequeue() {
    // BigO(1) to dequeue a value
    // Remove from the front of the queue unless the queue is empty
    // Consider the last item edge case
    if (!this.len)
      throw new Error('Error: Queue is empty');
    let node = this.front;
    if (this.len === 1) {
      this.back = null;
    }
    this.front = node.next;
    this.len--;
    node.next = null;
    return node.value;
  }
};
