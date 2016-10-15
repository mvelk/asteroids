


const Utils = {
  inherits(childClass, parentClass) {
    const Surrogate = function() {};
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  }
};

module.exports = Utils;
