'use strict';

const KTree = require('../lib/kary');

describe('K-Ary Tree Module', () => {
  describe('#insert', () => {
    it('should throw an error if value is falsey', () => {
      let t = new KTree();
      expect(() => t.insert(null)).toThrow('Error: value is falsey and non-zero');
    });

    it('should only allow one arg on the first call to insert', () => {
      let t = new KTree();
      t.insert(1);
      expect(() => t.insert(2)).toThrow('Error: parentVal is falsey and non-zero');
    });

    it('should insert values properly', () => {
      let t = new KTree();
      t.insert(1);
      t.insert(2, 1);
      t.insert(3, 2);
      t.insert(4, 2);
      t.insert(5, 2);

      expect(t.root.value).toBe(1);
      expect(t.root.children.length).toBe(1);
      expect(t.root.children[0].value).toBe(2);
      expect(t.root.children[0].children.length).toBe(3);
      expect(t.root.children[0].children[0].value).toBe(3);
      expect(t.root.children[0].children[1].value).toBe(4);
      expect(t.root.children[0].children[2].value).toBe(5);
    });
  });

  describe('#removeByVal', () => {
    it('should throw an error if the value is falsey', () => {
      let t = new KTree();
      t.insert(1);
      t.insert(2, 1);

      expect(() => t.removeByVal(null)).toThrow('Error: value is falsey and non-zero');
    });

    it('should return null if the root of the tree is null', () => {
      let t = new KTree();

      expect(t.removeByVal(1)).toBe(null);
    });

    it('should correctly remove all instances of the value', () => {
      let t = new KTree();
      t.insert(1);
      t.insert(2, 1);
      t.insert(3, 1);
      t.insert(4, 1);
      t.insert(5, 2);
      t.insert(5, 3);
      t.insert(5, 4);
      t.removeByVal(5);

      for (let i = 0; i < 3; i++) {
        expect(t.root.children[i].children.length).toBe(0);
      }
    });
  });

  describe('#breadthFirst', () => {
    it('should push all items in correct order to an array', () => {
      let t = new KTree();
      t.insert(1);
      t.insert(2, 1);
      t.insert(3, 1);
      t.insert(4, 1);
      t.insert(5, 2);
      t.insert(5, 3);
      t.insert(5, 4);

      let arr = [];
      t.breadthFirst(e => arr.push(e.value));

      expect(arr.pop()).toBe(5);
      expect(arr.pop()).toBe(5);
      expect(arr.pop()).toBe(5);
      expect(arr.pop()).toBe(4);
      expect(arr.pop()).toBe(3);
      expect(arr.pop()).toBe(2);
      expect(arr.pop()).toBe(1);
    });

    it('should throw an error if the callback is falsey', () => {
      let t = new KTree();
      t.insert(1);
      expect(() => t.breadthFirst(null)).toThrow('Error: callback not defined');
    });

    it('should throw an error if the callback is not a function', () => {
      let t = new KTree();
      t.insert(1);
      expect(() => t.breadthFirst({})).toThrow('Error: callback is not a function');
    });
  });
});
