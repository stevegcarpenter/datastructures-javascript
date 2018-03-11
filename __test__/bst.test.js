const TreeNode = require('../lib/bst').TreeNode;
const BinarySearchTree = require('../lib/bst').BinarySearchTree;
require('jest');

describe('TreeNode', function() {
  describe('#constructor', () => {
    describe('Valid', () => {
      it('should create a new TreeNode and set the value 10 on the value property', () => {
        const node = new TreeNode(10);
        expect(node.value).toEqual(10);
      });

      it('should set the left child property to null', () => {
        const node = new TreeNode(10);
        expect(node.left).toBeNull();
      });

      it('should set the right child property to null', () => {
        const node = new TreeNode(10);
        expect(node.right).toBeNull();
      });
    });

    describe('Invalid', () => {
      it('should throw a TypeError if the value is not a number', () => {
        expect(() => new TreeNode('not a number')).toThrow('TreeNode value must be a number');
      });
    });
  });
});

describe('BinarySearchTree', function () {
  describe('#constructor', () => {
    describe('Valid', () => {
      it('should create a Binary Search Tree and set the root to null when no root was provided', () => {
        let bst = new BinarySearchTree();
        expect(bst.root).toBeNull();
      });

      it('should create a new BinarySearchTree and return it back', () => {
        let bst = new BinarySearchTree();
        expect(bst).toBeInstanceOf(BinarySearchTree);
      });

      it('should optionally set a root node passed in at creation time', () => {
        const node = new TreeNode(100);
        const bst = new BinarySearchTree(node);
        expect(bst.root).toEqual(node);
      });
    });

    describe('Invalid', () => {
      it('should detect a non TreeNode root provided and throw a TypeError', () => {
        expect(() => new BinarySearchTree('not a TreeNode')).toThrow('root must be a TreeNode');
      });

      it('should detect a root with a non integer value and throw a TypeError', () => {
        let node = new TreeNode(0);
        node.value = 'not a number';
        expect(() => new BinarySearchTree(node)).toThrow('value on root must be a number');
      });
    });
  });

  describe('#insert', () => {
    describe('Valid', () => {

      // Build the following tree
      //                       7
      //
      //               6
      //
      //                       5
      //
      //         4
      //
      //                       3
      //
      //               2
      //
      //                       1
      //
      let nodes = [
        new TreeNode(4),
        new TreeNode(2),
        new TreeNode(1),
        new TreeNode(3),
        new TreeNode(6),
        new TreeNode(5),
        new TreeNode(7),
      ];
      let bst = new BinarySearchTree();
      for (let node of nodes) {
        bst.insert(node);
      }
      it('should have set the root value to be 4', () => {
        expect(bst.root.value).toEqual(4);
      });

      it('should have properly built the left subtree', () => {
        // left subtree
        expect(bst.root.left.value).toEqual(2);
        expect(bst.root.left.right.value).toEqual(3);
        expect(bst.root.left.left.value).toEqual(1);
      });

      it('should have propertly built the right subtree', () => {
        // right subtree
        expect(bst.root.right.value).toEqual(6);
        expect(bst.root.right.left.value).toEqual(5);
        expect(bst.root.right.right.value).toEqual(7);
      });
    });

    describe('Invalid', () => {
      it('should detect a non-TreeNode value being inserted and throw a TypeError', () => {
        let bst = new BinarySearchTree();
        expect(() => bst.insert('not a TreeNode')).toThrow('node must be a TreeNode');
      });

      it('should throw a TypeError if the nodes value being inserted is not a number', () => {
        let bst = new BinarySearchTree();
        let node = new TreeNode(10);
        // re-assign the value
        node.value = 'not a number';
        expect(() => bst.insert(node)).toThrow('node.value must be a number');
      });
    });
  });

  describe('#find', () => {
    describe('Valid', () => {
      // Build the following tree
      //                       7
      //
      //               6
      //
      //                       5
      //
      //         4
      //
      //                       3
      //
      //               2
      //
      //                       1
      //
      let nodes = [
        new TreeNode(4),
        new TreeNode(2),
        new TreeNode(1),
        new TreeNode(3),
        new TreeNode(6),
        new TreeNode(5),
        new TreeNode(7),
      ];
      let bst = new BinarySearchTree();
      for (let node of nodes) {
        bst.insert(node);
      }

      it('should return back the a TreeNode if the value is found', () => {
        expect(bst.find(4)).toBeInstanceOf(TreeNode);
      });

      it('should return the correct node', () => {
        expect(bst.find(5).value).toEqual(5);
      });

      it('should return null if the node cannot be found', () => {
        expect(bst.find(100)).toBeNull();
      });
    });

    describe('Invalid', () => {
      it('should detect a non-number and throw a TypeError', () => {
        let bst = new BinarySearchTree(new TreeNode(10));
        expect(() => bst.find('not a number')).toThrow('value to find must be a number');
      });
    });
  });

  describe('#remove', () => {
    describe('Valid', () => {
      it('should return true when it successfully deletes a node', () => {
        let bst = new BinarySearchTree(new TreeNode(100));
        expect(bst.remove(100)).toBeTruthy();
        expect(bst.root).toBeNull();
      });

      it('should find and remove a node properly with no children', () => {
        // Build the following tree
        //                       7
        //
        //               6
        //
        //                       5
        //
        //         4
        //
        //                       3
        //
        //               2
        //
        //                       1
        //
        let nodes = [
          new TreeNode(4),
          new TreeNode(2),
          new TreeNode(1),
          new TreeNode(3),
          new TreeNode(6),
          new TreeNode(5),
          new TreeNode(7),
        ];
        let bst = new BinarySearchTree();
        for (let node of nodes) {
          bst.insert(node);
        }

        // node should be present before removal
        expect(bst.root.left.left.value).toEqual(1);
        bst.remove(1);
        expect(bst.root.left.left).toBeNull();
      });

      it('should properly remove a node with one child', () => {
        // Build the following tree
        //                       7
        //
        //               6
        //
        //                       5
        //
        //         4
        //
        //                       3
        //
        //               2
        //
        //
        let nodes = [
          new TreeNode(4),
          new TreeNode(2),
          new TreeNode(3),
          new TreeNode(6),
          new TreeNode(5),
          new TreeNode(7),
        ];
        let bst = new BinarySearchTree();
        for (let node of nodes) {
          bst.insert(node);
        }

        // the node should be there before the removal
        expect(bst.root.left.value).toEqual(2);
        bst.remove(2);
        // now the node should be replaced with its child 3
        expect(bst.root.left.value).toEqual(3);
      });

      it('should properly remove 6 node and replace it with 5 since 6 has two children', () => {
        // Build the following tree
        //                       7
        //
        //               6
        //
        //                       5
        //
        //         4
        //
        //                       3
        //
        //               2
        //
        //                       1
        //
        let nodes = [
          new TreeNode(4),
          new TreeNode(2),
          new TreeNode(1),
          new TreeNode(3),
          new TreeNode(6),
          new TreeNode(5),
          new TreeNode(7),
        ];
        let bst = new BinarySearchTree();
        for (let node of nodes) {
          bst.insert(node);
        }

        // 6 should be there initially
        expect(bst.root.right.value).toEqual(6);
        bst.remove(6);
        // Tree should be this now
        //
        //
        //               7
        //
        //                       5
        //
        //         4
        //
        //                       3
        //
        //               2
        //
        //                       1
        //

        // where 6 was should now be 7; the smallest value from the right subtree
        expect(bst.root.right.value).toEqual(7);
        expect(bst.root.right.left.value).toEqual(5);
        expect(bst.root.right.right).toBeNull();
      });

      it('should properly remove the root node by finding the smallest value in the right subtree, replacing it, and removing that duplicate value', () => {
        // Build the following tree
        //                       7
        //
        //               6
        //
        //                       5
        //
        //         4
        //
        //                       3
        //
        //               2
        //
        //                       1
        //
        let nodes = [
          new TreeNode(4),
          new TreeNode(2),
          new TreeNode(1),
          new TreeNode(3),
          new TreeNode(6),
          new TreeNode(5),
          new TreeNode(7),
        ];
        let bst = new BinarySearchTree();
        for (let node of nodes) {
          bst.insert(node);
        }

        // remove the root node
        bst.remove(4);
        // The tree should now look like this
        //                       7
        //
        //               6
        //
        //
        //
        //         5
        //
        //                       3
        //
        //               2
        //
        //                       1
        //
        expect(bst.root.value).toEqual(5);
        expect(bst.root.right.value).toEqual(6);
        expect(bst.root.right.right.value).toEqual(7);
        expect(bst.root.right.left).toBeNull();
      });
    });

    describe('Invalid', () => {
      it('should detect a non-number removal value and throw a TypeError', () => {
        let bst = new BinarySearchTree(new TreeNode(100));
        expect(() => bst.remove('not a number')).toThrow('value must be a number');
      });

      it('should return false if the tree is empty', () => {
        let bst = new BinarySearchTree();
        expect(bst.remove(100)).toBeFalsy();
      });

      it('should return false when an item cannot be removed because it does not exist', () => {
        let bst = new BinarySearchTree(new TreeNode(100));
        expect(bst.remove(2)).toBeFalsy();
      });
    });
  });

  describe('#_findMinimum', () => {
    describe('Invalid', () => {
      it('should return back the minimum value when it is the current node', () => {
        let bst = new BinarySearchTree(new TreeNode(100));
        expect(bst._findMinimum(bst.root)).toEqual(100);
      });

      it('should return the minimum value when it is the left subchild', () => {
        let bst = new BinarySearchTree(new TreeNode(100));
        bst.root.left = new TreeNode(99);
        bst.root.left.left = new TreeNode(98);
        expect(bst._findMinimum(bst.root)).toEqual(98);
      });
    });

    describe('Valid', () => {
      it('should detect a non-TreeNode passed in and throw a TypeError', () => {
        let bst = new BinarySearchTree(new TreeNode(100));
        expect(() => bst._findMinimum('not a TreeNode'))
          .toThrow('must have a valid node of type TreeNode');
      });

      it('should detect nothing passed in and throw a TypeError', () => {
        let bst = new BinarySearchTree(new TreeNode(100));
        expect(() => bst._findMinimum())
          .toThrow('must have a valid node of type TreeNode');
      });
    });
  });

  describe('#isBalanced', () => {
    describe('Valid', () => {
      // Build a balanced tree
      // level difference of 1 === acceptable
      //                               9
      //
      //                       7
      //
      //               6
      //
      //                       5
      //
      //         4
      //
      //                       3
      //
      //               2
      //
      //                       1
      //
      let nodes = [
        new TreeNode(4),
        new TreeNode(2),
        new TreeNode(1),
        new TreeNode(3),
        new TreeNode(6),
        new TreeNode(5),
        new TreeNode(7),
      ];
      let bst = new BinarySearchTree();
      for (let node of nodes) {
        bst.insert(node);
      }

      it('should detect a level difference of 0 or 1 and consider the tree balanced', () => {
        expect(bst.isBalanced()).toBeTruthy();
      });
    });

    describe('Invalid', () => {
      // Build an inbalanced tree
      // level difference of 3 === inacceptable
      //
      //                                        11
      //
      //                                9
      //
      //                       7
      //
      //               6
      //
      //
      //
      //         4
      //
      //                       3
      //
      //               2
      //
      //                       1
      //

      let nodes = [
        new TreeNode(4),
        new TreeNode(2),
        new TreeNode(1),
        new TreeNode(3),
        new TreeNode(6),
        new TreeNode(7),
        new TreeNode(9),
        new TreeNode(11),
      ];
      let bst = new BinarySearchTree();
      for (let node of nodes) {
        bst.insert(node);
      }

      it('should detect a level difference of 2 or more and consider the BST unbalanced', () => {
        expect(bst.isBalanced()).toBeFalsy();
      });
    });
  });

  describe('#_isBalanced', () => {
    describe('Valid', () => {
      it('should populate the info object with the proper deep and shallow level values', () => {
        // Build an inbalanced tree
        // level difference of 3 === inacceptable
        //
        //                                        11
        //
        //                                9
        //
        //                       7
        //
        //               6
        //
        //
        //
        //         4
        //
        //                       3
        //
        //               2
        //
        //                       1
        //

        let nodes = [
          new TreeNode(4),
          new TreeNode(2),
          new TreeNode(1),
          new TreeNode(3),
          new TreeNode(6),
          new TreeNode(7),
          new TreeNode(9),
          new TreeNode(11),
        ];
        let bst = new BinarySearchTree();
        for (let node of nodes) {
          bst.insert(node);
        }
        let info = {shallow: Infinity, deep: 1 };
        bst._isBalanced(bst.root, 1, info);
        expect(info.shallow).toEqual(2);
        expect(info.deep).toEqual(5);
      });
    });

    describe('Invalid', () => {
      it('should detect an invalid info object and throw a TypeError', () => {
        let bst = new BinarySearchTree(new TreeNode(100));
        expect(() => bst._isBalanced(bst.root, 1, null))
          .toThrow('info must be a valid object');
        expect(() => bst._isBalanced(bst.root, 1, 'not an info object'))
          .toThrow('info must be a valid object');
      });

      it('should detect a non-number level value and throw a TypeError', () => {
        let bst = new BinarySearchTree(new TreeNode(100));
        expect(() => bst._isBalanced(bst.root, 'not a number', {}))
          .toThrow('level must be a number');
      });

      it('should detect a level value less then 1 and throw an Error', () => {
        let bst = new BinarySearchTree(new TreeNode(100));
        expect(() => bst._isBalanced(bst.root, -1, {}))
          .toThrow('level must be a value > 1');
      });
    });
  });

  describe('#preOrderTraversal', () => {
    describe('Valid', () => {

      // Build the following tree
      //                       7
      //
      //               6
      //
      //                       5
      //
      //         4
      //
      //                       3
      //
      //               2
      //
      //                       1
      //
      let nodes = [
        new TreeNode(4),
        new TreeNode(2),
        new TreeNode(1),
        new TreeNode(3),
        new TreeNode(6),
        new TreeNode(5),
        new TreeNode(7),
      ];
      let bst = new BinarySearchTree();
      for (let node of nodes) {
        bst.insert(node);
      }
      let values = [];
      bst.preOrderTraversal(item => values.push(item));

      it('should push all the values in a PreOrder fashion', () => {
        expect(values).toEqual([4, 2, 1, 3, 6, 5, 7]);
      });

      it('should have pushed all items from the BinarySearchTree into the array', () => {
        expect(nodes.length).toEqual(values.length);
      });
    });

    describe('Invalid', () => {
      it('should detect an empty BinarySearchTree and return null', () => {
        let bst = new BinarySearchTree();
        let values = [];
        expect(bst.preOrderTraversal(value => values.push(value))).toBeNull();
        expect(values).toEqual([]);
      });

      it('should detect a non-function passed in for the callback and throw a TypeError', () => {
        let bst = new BinarySearchTree(new TreeNode(100));
        let values = [];
        /* shut up the linter */
        values;
        expect(() => bst.preOrderTraversal('not a function at all')).toThrow('cb must be a function');
      });
    });
  });


  describe('#inOrderTraversal', () => {
    describe('Valid', () => {

      // Build the following tree
      //                       7
      //
      //               6
      //
      //                       5
      //
      //         4
      //
      //                       3
      //
      //               2
      //
      //                       1
      //
      let nodes = [
        new TreeNode(4),
        new TreeNode(2),
        new TreeNode(1),
        new TreeNode(3),
        new TreeNode(6),
        new TreeNode(5),
        new TreeNode(7),
      ];
      let bst = new BinarySearchTree();
      for (let node of nodes) {
        bst.insert(node);
      }
      let values = [];
      bst.inOrderTraversal(item => values.push(item));

      it('should push all the values in an InOrder fashion', () => {
        expect(values).toEqual([1, 2, 3, 4, 5, 6, 7]);
      });

      it('should have pushed all items from the BinarySearchTree into the array', () => {
        expect(nodes.length).toEqual(values.length);
      });
    });

    describe('Invalid', () => {
      it('should detect an empty BinarySearchTree and return null', () => {
        let bst = new BinarySearchTree();
        let values = [];
        expect(bst.inOrderTraversal(value => values.push(value))).toBeNull();
        expect(values).toEqual([]);
      });

      it('should detect a non-function passed in for the callback and throw a TypeError', () => {
        let bst = new BinarySearchTree(new TreeNode(100));
        let values = [];
        /* shut up the linter */
        values;
        expect(() => bst.inOrderTraversal('not a function at all')).toThrow('cb must be a function');
      });
    });
  });


  describe('#postOrderTraversal', () => {
    describe('Valid', () => {

      // Build the following tree
      //                       7
      //
      //               6
      //
      //                       5
      //
      //         4
      //
      //                       3
      //
      //               2
      //
      //                       1
      //
      let nodes = [
        new TreeNode(4),
        new TreeNode(2),
        new TreeNode(1),
        new TreeNode(3),
        new TreeNode(6),
        new TreeNode(5),
        new TreeNode(7),
      ];
      let bst = new BinarySearchTree();
      for (let node of nodes) {
        bst.insert(node);
      }
      let values = [];
      bst.postOrderTraversal(item => values.push(item));

      it('should push all the values in a PostOrder fashion', () => {
        expect(values).toEqual([1, 3, 2, 5, 7, 6, 4]);
      });

      it('should have pushed all items from the BinarySearchTree into the array', () => {
        expect(nodes.length).toEqual(values.length);
      });
    });

    describe('Invalid', () => {
      it('should detect an empty BinarySearchTree and return null', () => {
        let bst = new BinarySearchTree();
        let values = [];
        expect(bst.postOrderTraversal(value => values.push(value))).toBeNull();
        expect(values).toEqual([]);
      });

      it('should detect a non-function passed in for the callback and throw a TypeError', () => {
        let bst = new BinarySearchTree(new TreeNode(100));
        let values = [];
        /* shut up the linter */
        values;
        expect(() => bst.postOrderTraversal('not a function at all')).toThrow('cb must be a function');
      });
    });
  });
});
