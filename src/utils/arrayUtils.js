(() => {
  Array.prototype.getAllSubsets = function() {
    return this.reduce(
      (subsets, value) => subsets.concat(
       subsets.map(set => [...set, value])
      ),
      [[]]
    );
  }

  Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
  }

  Array.prototype.lastElem = function (prop) {
    const lastItemsArr = this.slice(-1);
    if (lastItemsArr.length) {
      return lastItemsArr[0] && lastItemsArr[0][prop]
    }
    return undefined;
  }
})();