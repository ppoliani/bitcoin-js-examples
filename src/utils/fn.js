// composition hack
Function.prototype['∘'] = function(f){
  return x => this(f(x))
}

const pipe = (...fns) => fns.reverse().reduce((res, fn) => fn(res));

module.exports = {pipe}
