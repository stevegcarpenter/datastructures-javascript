'use strict';

const Node = require('./node');

class SLL {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // BigO(1) to insert
  // Always inserts at the head
  insert(value) {
    if (!value && value !== 0) return this;

    let node = new Node(value);
    node.next = this.head;
    this.head = node;
    this.length++;
    return this;
  }

  // BigO(n) to find a node
  // Search all nodes applying the callback check and return the value if found
  // otherwise, return null
  find(checkCallback) {
    if (!this.length) return null;
    if (!checkCallback || typeof checkCallback !== 'function')
      throw new TypeError(`${checkCallback} is not a function`);

    for (let itr = this.head; itr; itr = itr.next) {
      if (checkCallback(itr.value)) {
        return itr.value;
      }
    }

    return null;
  }

  // BigO(n) to find and remove the node
  // checkCallback returns true if the node matches what should be removed
  remove(checkCallback) {
    let node;
    // Nothing to remove
    if (!this.length) return null;
    if (!checkCallback || typeof checkCallback !== 'function')
      throw new TypeError(`${checkCallback} is not a function`);

    // When the node to remove is the head
    if (checkCallback(this.head.value)) {
      node = this.head;
      this.head = this.head.next;
      this.length--;
      node.next = null;
      return node;
    }

    // Find the node before the one to remove
    let prev = this.head;
    let cur = prev.next;
    while (cur && !checkCallback(cur.value)) {
      prev = cur;
      cur = cur.next;
    }

    // Remove it - if cur is null nothing was found
    //
    //   prev -\    cur-----\
    //         |            |
    //   --------    ----------------
    //  |        |->| node to remove |->...
    //   --------    ----------------
    //
    if (cur) {
      // Save the node
      node = cur;
      // Point around it
      prev.next = prev.next.next;
      // Decrement list length
      this.length--;
      // Remove the reference
      node.next = null;

      // return the node that was removed
      return node;
    }

    return null;
  }
}

module.exports = SLL;
