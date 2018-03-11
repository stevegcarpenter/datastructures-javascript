'use strict';

const SLL = require('./sll');

class HashNode {
  constructor(key, value) {
    if (!key || typeof key !== 'string') throw new Error(`invalid key ${key}`);

    this.key = key;
    this.value = value;
  }
}

// Hash table implementation
module.exports = class {
  // BigO(1) to create a new HashTable
  constructor(size = 1024) {
    if (typeof size !== 'number') throw new Error(`invalid size ${size}`);
    if (size <= 0) throw new Error(`invalid size value ${size}`);

    // Allocate storage
    this.bucket = Array(size).fill(null);
    this.size = size;
  }

  // BigO(n) of the length of the key string to create a hash
  _hash(key) {
    if (typeof key !== 'string' || !key) throw new Error(`invalid key ${key}`);

    let hash = key.split('').reduce((acc, cur) => acc + cur.charCodeAt(0), 0);

    // return a bucket index
    return hash % this.size;
  }

  // BigO(1) to get an item
  get(key) {
    let hash = this._hash(key);

    // The bucket doesn't even exist
    if (!this.bucket[hash]) return null;

    // A bucket exists, see if the HashNode can be found
    let node = this.bucket[hash].find(item => item.key === key);

    return node ? node.value : null;
  }

  // BigO(1) to set an item
  set(key, value) {
    let hash = this._hash(key);

    // conditionally create a new sll
    if (!this.bucket[hash]) this.bucket[hash] = new SLL();

    // If the item is already in the hashtable, update its value (NO DUPES)
    let node = null;
    if (this.bucket[hash].length) {
      node = this.bucket[hash].find(item => item.key === key);
    }

    // Either update the existing node or add a new one
    if (node) node.value = value;
    else this.bucket[hash].insert(new HashNode(key, value));
  }


  // BigO(1) to remove an item
  remove(key) {
    let hash = this._hash(key);

    // Nothing to do
    if (!this.bucket[hash]) return;

    // See if a matching key can be removed from the SLL bucket
    this.bucket[hash].remove(item => item.key === key);
  }
};
