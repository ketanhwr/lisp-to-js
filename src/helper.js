'use strict';
const runtime = `
function add(a, b){ return a + b };
function substract(a, b){ return a - b };
function multiply(a, b){ return a * b };
function devide(a, b){ return a / b };
function getArrayFromArgs(args){
var result = [];
  for(var i = 0; i < args.length; i++){
    result.push(args[i]);
  }
  return result;
}
`;

const add = `(function(){
 return getArrayFromArgs(arguments).reduce(add);
})`
const substract = `(function(){
 return getArrayFromArgs(arguments).reduce(substract);
})`
const multiply = `(function(){
 return getArrayFromArgs(arguments).reduce(multiply);
})`
const devide = `(function(){
 return getArrayFromArgs(arguments).reduce(devide);
})`

const _call = expr => {}

const collectArgs = (values, value) => {
  if (Array.isArray(value)) {
    values = values.concat(value);
  } else {
    values.push(value);
  }
  return values;
}

const parseExpr = expr => {
  if (expr.values) {
    if (expr.values.length > 1) {
      return `${expr.id}(${expr.values.map(parseExpr)})`;
    } else if (expr.values.length === 1) {
      return `${expr.id}(${expr.values.map(parseExpr)})`;
    } else {
      return `${expr.id}()`;
    }
  } else if (expr.id) {
    return `${expr.id}`;
  } else {
    return expr;
  }
}

const parseDefinition = expr => {
  if (expr.type === 'var') {
    return `var ${expr.name} = ${parseExpr(expr.values[0])};`
  } else if(expr.type === 'function') {
    return `var ${expr.name.id} = function(${expr.name.values}){ return ${parseExpr(expr.values[0])} };`;
  }
}

module.exports = {
  collectArgs,
  add,
  substract,
  multiply,
  devide,
  parseExpr,
  parseDefinition,
  runtime
}

