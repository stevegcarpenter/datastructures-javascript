'use strict';

const Node = require('../lib/node');

describe('Node Module', () => {
  describe('#constructor', () => {
    it('should create a new instance of a Node', () => {
      let node = new Node(1);
      expect(node).toBeInstanceOf(Node);
    });

    it('should throw an Error if no value was given or the value is falsey and non-zero', () => {
      expect(() => new Node()).toThrow('Error: Val must be a valid piece of data');
      expect(() => new Node(undefined)).toThrow('Error: Val must be a valid piece of data');
      expect(() => new Node(null)).toThrow('Error: Val must be a valid piece of data');
      expect(() => new Node(NaN)).toThrow('Error: Val must be a valid piece of data');
      expect(new Node(0)).toBeInstanceOf(Node);
    });

    it('should set the next property to null', () => {
      let node = new Node(10);
      expect(node.next).toEqual(null);
    });
  });
});
