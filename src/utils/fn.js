// composition hack
Function.prototype['∘'] = function(f){
  return x => this(f(x))
}

const pipe = (...fns) => fns.reverse().reduce((res, fn) => fn(res));
const partial = (fn, ...args) => (...restArgs) => fn.apply(this, args.concat(restArgs));

module.exports = {pipe, partial}
