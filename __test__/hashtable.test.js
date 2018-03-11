'use strict';

require('jest');
const HashTable = require('../lib/hashtable');
const SLL = require('../lib/sll');

describe('HashTable', () => {
  describe('#constructor', () => {
    describe('Valid', () => {
      it('should return back a valid HashTable object', () => {
        expect(new HashTable()).toBeInstanceOf(HashTable);
      });

      it('should have a default size of 1024 if no size was provided', () => {
        let ht = new HashTable();
        expect(ht.size).toEqual(1024);
      });

      it('should allocate "size" buckets to store data in', () => {
        let ht = new HashTable();
        expect(ht.bucket.length).toEqual(1024);
        expect(ht.bucket).toBeInstanceOf(Array);
      });
    });

    describe('Invalid', () => {
      it('should throw an Error if the requested size is < 0', () => {
        expect(() => new HashTable(-10)).toThrow('invalid size value -10');
      });

      it('should throw an Error if the size arg is a non-number', () => {
        expect(() => new HashTable({})).toThrow('invalid size [object Object]');
        expect(() => new HashTable('foo')).toThrow('invalid size foo');
      });
    });
  });

  describe('#_hash', () => {
    describe('Valid', () => {
      it('will return an index from 0 to the HashTable size', () => {
        let ht = new HashTable(10);
        let hash = ht._hash('test string');
        expect(hash).toBeGreaterThanOrEqual(0);
        expect(hash).toBeLessThan(10);
      });

      it('will return an integer value', () => {
        let ht = new HashTable(10);
        let hash = ht._hash('test string');
        expect(typeof hash === 'number').toBeTruthy();
      });

      it('should return the same hash value if called using the same key', () => {
        let ht = new HashTable(10);
        let hash = ht._hash('test string');
        let hash2 = ht._hash('test string');
        expect(hash).toEqual(hash2);
      });
    });

    describe('Invalid', () => {
      it('should throw an error if the key is not a string', () => {
        let ht = new HashTable();
        expect(() => ht._hash(1000)).toThrow('invalid key 1000');
      });

      it('should throw an error if the key is falsey', () => {
        let ht = new HashTable();
        expect(() => ht._hash('')).toThrow('invalid key');
      });
    });
  });

  describe('#get', () => {
    describe('Valid', () => {
      let ht = new HashTable(1);
      ht.set('name', 'Steve');

      it('should return the requested value when it is found', () => {
        expect(ht.get('name')).toEqual('Steve');
      });

      it('should still find items when there are several in a single bucket', () => {
        ht.set('age', 22);
        ht.set('hobby', 'mechanical keyboards');
        ht.set('alive', true);

        expect(ht.get('age')).toEqual(22);
      });

      it('should work when the items are spread through many buckets', () => {
        let ht2 = new HashTable();

        ht2.set('car', 'ferrari');
        ht2.set('year', 2018);
        ht2.set('model', '360 corsa');
        ht2.set('topspeed', 250);

        expect(ht2.get('car')).toEqual('ferrari');
        expect(ht2.get('year')).toEqual(2018);
        expect(ht2.get('model')).toEqual('360 corsa');
        expect(ht2.get('topspeed')).toEqual(250);
      });
    });

    describe('Invalid', () => {
      it('should return null when no item exists', () => {
        let ht = new HashTable();
        expect(ht.get('name')).toBeNull();
      });

      it('should throw an error if the key is a non-string', () => {
        let ht = new HashTable();
        expect(() => ht.get(0)).toThrow('invalid key 0');
      });

      it('should throw an error if the key is an empty string', () => {
        let ht = new HashTable();
        expect(() => ht.set('')).toThrow('invalid key');
      });
    });
  });

  describe('#set', () => {
    describe('Valid', () => {
      it('should properly add an item to the hashtable', () => {
        let ht = new HashTable(1);
        ht.set('name', 'Dave Thomas');
        expect(ht.bucket[0].head.value.key).toEqual('name');
        expect(ht.bucket[0].head.value.value).toEqual('Dave Thomas');
      });

      it('should properly allocate a new SLL inside an empty bucket', () => {
        let ht = new HashTable(1);
        ht.set('name', 'Dave Thomas');
        expect(ht.bucket[0]).toBeInstanceOf(SLL);
      });

      it('should continue adding to the SLL inside the bucket', () => {
        let ht = new HashTable(1);
        ht.set('name', 'Dave Thomas');
        ht.set('age', 69);
        ht.set('deceased', true);
        expect(ht.bucket[0].head.value.key).toEqual('deceased');
        expect(ht.bucket[0].head.value.value).toEqual(true);
        expect(ht.bucket[0].head.next.value.key).toEqual('age');
        expect(ht.bucket[0].head.next.value.value).toEqual(69);
        expect(ht.bucket[0].head.next.next.value.key).toEqual('name');
        expect(ht.bucket[0].head.next.next.value.value).toEqual('Dave Thomas');
      });

      it('should be able to update a value to avoid duplicates', () => {
        let ht = new HashTable(1);
        ht.set('name', 'Dave Thomas');
        expect(ht.bucket[0].head.value.key).toEqual('name');
        expect(ht.bucket[0].head.value.value).toEqual('Dave Thomas');
        ht.set('name', 'Steve');
        expect(ht.bucket[0].head.value.key).toEqual('name');
        expect(ht.bucket[0].head.value.value).toEqual('Steve');
      });
    });

    describe('Invalid', () => {
      it('should throw an error if the key is a non-string', () => {
        let ht = new HashTable(1);
        expect(() => ht.set(0, 'Jim')).toThrow('invalid key 0');
      });

      it('should throw an error if the key is an empty string', () => {
        let ht = new HashTable(1);
        expect(() => ht.set('', 'Jim')).toThrow('invalid key');
      });
    });
  });

  describe('#remove', () => {
    describe('Valid', () => {
      it('should properly remove the item from the hashtable', () => {
        let ht = new HashTable();
        ht.set('car', 'ferrari');
        ht.remove('car');
        expect(ht.get('car')).toBeNull();
      });
    });

    describe('Invalid', () => {
      it('should silently fail when attempting to remove a key that does not exist in an empty HT', () => {
        let ht = new HashTable();
        expect(() => ht.remove('foo')).not.toThrow();
      });

      it('should silently fail when attempting to remove a key that does not exist in a populated HT', () => {
        let ht = new HashTable();
        ht.set('foo', 'bar');
        ht.set('bash', 'baz');
        expect(() => ht.remove('xyz')).not.toThrow();
      });

      it('should throw an error if the key is a non-string', () => {
        let ht = new HashTable();
        expect(() => ht.remove(0)).toThrow('invalid key 0');
      });

      it('should throw an error if the key is an empty string', () => {
        let ht = new HashTable();
        expect(() => ht.remove('')).toThrow('invalid key');
      });
    });
  });
});
