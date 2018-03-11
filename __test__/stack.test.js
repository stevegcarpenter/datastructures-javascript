'use strict';

const Stack = require('../lib/stack');

describe('Stack Module', () => {
  describe('#constructor', () => {
    it('should return back an instance of a Stack', () => {
      expect(new Stack(100)).toBeInstanceOf(Stack);
    });

    it('should return back a valid Stack object with appropriate values set', () => {
      expect(new Stack(10)).toEqual({max: 10, size: 0, top: null});
    });

    it('should throw an error if an invalid max size was given', () => {
      expect(() => new Stack(0)).toThrow('Error: Max size must be a valid non-zero number');
      expect(() => new Stack({})).toThrow('Error: Max size must be a valid non-zero number');
      expect(() => new Stack(-10)).toThrow('Error: Max size must be a valid non-zero number');
      expect(() => new Stack(null)).toThrow('Error: Max size must be a valid non-zero number');
    });

    it('should set the default max size of 1024 if none was provided', () => {
      expect((new Stack()).max).toBe(1024);
      expect((new Stack(undefined)).max).toBe(1024);
    });
  });

  describe('#push', () => {
    beforeEach(() => this.stack = new Stack());

    it('should have a size of 20', () => {
      [...Array(20)].map((e, i) => this.stack.push(~~(Math.random() * i)));
      expect(this.stack.size).toEqual(20);
    });

    it('should add a new node with the value of 1 to the top of the stack', () => {
      this.stack.push(1);
      expect(this.stack.top.value).toEqual(1);
    });

    it('throw an error when max size is met', () => {
      expect(() => {
        [...Array(1025)].map((e, i) => this.stack.push(~~(Math.random() * i)));
      }).toThrow('Error: Stack is at max size');
    });

    it('should throw an Error when a falsey non-zero number is pushed', () => {
      expect(() => this.stack.push(null)).toThrow('Error: Value must be valid');
      expect(() => this.stack.push(undefined)).toThrow('Error: Value must be valid');
    });
  });

  describe('#pop', () => {
    beforeEach(() => this.stack = new Stack());

    it('should be equal an empty stack if all items are removed from the stack', () => {
      [1, 2, 3, 4, 5].map(e => this.stack.push(e));
      [...Array(5)].map(() => this.stack.pop());
      expect(this.stack).toEqual(new Stack());
    });

    it('should throw an Error if an attempt is made to remove an item from an empty stack', () => {
      expect(() => this.stack.pop()).toThrow('Error: Stack is empty');
    });

    it('should return back the correct popped value', () => {
      [1, 2, 3].map((e) => this.stack.push(e));
      console.log(JSON.stringify(this.stack));
      expect(this.stack.pop()).toBe(3);
    });
  });

  describe('#peek', () => {
    beforeEach(() => this.stack = new Stack());

    it('should throw an Error if the stack is empty', () => {
      expect(() => this.stack.peek()).toThrow('Error: Stack is empty');
    });

    it('should return back the correct value', () => {
      [1, 2, 3].map(e => this.stack.push(e));
      expect(this.stack.peek()).toBe(3);
    });

    it('should not remove the item when peeking', () => {
      [10, 25, 39, 41].map(e => this.stack.push(e));
      this.stack.peek();
      expect(this.stack.size).toBe(4);
      expect(this.stack.top.value).toBe(41);
    });
  });
});
