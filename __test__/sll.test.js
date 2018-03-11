'use strict';

const SLL = require('../lib/sll');

describe('SLL Module', () => {
  describe('#constructor', () => {
    it('should return back a singly linked list object when the constructor is called', () => {
      let list = new SLL();
      expect(list).toBeInstanceOf(SLL);
      expect(list.head).toBe(null);
      expect(list.length).toBe(0);
    });

    it('should return a SLL object that is also an object', () => {
      let list = new SLL();
      expect(typeof list).toBe('object');
    });

    it('should initially set head to null and length to 0', () => {
      let list = new SLL();
      expect(list.head).toBe(null);
      expect(list.length).toBe(0);
    });
  });

  describe('#insert', () => {
    describe('Valid', () => {
      it('should have value 1 in the first node, 2 in the second node, and 3 in the third node', () => {
        let list = new SLL();
        list.insert(3);
        list.insert(2);
        list.insert(1);

        expect(list.head.value).toEqual(1);
        expect(list.head.next.value).toEqual(2);
        expect(list.head.next.next.value).toEqual(3);
      });

      it('should increment the length of the list when a node is inserted', () => {
        let list = new SLL();
        [...Array(100).fill(0)].map(val => list.insert(val));

        expect(list.length).toBe(100);
        list.insert(10);
        expect(list.length).toBe(101);
      });

      it('should accept any data type as a value', () => {
        let list = new SLL();

        list.insert('a string');
        list.insert(100);
        list.insert({ key: 'myobject' });
        list.insert(['one', 'two', 'three']);

        expect(list.length).toEqual(4);
        expect(list.head.value[0]).toEqual('one');
        expect(list.head.next.value.key).toEqual('myobject');
        expect(list.head.next.next.value).toEqual(100);
        expect(list.head.next.next.next.value).toEqual('a string');
      });
    });

    describe('Invalid', () => {
      it('should refuse to add null, undefined, or NaN to the list', () => {
        let list = new SLL();
        expect(list.insert(null).length).toBe(0);
        expect(list.insert(undefined).length).toBe(0);
        expect(list.insert(NaN).length).toBe(0);
      });
    });
  });

  describe('#find', () => {
    describe('Valid', () => {
      let list = new SLL();
      list.insert({ key: 5, value: 'five' });
      list.insert({ key: 4, value: 'four' });
      list.insert({ key: 3, value: 'three' });
      list.insert({ key: 2, value: 'two' });
      list.insert({ key: 1, value: 'one' });

      it('should properly return back the last item in the list', () => {
        let result = list.find(value => value.key === 5);
        expect(result.value).toEqual('five');
      });

      it('should properly return back the first item in the list', () => {
        let result = list.find(value => value.key === 1);
        expect(result.value).toEqual('one');
      });

      it('should properly return back an item in the middle of the list', () => {
        let result = list.find(value => value.key === 3);
        expect(result.value).toEqual('three');
      });
    });

    describe('Invalid', () => {
      it('should return null if find is called on an empty list', () => {
        let list = new SLL();
        expect(list.find(item => item === 0)).toBe(null);
      });

      it('should return null if the item to be found does not exist', () => {
        let list = new SLL();
        list.insert(10);
        list.insert(20);
        list.insert(30);

        expect(list.find(item => item === 100)).toEqual(null);
      });

      it('should throw a TypeError if a callback was not provided', () => {
        let list = new SLL();
        list.insert({ key: 'yay', value: 'oooo' });
        expect(() => list.find()).toThrow('undefined is not a function');
      });

      it('should throw a TypeError if the callback is not a function', () => {
        let list = new SLL();
        list.insert({ key: 'yay', value: 'oooo' });
        expect(() => list.find('fakecallback')).toThrow(
          'fakecallback is not a function'
        );
      });
    });
  });

  describe('#remove', () => {
    describe('Valid', () => {
      it('should work with more complex data then simply numbers/strings', () => {
        let list = new SLL();
        list.insert({ key: 1, data: 'one' });
        list.insert({ key: 2, data: 'two' });
        list.insert({ key: 3, data: 'three' });

        let node = list.remove(item => item.key === 2);
        expect(node.value.data).toBe('two');
        expect(list.length).toBe(2);
        expect(list.head.value.data).toBe('three');
        expect(list.head.next.value.data).toBe('one');
      });

      it('should properly remove the head when requested', () => {
        let list = new SLL();
        list.insert({ key: 1, data: 'one' });
        list.insert({ key: 2, data: 'two' });
        list.insert({ key: 3, data: 'three' });

        let node = list.remove(item => item.key === 3);
        expect(list.length).toBe(2);
        expect(node.value.key).toBe(3);
        expect(list.head.value.key).toBe(2);
      });

      it('should decrement the length of the list', () => {
        let list = new SLL();
        list.insert(1);
        list.insert(2);
        list.insert(3);
        list.remove(item => item === 1);

        expect(list.length).toEqual(2);
      });

      it('should remove the node so it no longer exists in the list', () => {
        let list = new SLL();
        list.insert(1);
        list.insert(2);
        list.insert(3);
        list.remove(item => item === 2);

        expect(list.head.next.value).not.toBe(2);
      });
    });

    describe('Invalid', () => {
      it('should return null if remove is called on an empty list', () => {
        let list = new SLL();
        expect(list.remove(item => item === 0)).toBe(null);
      });

      it('should return null if the item to be removed does not exist', () => {
        let list = new SLL();
        list.insert(10);
        list.insert(20);
        list.insert(30);

        expect(list.remove(item => item === 100)).toEqual(null);
      });

      it('should throw a TypeError if a callback was not provided', () => {
        let list = new SLL();
        list.insert({ key: 'yay', value: 'oooo' });
        expect(() => list.remove()).toThrow('undefined is not a function');
      });

      it('should throw a TypeError if the callback is not a function', () => {
        let list = new SLL();
        list.insert({ key: 'yay', value: 'oooo' });
        expect(() => list.remove('fakecallback')).toThrow(
          'fakecallback is not a function'
        );
      });
    });
  });
});
