'use strict';

module.exports = class {
  constructor(value=null) {
    if (!value && value !== 0)
      throw new Error('Error: Val must be a valid piece of data');
    this.value = value;
    this.next = null;
  }
};
