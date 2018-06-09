(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const scribble = require('scribbletune');
scribble.transport.start(140);

scribble.clip({ sample: '/kick.wav', pattern: 'x' }).start();
scribble.clip({ sample: '/bass.wav', pattern: '[--xx]' }).start();
scribble.clip({ sample: '/hats.wav', pattern: '[-x]' }).start();

},{"scribbletune":11}],2:[function(require,module,exports){
(function (global){
'use strict';

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require('util/');
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"util/":5}],3:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],4:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],5:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":4,"_process":8,"inherits":3}],6:[function(require,module,exports){

},{}],7:[function(require,module,exports){
var Midi = {};

(function(exported) {

	var DEFAULT_VOLUME   = exported.DEFAULT_VOLUME   = 90;
	var DEFAULT_DURATION = exported.DEFAULT_DURATION = 128;
	var DEFAULT_CHANNEL  = exported.DEFAULT_CHANNEL  = 0;

	/* ******************************************************************
	 * Utility functions
	 ****************************************************************** */

	var Util = {

		midi_letter_pitches: { a:21, b:23, c:12, d:14, e:16, f:17, g:19 },

		/**
		 * Convert a symbolic note name (e.g. "c4") to a numeric MIDI pitch (e.g.
		 * 60, middle C).
		 *
		 * @param {string} n - The symbolic note name to parse.
		 * @returns {number} The MIDI pitch that corresponds to the symbolic note
		 * name.
		 */
		midiPitchFromNote: function(n) {
			var matches = /([a-g])(#+|b+)?([0-9]+)$/i.exec(n);
			var note = matches[1].toLowerCase(), accidental = matches[2] || '', octave = parseInt(matches[3], 10);
			return (12 * octave) + Util.midi_letter_pitches[note] + (accidental.substr(0,1)=='#'?1:-1) * accidental.length;
		},

		/**
		 * Ensure that the given argument is converted to a MIDI pitch. Note that
		 * it may already be one (including a purely numeric string).
		 *
		 * @param {string|number} p - The pitch to convert.
		 * @returns {number} The resulting numeric MIDI pitch.
		 */
		ensureMidiPitch: function(p) {
			if (typeof p == 'number' || !/[^0-9]/.test(p)) {
				// numeric pitch
				return parseInt(p, 10);
			} else {
				// assume it's a note name
				return Util.midiPitchFromNote(p);
			}
		},

		midi_pitches_letter: { '12':'c', '13':'c#', '14':'d', '15':'d#', '16':'e', '17':'f', '18':'f#', '19':'g', '20':'g#', '21':'a', '22':'a#', '23':'b' },
		midi_flattened_notes: { 'a#':'bb', 'c#':'db', 'd#':'eb', 'f#':'gb', 'g#':'ab' },

		/**
		 * Convert a numeric MIDI pitch value (e.g. 60) to a symbolic note name
		 * (e.g. "c4").
		 *
		 * @param {number} n - The numeric MIDI pitch value to convert.
		 * @param {boolean} [returnFlattened=false] - Whether to prefer flattened
		 * notes to sharpened ones. Optional, default false.
		 * @returns {string} The resulting symbolic note name.
		 */
		noteFromMidiPitch: function(n, returnFlattened) {
			var octave = 0, noteNum = n, noteName, returnFlattened = returnFlattened || false;
			if (n > 23) {
				// noteNum is on octave 1 or more
				octave = Math.floor(n/12) - 1;
				// subtract number of octaves from noteNum
				noteNum = n - octave * 12;
			}

			// get note name (c#, d, f# etc)
			noteName = Util.midi_pitches_letter[noteNum];
			// Use flattened notes if requested (e.g. f# should be output as gb)
			if (returnFlattened && noteName.indexOf('#') > 0) {
				noteName = Util.midi_flattened_notes[noteName];
			}
			return noteName + octave;
		},

		/**
		 * Convert beats per minute (BPM) to microseconds per quarter note (MPQN).
		 *
		 * @param {number} bpm - A number in beats per minute.
		 * @returns {number} The number of microseconds per quarter note.
		 */
		mpqnFromBpm: function(bpm) {
			var mpqn = Math.floor(60000000 / bpm);
			var ret=[];
			do {
				ret.unshift(mpqn & 0xFF);
				mpqn >>= 8;
			} while (mpqn);
			while (ret.length < 3) {
				ret.push(0);
			}
			return ret;
		},

		/**
		 * Convert microseconds per quarter note (MPQN) to beats per minute (BPM).
		 *
		 * @param {number} mpqn - The number of microseconds per quarter note.
		 * @returns {number} A number in beats per minute.
		 */
		bpmFromMpqn: function(mpqn) {
			var m = mpqn;
			if (typeof mpqn[0] != 'undefined') {
				m = 0;
				for (var i=0, l=mpqn.length-1; l >= 0; ++i, --l) {
					m |= mpqn[i] << l;
				}
			}
			return Math.floor(60000000 / mpqn);
		},

		/**
		 * Converts an array of bytes to a string of hexadecimal characters. Prepares
		 * it to be converted into a base64 string.
		 *
		 * @param {Array} byteArray - Array of bytes to be converted.
		 * @returns {string} Hexadecimal string, e.g. "097B8A".
		 */
		codes2Str: function(byteArray) {
			return String.fromCharCode.apply(null, byteArray);
		},

		/**
		 * Converts a string of hexadecimal values to an array of bytes. It can also
		 * add remaining "0" nibbles in order to have enough bytes in the array as the
		 * `finalBytes` parameter.
		 *
		 * @param {string} str - string of hexadecimal values e.g. "097B8A"
		 * @param {number} [finalBytes] - Optional. The desired number of bytes
		 * (not nibbles) that the returned array should contain.
		 * @returns {Array} An array of nibbles.
		 */
		str2Bytes: function (str, finalBytes) {
			if (finalBytes) {
				while ((str.length / 2) < finalBytes) { str = "0" + str; }
			}

			var bytes = [];
			for (var i=str.length-1; i>=0; i = i-2) {
				var chars = i === 0 ? str[i] : str[i-1] + str[i];
				bytes.unshift(parseInt(chars, 16));
			}

			return bytes;
		},

		/**
		 * Translates number of ticks to MIDI timestamp format, returning an array
		 * of bytes with the time values. MIDI has a very particular way to express
		 * time; take a good look at the spec before ever touching this function.
		 *
		 * @param {number} ticks - Number of ticks to be translated.
		 * @returns {number} Array of bytes that form the MIDI time value.
		 */
		translateTickTime: function(ticks) {
			var buffer = ticks & 0x7F;

			while (ticks = ticks >> 7) {
				buffer <<= 8;
				buffer |= ((ticks & 0x7F) | 0x80);
			}

			var bList = [];
			while (true) {
				bList.push(buffer & 0xff);

				if (buffer & 0x80) { buffer >>= 8; }
				else { break; }
			}
			return bList;
		},

	};

	/* ******************************************************************
	 * Event class
	 ****************************************************************** */

	/**
	 * Construct a MIDI event.
	 *
	 * Parameters include:
	 *  - time [optional number] - Ticks since previous event.
	 *  - type [required number] - Type of event.
	 *  - channel [required number] - Channel for the event.
	 *  - param1 [required number] - First event parameter.
	 *  - param2 [optional number] - Second event parameter.
	 */
	var MidiEvent = function(params) {
		if (!this) return new MidiEvent(params);
		if (params &&
				(params.type    !== null || params.type    !== undefined) &&
				(params.channel !== null || params.channel !== undefined) &&
				(params.param1  !== null || params.param1  !== undefined)) {
			this.setTime(params.time);
			this.setType(params.type);
			this.setChannel(params.channel);
			this.setParam1(params.param1);
			this.setParam2(params.param2);
		}
	};

	// event codes
	MidiEvent.NOTE_OFF           = 0x80;
	MidiEvent.NOTE_ON            = 0x90;
	MidiEvent.AFTER_TOUCH        = 0xA0;
	MidiEvent.CONTROLLER         = 0xB0;
	MidiEvent.PROGRAM_CHANGE     = 0xC0;
	MidiEvent.CHANNEL_AFTERTOUCH = 0xD0;
	MidiEvent.PITCH_BEND         = 0xE0;


	/**
	 * Set the time for the event in ticks since the previous event.
	 *
	 * @param {number} ticks - The number of ticks since the previous event. May
	 * be zero.
	 */
	MidiEvent.prototype.setTime = function(ticks) {
		this.time = Util.translateTickTime(ticks || 0);
	};

	/**
	 * Set the type of the event. Must be one of the event codes on MidiEvent.
	 *
	 * @param {number} type - Event type.
	 */
	MidiEvent.prototype.setType = function(type) {
		if (type < MidiEvent.NOTE_OFF || type > MidiEvent.PITCH_BEND) {
			throw new Error("Trying to set an unknown event: " + type);
		}

		this.type = type;
	};

	/**
	 * Set the channel for the event. Must be between 0 and 15, inclusive.
	 *
	 * @param {number} channel - The event channel.
	 */
	MidiEvent.prototype.setChannel = function(channel) {
		if (channel < 0 || channel > 15) {
			throw new Error("Channel is out of bounds.");
		}

		this.channel = channel;
	};

	/**
	 * Set the first parameter for the event. Must be between 0 and 255,
	 * inclusive.
	 *
	 * @param {number} p - The first event parameter value.
	 */
	MidiEvent.prototype.setParam1 = function(p) {
		this.param1 = p;
	};

	/**
	 * Set the second parameter for the event. Must be between 0 and 255,
	 * inclusive.
	 *
	 * @param {number} p - The second event parameter value.
	 */
	MidiEvent.prototype.setParam2 = function(p) {
		this.param2 = p;
	};

	/**
	 * Serialize the event to an array of bytes.
	 *
	 * @returns {Array} The array of serialized bytes.
	 */
	MidiEvent.prototype.toBytes = function() {
		var byteArray = [];

		var typeChannelByte = this.type | (this.channel & 0xF);

		byteArray.push.apply(byteArray, this.time);
		byteArray.push(typeChannelByte);
		byteArray.push(this.param1);

		// Some events don't have a second parameter
		if (this.param2 !== undefined && this.param2 !== null) {
			byteArray.push(this.param2);
		}
		return byteArray;
	};

	/* ******************************************************************
	 * MetaEvent class
	 ****************************************************************** */

	/**
	 * Construct a meta event.
	 *
	 * Parameters include:
	 *  - time [optional number] - Ticks since previous event.
	 *  - type [required number] - Type of event.
	 *  - data [optional array|string] - Event data.
	 */
	var MetaEvent = function(params) {
		if (!this) return new MetaEvent(params);
		var p = params || {};
		this.setTime(params.time);
		this.setType(params.type);
		this.setData(params.data);
	};

	MetaEvent.SEQUENCE   = 0x00;
	MetaEvent.TEXT       = 0x01;
	MetaEvent.COPYRIGHT  = 0x02;
	MetaEvent.TRACK_NAME = 0x03;
	MetaEvent.INSTRUMENT = 0x04;
	MetaEvent.LYRIC      = 0x05;
	MetaEvent.MARKER     = 0x06;
	MetaEvent.CUE_POINT  = 0x07;
	MetaEvent.CHANNEL_PREFIX = 0x20;
	MetaEvent.END_OF_TRACK   = 0x2f;
	MetaEvent.TEMPO      = 0x51;
	MetaEvent.SMPTE      = 0x54;
	MetaEvent.TIME_SIG   = 0x58;
	MetaEvent.KEY_SIG    = 0x59;
	MetaEvent.SEQ_EVENT  = 0x7f;

	/**
	 * Set the time for the event in ticks since the previous event.
	 *
	 * @param {number} ticks - The number of ticks since the previous event. May
	 * be zero.
	 */
	MetaEvent.prototype.setTime = function(ticks) {
		this.time = Util.translateTickTime(ticks || 0);
	};

	/**
	 * Set the type of the event. Must be one of the event codes on MetaEvent.
	 *
	 * @param {number} t - Event type.
	 */
	MetaEvent.prototype.setType = function(t) {
		this.type = t;
	};

	/**
	 * Set the data associated with the event. May be a string or array of byte
	 * values.
	 *
	 * @param {string|Array} d - Event data.
	 */
	MetaEvent.prototype.setData = function(d) {
		this.data = d;
	};

	/**
	 * Serialize the event to an array of bytes.
	 *
	 * @returns {Array} The array of serialized bytes.
	 */
	MetaEvent.prototype.toBytes = function() {
		if (!this.type) {
			throw new Error("Type for meta-event not specified.");
		}

		var byteArray = [];
		byteArray.push.apply(byteArray, this.time);
		byteArray.push(0xFF, this.type);

		// If data is an array, we assume that it contains several bytes. We
		// apend them to byteArray.
		if (Array.isArray(this.data)) {
			byteArray.push(this.data.length);
			byteArray.push.apply(byteArray, this.data);
		} else if (typeof this.data == 'number') {
			byteArray.push(1, this.data);
		} else if (this.data !== null && this.data !== undefined) {
			// assume string; may be a bad assumption
			byteArray.push(this.data.length);
			var dataBytes = this.data.split('').map(function(x){ return x.charCodeAt(0) });
			byteArray.push.apply(byteArray, dataBytes);
		} else {
			byteArray.push(0);
		}

		return byteArray;
	};

	/* ******************************************************************
	 * Track class
	 ****************************************************************** */

	/**
	 * Construct a MIDI track.
	 *
	 * Parameters include:
	 *  - events [optional array] - Array of events for the track.
	 */
	var Track = function(config) {
		if (!this) return new Track(config);
		var c = config || {};
		this.events = c.events || [];
	};

	Track.START_BYTES = [0x4d, 0x54, 0x72, 0x6b];
	Track.END_BYTES   = [0x00, 0xFF, 0x2F, 0x00];

	/**
	 * Add an event to the track.
	 *
	 * @param {MidiEvent|MetaEvent} event - The event to add.
	 * @returns {Track} The current track.
	 */
	Track.prototype.addEvent = function(event) {
		this.events.push(event);
		return this;
	};

	/**
	 * Add a note-on event to the track.
	 *
	 * @param {number} channel - The channel to add the event to.
	 * @param {number|string} pitch - The pitch of the note, either numeric or
	 * symbolic.
	 * @param {number} [time=0] - The number of ticks since the previous event,
	 * defaults to 0.
	 * @param {number} [velocity=90] - The volume for the note, defaults to
	 * DEFAULT_VOLUME.
	 * @returns {Track} The current track.
	 */
	Track.prototype.addNoteOn = Track.prototype.noteOn = function(channel, pitch, time, velocity) {
		this.events.push(new MidiEvent({
			type: MidiEvent.NOTE_ON,
			channel: channel,
			param1: Util.ensureMidiPitch(pitch),
			param2: velocity || DEFAULT_VOLUME,
			time: time || 0,
		}));
		return this;
	};

	/**
	 * Add a note-off event to the track.
	 *
	 * @param {number} channel - The channel to add the event to.
	 * @param {number|string} pitch - The pitch of the note, either numeric or
	 * symbolic.
	 * @param {number} [time=0] - The number of ticks since the previous event,
	 * defaults to 0.
	 * @param {number} [velocity=90] - The velocity the note was released,
	 * defaults to DEFAULT_VOLUME.
	 * @returns {Track} The current track.
	 */
	Track.prototype.addNoteOff = Track.prototype.noteOff = function(channel, pitch, time, velocity) {
		this.events.push(new MidiEvent({
			type: MidiEvent.NOTE_OFF,
			channel: channel,
			param1: Util.ensureMidiPitch(pitch),
			param2: velocity || DEFAULT_VOLUME,
			time: time || 0,
		}));
		return this;
	};

	/**
	 * Add a note-on and -off event to the track.
	 *
	 * @param {number} channel - The channel to add the event to.
	 * @param {number|string} pitch - The pitch of the note, either numeric or
	 * symbolic.
	 * @param {number} dur - The duration of the note, in ticks.
	 * @param {number} [time=0] - The number of ticks since the previous event,
	 * defaults to 0.
	 * @param {number} [velocity=90] - The velocity the note was released,
	 * defaults to DEFAULT_VOLUME.
	 * @returns {Track} The current track.
	 */
	Track.prototype.addNote = Track.prototype.note = function(channel, pitch, dur, time, velocity) {
		this.noteOn(channel, pitch, time, velocity);
		if (dur) {
			this.noteOff(channel, pitch, dur, velocity);
		}
		return this;
	};

	/**
	 * Add a note-on and -off event to the track for each pitch in an array of pitches.
	 *
	 * @param {number} channel - The channel to add the event to.
	 * @param {array} chord - An array of pitches, either numeric or
	 * symbolic.
	 * @param {number} dur - The duration of the chord, in ticks.
	 * @param {number} [velocity=90] - The velocity of the chord,
	 * defaults to DEFAULT_VOLUME.
	 * @returns {Track} The current track.
	 */
	Track.prototype.addChord = Track.prototype.chord = function(channel, chord, dur, velocity) {
		if (!Array.isArray(chord) && !chord.length) {
			throw new Error('Chord must be an array of pitches');
		}
		chord.forEach(function(note) {
			this.noteOn(channel, note, 0, velocity);
		}, this);
		chord.forEach(function(note, index) {
			if (index === 0) {
				this.noteOff(channel, note, dur);
			} else {
				this.noteOff(channel, note);
			}
		}, this);
		return this;
	};

	/**
	 * Set instrument for the track.
	 *
	 * @param {number} channel - The channel to set the instrument on.
	 * @param {number} instrument - The instrument to set it to.
	 * @param {number} [time=0] - The number of ticks since the previous event,
	 * defaults to 0.
	 * @returns {Track} The current track.
	 */
	Track.prototype.setInstrument = Track.prototype.instrument = function(channel, instrument, time) {
		this.events.push(new MidiEvent({
			type: MidiEvent.PROGRAM_CHANGE,
			channel: channel,
			param1: instrument,
			time: time || 0,
		}));
		return this;
	};

	/**
	 * Set the tempo for the track.
	 *
	 * @param {number} bpm - The new number of beats per minute.
	 * @param {number} [time=0] - The number of ticks since the previous event,
	 * defaults to 0.
	 * @returns {Track} The current track.
	 */
	Track.prototype.setTempo = Track.prototype.tempo = function(bpm, time) {
		this.events.push(new MetaEvent({
			type: MetaEvent.TEMPO,
			data: Util.mpqnFromBpm(bpm),
			time: time || 0,
		}));
		return this;
	};

	/**
	 * Serialize the track to an array of bytes.
	 *
	 * @returns {Array} The array of serialized bytes.
	 */
	Track.prototype.toBytes = function() {
		var trackLength = 0;
		var eventBytes = [];
		var startBytes = Track.START_BYTES;
		var endBytes   = Track.END_BYTES;

		var addEventBytes = function(event) {
			var bytes = event.toBytes();
			trackLength += bytes.length;
			eventBytes.push.apply(eventBytes, bytes);
		};

		this.events.forEach(addEventBytes);

		// Add the end-of-track bytes to the sum of bytes for the track, since
		// they are counted (unlike the start-of-track ones).
		trackLength += endBytes.length;

		// Makes sure that track length will fill up 4 bytes with 0s in case
		// the length is less than that (the usual case).
		var lengthBytes = Util.str2Bytes(trackLength.toString(16), 4);

		return startBytes.concat(lengthBytes, eventBytes, endBytes);
	};

	/* ******************************************************************
	 * File class
	 ****************************************************************** */

	/**
	 * Construct a file object.
	 *
	 * Parameters include:
	 *  - ticks [optional number] - Number of ticks per beat, defaults to 128.
	 *    Must be 1-32767.
	 *  - tracks [optional array] - Track data.
	 */
	var File = function(config){
		if (!this) return new File(config);

		var c = config || {};
		if (c.ticks) {
			if (typeof c.ticks !== 'number') {
				throw new Error('Ticks per beat must be a number!');
				return;
			}
			if (c.ticks <= 0 || c.ticks >= (1 << 15) || c.ticks % 1 !== 0) {
				throw new Error('Ticks per beat must be an integer between 1 and 32767!');
				return;
			}
		}

		this.ticks = c.ticks || 128;
		this.tracks = c.tracks || [];
	};

	File.HDR_CHUNKID     = "MThd";             // File magic cookie
	File.HDR_CHUNK_SIZE  = "\x00\x00\x00\x06"; // Header length for SMF
	File.HDR_TYPE0       = "\x00\x00";         // Midi Type 0 id
	File.HDR_TYPE1       = "\x00\x01";         // Midi Type 1 id

	/**
	 * Add a track to the file.
	 *
	 * @param {Track} track - The track to add.
	 */
	File.prototype.addTrack = function(track) {
		if (track) {
			this.tracks.push(track);
			return this;
		} else {
			track = new Track();
			this.tracks.push(track);
			return track;
		}
	};

	/**
	 * Serialize the MIDI file to an array of bytes.
	 *
	 * @returns {Array} The array of serialized bytes.
	 */
	File.prototype.toBytes = function() {
		var trackCount = this.tracks.length.toString(16);

		// prepare the file header
		var bytes = File.HDR_CHUNKID + File.HDR_CHUNK_SIZE;

		// set Midi type based on number of tracks
		if (parseInt(trackCount, 16) > 1) {
			bytes += File.HDR_TYPE1;
		} else {
			bytes += File.HDR_TYPE0;
		}

		// add the number of tracks (2 bytes)
		bytes += Util.codes2Str(Util.str2Bytes(trackCount, 2));
		// add the number of ticks per beat (currently hardcoded)
		bytes += String.fromCharCode((this.ticks/256),  this.ticks%256);;

		// iterate over the tracks, converting to bytes too
		this.tracks.forEach(function(track) {
			bytes += Util.codes2Str(track.toBytes());
		});

		return bytes;
	};

	/* ******************************************************************
	 * Exports
	 ****************************************************************** */

	exported.Util = Util;
	exported.File = File;
	exported.Track = Track;
	exported.Event = MidiEvent;
	exported.MetaEvent = MetaEvent;

})( Midi );

if (typeof module != 'undefined' && module !== null) {
	module.exports = Midi;
} else if (typeof exports != 'undefined' && exports !== null) {
	exports = Midi;
} else {
	this.Midi = Midi;
}

},{}],8:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],9:[function(require,module,exports){
'use strict';

const mode = require('./mode');
const chordPtn = /^([a-g][#|b]?)(d[io]m7{0,1}|[67]th|maj7{0,1}|min7{0,1}|m7{0,1}|sus[24]|aug|sixth)\-?([0-8])?/;

/**
 * Scales and integer notation to derive chords
 * @type {Object}
 */
const modeMap = {
	// c e g
	maj: {
		mode: 'ionian',
		int: [0, 2, 4]
	},

	// c e♭ g
	min: {
		mode: 'aeolian',
		int: [0, 2, 4]
	},

	// c d g
	sus2: {
		mode: 'major',
		int: [0, 1, 4]
	},

	// c f g
	sus4: {
		mode: 'major',
		int: [0, 3, 4]
	},

	// c e g b
	maj7: {
		mode: 'major',
		int: [0, 2, 4, 6]
	},

	// c e♭ g b♭
	min7: {
		mode: 'minor',
		int: [0, 2, 4, 6]
	},

	// c e g b♭
	dom7: {
		mode: 'mixolydian',
		int: [0, 2, 4, 6]
	},

	// c e♭ g♭
	dim: {
		mode: 'diminished whole half',
		int: [0, 2, 4]
	},

	// c e♭ g♭ b𝄫
	dim7: {
		mode: 'diminished whole half',
		int: [0, 2, 4, 6]
	},

	// c e g♯
	aug: {
		mode: 'fifth mode',
		int: [0, 2, 5]
	},

	// c e g a
	sixth: {
		mode: 'major',
		int: [0, 2, 4, 5]
	}
};

// Alternate names for chords
modeMap.m = modeMap.min;
modeMap.m7 = modeMap.min7;
modeMap['7th'] = modeMap.dom7;
modeMap['6th'] = modeMap.sixth;

/**
 * Use the chord regex to identify if the passed string is a chord
 * @param  {String}  str [examples: CMaj Cmaj cmaj Cm cmin f#maj7 etc]
 * @return {Boolean}
 */
const isChord = str => str.toLowerCase().match(chordPtn);

/**
 * Derive a chord from the given string. Exposed as simply `chord` in Scribbletune
 * @param  {String} str [example: CMaj]
 * @return {Array}     [example output: ['c4', 'e4', 'g4']]
 */
const getChord = str => {
	str = str.toLowerCase();
	let arr = [];
	
	str.replace(chordPtn, (match, root, scale, octave) => {
		octave = octave || 4;
		let m = mode(root.toLowerCase(), modeMap[scale].mode, octave);
		modeMap[scale].int.forEach(i => {
			arr.push(m[i]);
		});
	});
	return arr;
}

/**
 * Get a list of chords available in Scribbletune.
 * @return {Array}     [example output: ['maj', 'min', 'dim']]
 */
const listChords = () => Object.keys(modeMap);

module.exports = {isChord, getChord, listChords};
},{"./mode":13}],10:[function(require,module,exports){
'use strict';

const assert = require('assert');
const utils = require('./utils');
const chord = require('./chord');
const jsmUtils = require('jsmidgen').Util;

/**
 * Get defauly params for a clip, such as root note, pattern etc
 * @return {Object}
 */
const getdefaultParams = () => ({
	ticks: 512,			// By default a single 4x4 bar is 512 ticks (this is known as HDR_SPEED)
	notes: ['c3'],
	pattern: 'x_______________',
	noteLength: 1 / 16,
	accentMap: '',
	accentHi: 127,
	accentLow: 70,
	shuffle: false,
	sizzle: false,
	arpegiate: false
});

/**
 * Get default params for the arpegiate property
 * @return {Object}
 */
const getDefaultArpegiateParams = () => ({
	distance: 12,
	steps: 1
});

/**
 * Get arpegiated (transposed by distance) notes
 * @return {Object}
 */
const getArpedNotes = (notes, distance) => {
	return notes.map(note => {
		let noteMidiNum = jsmUtils.midiPitchFromNote(note);
		let transposedMidiNum = noteMidiNum + distance;
		return jsmUtils.noteFromMidiPitch(transposedMidiNum);
	});
};


/**
 * A clip is a container of a musical idea based on the params passed to it
 * @param  {Object} params Extend base parans object derived from getdefaultParams
 * @return {Object} The return object is used with the `midi` method to generate a MIDI file
 */
const clip = params => {	
	params = Object.assign(getdefaultParams(), params || {});
	let level = params.accentHi;
	let sizzleArr;
	if (params.sizzle) {
		sizzleArr = utils.sizzleMap(level);
	}

	// Check if the note length is a fraction
	// If so convert it to decimal without using eval
	if (typeof params.noteLength === 'string' && params.noteLength.indexOf('/') > 0) {
		let a = params.noteLength.split('/');
		params.noteLength = a[0] / a[1];
	}

	// If notes is a string, split it into an array
	if (typeof params.notes === 'string') {
		// Remove any accidental double spaces
		params.notes = params.notes.replace(/\s{2,}/g, ' ');
		params.notes = params.notes.split(' ');
	}

	// Convert chords if any to notes
	params.notes = params.notes.map(el => {
		if (Array.isArray(el)) {
			return el.join();
		} else if (chord.isChord(el)) {
			return chord.getChord(el).join();
		} else {
			return el;
		}
	});

	// Validate provided notes
	params.notes.forEach(el => {
		assert(el.match(/[a-gA-G]#?[0-9]/g) !== null, el + ' is not a valid note!');
	});

	// Validate provided pattern does not include anything other than x, - OR _
	assert(params.pattern.match(/[^x\-_]+/) === null, params.pattern + ' is not a valid pattern!');

	// Update notes array in case of arpegiate
	if (params.arpegiate) {
		if (typeof params.arpegiate === 'object') {
			params.arpegiate = Object.assign(getDefaultArpegiateParams(), params.arpegiate);
		} else {
			params.arpegiate = getDefaultArpegiateParams();
		}

		// If the notes are c3 and f3 and the steps are 2 and distance is 12 (octave)
		// Then, make 2 arrays of notes that 12 semitones more than the given notes
		// So in this example, the 2 arrays would be [c4, f4] and [c5, f5]
		// Concatentate these 2 new arrays with the existing notes to create an arpegiated sequence
		let tmpNotes = params.notes;
		for (var i = 0; i < params.arpegiate.steps; i++) {
			let arpedNotes = getArpedNotes(tmpNotes, params.arpegiate.distance);
			params.notes = params.notes.concat(arpedNotes);
			tmpNotes = arpedNotes;
		}
	}

	// Ensure notes array has at least as many elements as pattern
	if (params.notes.length < params.pattern.length) {
		while (params.notes.length < params.pattern.length) {
			params.notes = params.notes.concat(params.notes);
		}
		// Clip off extra notes
		params.notes = params.notes.slice(0, params.pattern.length);
	}

	// Ensure pattern is as long as number of notes
	if (params.pattern.length < params.notes.length) {
		let originalPattern = params.pattern;
		while (params.pattern.length < params.notes.length) {
			params.pattern = params.pattern + originalPattern;
		}
		// Clip off extra chars
		params.pattern = params.pattern.slice(0, params.notes.length);
	}

	// Ensure accent map is as long as the pattern
	if (params.accentMap) {
		while (params.accentMap.length < params.pattern.length) {
			params.accentMap = params.accentMap.concat(params.accentMap);
		}

		// accentMap can be a string (x---x--xx---x) or an Array of numbers (0 to 127)
		// If it s a string, convert it to an array of numbers to be used later while
		// assigning individual volume for each note
		if (typeof params.accentMap === 'string') {
			params.accentMap = params.accentMap.split('');
			params.accentMap = params.accentMap.map(a => a === 'x' ? params.accentHi : params.accentLow);
		}
	}

	// Ensure sizzle array is as long as the pattern
	if (params.sizzle && sizzleArr) {
		while (sizzleArr.length < params.pattern.length) {
			sizzleArr = sizzleArr.concat(sizzleArr);
		}
	}

	// Check if we need to shuffle the notes
	if (params.shuffle) {
		params.notes = utils.shuffle(params.notes);
	}

	// Use string.replace on pattern to derive an array of note objects
	let clipNotes = [], step = 0;

	/**
	 * Look for a note followed by a interval or sustain
	 * @param  {Regex} match The pattern to match (-, x, x-, x_, x__, x____ etc)
	 * @param  {String} noteOn   Note on (denoted by x) with or without sustain (denoted by underscore)
	 * @param  {String} noteOff   Interval (denoted by hyphen)
	 */
	params.pattern.replace(/(x_*)|(-)/g, (match, noteOn, noteOff) => {
		let sizzleVal = level;
		if (params.sizzle) {
			sizzleVal = sizzleArr[step];
		}

		if (params.accentMap) {
			level = params.accentMap[step];
			// Affect the sizzleVal so that the accentMap is carried forward in case of a sizzle
			sizzleVal = level;
		}

		if (noteOn) {
			// Found x OR x- OR x__
			clipNotes.push({
				// A note can be a single note like c3 or comma separated string to denote chords c3,e3,g3
				note: params.notes[step].split(','),
				length: params.noteLength * noteOn.length * params.ticks,
				level: params.sizzle ? sizzleVal : level
			});

			// Increment step to proceed in the notes array
			step++;
		}

		if (noteOff) {
			// Found - (hyphen) - note off
			clipNotes.push({
				note: null,
				length: params.noteLength * params.ticks
			});
		}
	});

	return clipNotes;
}

module.exports = clip;

},{"./chord":9,"./utils":17,"assert":2,"jsmidgen":7}],11:[function(require,module,exports){
'use strict';
const scale = require('./mode');
const chord = require('./chord');
const clip = require('./clip');
const pattern = require('./pattern');
const midi = require('./midi');
const scales = require('./modes');
const transpose = require('./transpose');
let modes = Object.keys(scales);

// Allow scale to be denoted by mode as well
module.exports = {mode: scale, scale, chord: chord.getChord, listChords: chord.listChords, modes, scales: modes, clip, pattern, midi, setMiddleC: transpose.setMiddleC, transposeNote: transpose.transposeNote};

},{"./chord":9,"./clip":10,"./midi":12,"./mode":13,"./modes":14,"./pattern":15,"./transpose":16}],12:[function(require,module,exports){
'use strict';

const fs = require('fs');
const assert = require('assert');
const jsmidgen = require('jsmidgen');
const transpose = require('./transpose');

/**
 * Take an array of note objects to generate a MIDI file in the same location as this method is called
 * @param  {Array} notes    Notes are in the format: {note: ['c3'], level: 127, length: 64}
 * @param  {String} fileName If a filename is not provided, then `music.mid` is used by default
 */
const midi = (notes, fileName) => {
	assert(Array.isArray(notes), 'You must provide an array of notes to write!');
	fileName = fileName || 'music.mid';
	let file = new jsmidgen.File();
	let track = new jsmidgen.Track();
	file.addTrack(track);

	notes.forEach((noteObj) => {
		let level = noteObj.level || 127;
		// While writing chords (multiple notes per tick)
		// only the first noteOn (or noteOff) needs the complete arity of the function call
		// subsequent calls need only the first 2 args (channel and note)
		if (noteObj.note) {
			// Transpose the note to the correct middle C (in case middle C was changed)
			noteObj.note = transpose.transposeNote(noteObj.note);
			if (typeof noteObj.note === 'string') {
				track.noteOn(0, noteObj.note, noteObj.length, level); // channel, pitch(note), length, velocity
				track.noteOff(0, noteObj.note, noteObj.length, level);
			} else {
				track.addChord(0, noteObj.note, noteObj.length, level);
			}
		} else {
			track.noteOff(0, '', noteObj.length);
		}
	});

	fs.writeFileSync(fileName, file.toBytes(), 'binary');
}

module.exports = midi;

},{"./transpose":16,"assert":2,"fs":6,"jsmidgen":7}],13:[function(require,module,exports){
'use strict';

const assert = require('assert');
const modes = require('./modes');
const transpose = require('./transpose');
const chromaticNotes = ['c', 'db', 'd', 'eb', 'e', 'f', 'gb', 'g', 'ab', 'a', 'bb', 'b'];
const accidentals = {
	'c#': 'db',
	'd#': 'eb',
	'f#': 'gb',
	'g#': 'ab',
	'a#': 'bb'
};

/**
 * Get mode or scale for the provided root note and octave
 * @param  {String}  root                  Root note
 * @param  {String}  mode                  Name of the mode or scale
 * @param  {Number}  octave
 * @param  {Boolean} addRootFromNextOctave Append the root note in the next octave before returning the mode/scale
 * @return {[type]}                        Returns the mode as an array, e.g. ['c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3', 'c4']
 */
const mode = (root, mode, octave, addRootFromNextOctave) => {
	if (root.match(/\s/) && !mode && !octave && !addRootFromNextOctave) {
		let args = root.split(/\s/);
		root = args.shift();
		let lastItem = args.pop();

		// Check if the last item is a true/false value for addRootFromNextOctave
		if (lastItem === 'true' || lastItem === 'false') {
			addRootFromNextOctave = lastItem !== 'false';
			lastItem = args.pop();	// lastItem should now be the octave
		}

		// Check if the last item is a number specified for the octave
		if (Number.isInteger(+lastItem)) {
			octave = +lastItem;
			// Since it was an octave, nullify last time
			// so that in case it was not a number then it can be assumed to be a mode/scale
			lastItem = null;
		}

		// Since we extracted the root, octave and addRootFromNextOctave,
		// what's left should be part (or whole) name of a mode, push it back into the args
		if (lastItem) {
			args.push(lastItem);
		}

		// Combine whatever is left behind and assume it as the mode or scale name
		mode = args.join(' ');
	}

	// Make sure the root is valid [abcdefg] optionally followed by #
	assert(root.match(/[abcdefg]#?/i), 'Invalid root note: ' + root);

	// Make sure if the provided mode is valid
	assert(modes.hasOwnProperty(mode), 'Invalid mode: ' + mode);

	root = root || 'c';
	if (root.indexOf('#') > 0) {
		root = accidentals[root];
	}
	mode = mode || 'ionian';
	octave = +octave || transpose.defaultMiddleC;

  	// Transpose octave into correct octave determined by middle C
	addRootFromNextOctave = addRootFromNextOctave !== false;

	// Append octave to chromatic notes
	let chromatic =
		chromaticNotes
			.map(note => note + octave)
			// Double up with the next octave to be able to bleed over
			.concat(
				chromaticNotes.map(note => note + (octave + 1))
			);

	/**
	 * Slice the chromatic notes from the root note onward &
	 * filter it by mode pattern to return the correct notes
	 */
	let modeArr = chromatic
		.slice(chromatic.indexOf(root + octave))
		.filter((note, idx) => modes[mode][idx] === 1);

	// Add root from the next octave before returning (default)
	if (addRootFromNextOctave) {
		modeArr.push(root + (octave + 1));
	}
	return modeArr;
}

module.exports = mode;
},{"./modes":14,"./transpose":16,"assert":2}],14:[function(require,module,exports){
/**
 * Modes and scales along with their alternate names where applicable
 * @type {Object}
 */
'use strict';

const modes = {

	// Common
	'ionian': [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
	'dorian': [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0],
	'phrygian': [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
	'lydian': [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
	'mixolydian': [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
	'aeolian': [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0],
	'locrian': [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],

	// Melodic Minor
	'melodic minor': [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	'phrygian #6': [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
	'lydian augmented': [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
	'lydian dominant': [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0],
	'fifth mode': [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0],
	'locrian #2': [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0],
	'altered': [1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],

	// Symmetric
	'whole tone': [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
	'diminished whole half': [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],

	// Pentatonic
	'major pentatonic': [1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
	'minor pentatonic': [1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
	'suspended pentatonic': [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
	'dominant pentatonic': [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1],
	'japanese': [1, 1, 0, 0, 0, 1, 0, 1, 1, 0],

	// Blues
	'blues': [1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0],

	// Bebop
	'bebop major': [1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
	'bebop minor': [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
	'bebop dominant': [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1],
	'bebop melodic minor': [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],

	// Harmonic
	'harmonic major': [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1],
	'harmonic minor': [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
	'double harmonic major': [1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1],

	// Exotic
	'hungarian gypsy': [1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1],
	'hungarian major': [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1],
	'phrygian dominant': [1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
	'neapolitan minor': [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1],
	'neapolitan major': [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	'enigmatic': [1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1],
	'eight-tone spanish': [1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
	'balinese pelog': [1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
	'oriental': [1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
	'iwato': [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
	'yo': [1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
	'prometheus': [1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
	'symmetrical': [1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0],
	'major locrian': [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],

	// Miscellaneous
	'augmented': [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
	'lydian minor': [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0]
};

// Ionian and Aeloian modes are also known as Major and Minor scales
modes['major'] = modes['ionian'];
modes['minor'] = modes['aeolian'];

// Diminished half whole is the same as diminished whole half
modes['diminished half whole'] = modes['diminished whole half'];

// Lydian Dominant is also known as Mixolydian #4 (sharp fourth)
modes['mixolydian #4'] = modes['lydian dominant'];

// Fifth mode is also known as Mixolydian b6 (flat sixth)
modes['mixolydian b6'] = modes['fifth mode'];

// Locrian #2(sharp second) is also known as Aeolian b5 (flat fifth)
modes['aeolian b5'] = modes['locrian #2'];

module.exports = modes;

},{}],15:[function(require,module,exports){
'use strict';

const utils = require('./utils');

/**
 * Generate a pattern based on the parameters provided
 * @param  {Number} len     Number of times to repeat the `chars` String
 * @param  {String} chars   The characters to be used for the pattern. e.g. any combination of x, - and x_
 * @param  {Boolean} shuffle Should the provided `chars` be shuffled
 * @return {String}        If len is 2 and chars is 'x---' and shuffle is false, then output is x---x---
 */
const pattern = (len, chars, shuffle) => {
	len = len || 4;
	chars = chars || 'x_x_';
	shuffle = shuffle || false;
	if (shuffle) {
		chars = utils.shuffle(chars.split('')).join('');
	}
	return chars.repeat(len);
}

module.exports = pattern;

},{"./utils":17}],16:[function(require,module,exports){
'use strict';
const assert = require('assert');
const defaultMiddleC = 4;

/**
 * Transposition is a global that subtracts the provided value for middle C from the default middle C
 * For e.g. if you set the middle C to 5, the transposition will be be set to defaultMiddleC - 5 = -1.
 * While writing to MIDI, this "transposition" will be considered and a note entered as C4
 * will appear as C4 in Ableton Live or Propellerhead Reason which consider C3 as the middle C. 
 * Without this adjustment it will look like C3 in most modern music creation software!
 */
let transposition = 0;

/**
 * startOctave is a global to be able to transpose an array of notes relative to the octave of the first note
 * in the array. (TODO: Ideally we need to come up with a better way than have this global var here)
 */
let startOctave;

/**
 * Takes an integer and transposes all notes to a different middle C octave.
 * @param {Integer} octave		The new octave for middle C.
 */
function setMiddleC(octave) {
	octave = Number(octave);
	assert(Number.isInteger(octave), 'Octave must be an integer to set middle C.');
	transposition = octave - defaultMiddleC;
}

/**
 * Takes an octave and transposes it to the octave determined by transposition
 * @param {Integer/String} initialOctave	The initial octave
 * @return {Integer} The correctly transposed octave
 */
function transposeOctave(initialOctave) {
	initialOctave = Number(initialOctave);	// Not using parseInt as it will convert invalid input such as 3.3 to 3
	assert(Number.isInteger(initialOctave), 'Initial Octave must be an integer.');
	return initialOctave += transposition;
}

/**
 * Takes a single note or array of notes and transposes into the octave given by transposition or the octave param
 * @param {String/Array} noteArg		The Array/String contaning the note(s)
 * @param {Integer} octave The octave to transpose to  
 * @return {String(s)} 	The correctly transposed note(s)
 */
const transposeNote = (noteArg, octave) => {
	assert(typeof noteArg === 'string' || Array.isArray(noteArg));
	assert(Number.isInteger(octave) || octave === undefined, 'Octave, if defined, must be an integer');
	if(typeof noteArg === 'string') {
		// If a single note was passed, transpose the single note
		return _transposeSingle(noteArg, 0, octave);
	} else {
		// If an array of notes were passed, transpose every note in the array relative to the octave of the first note
		return noteArg.map((n, i) => _transposeSingle(n, i, octave));
	}
}
/**
 * Private method to transpose a single note to the correct octave determined by transposition or the octave argument
 * @param {String} note     Note to be transposed
 * @param {Integer} noteIndex   Index in note array (if noteIndex is 0, we will use the octave of that note as a ref)
 * @param {Integer} octave Optional octave to transpose to  
 * @return {String} Transposed note
 */
const _transposeSingle = (note, noteIndex, octave) => {
	assert(typeof note === 'string', 'Note must be a string.');

	// Get the root from the note, for e.g. get C from C4
	let root = note.replace(/\d/g, '');
    
	// Get the octave from the note, for e.g. get 4 from C4
	let oct = +note.replace(/[^\d]/g, '');

	// In case of an Array of notes, consider the first note's octave as the relative octave
	// For e.g. If the input was ['c4', 'd5', 'e6'] with octave set to 6, dont convert it to ['c6', 'd6', 'e6']
	// Instead, convert it to ['c6', 'd7', 'e8']. Basically bump octave relative to the first note in the array
	// It took the first note 2 octaves to get to 6 from 4, hence move the rest of the notes up by 2 octaves only
	// This is helpful for transposing chords & melodies.
	if (noteIndex === 0) {
		startOctave = oct;
	}

	if (octave) {
		oct = octave + (oct - startOctave);
	} else {
		oct += transposition;
	}
	// Transpose the octave
	return root + oct;
}
module.exports = {setMiddleC, transposeNote, transposeOctave, defaultMiddleC};

},{"assert":2}],17:[function(require,module,exports){
'use strict';

const minorChords = ['m', 'min', 'Min', 'Minor', 'minor'];

const utils = {
	/**
	 * Basic Array randomizer
	 * @param  {Array} arr
	 * @return {Array}
	 */
	shuffle: arr => {
		let lastIndex = arr.length - 1;
		arr.forEach((el, idx) => {
			let rnd = Math.round(Math.random() * lastIndex);
			arr[idx] = arr[rnd];
			arr[rnd] = el;
		});

		return arr;
	},

	/**
	 * Return an array of numbers relative to maxLevel || 127 ordered in a Sine wave format
	 * This is used by the `sizzle` param of the `clip` method to add a rudimentary variation to the accent of each note
	 * e.g. 
	 * @param  {Number} maxLevel A number between not more than 127
	 * @return {Array}  Example output [63, 90, 110, 127, 110, 90, 63, 0, 63, 90, 110, 127, 110, 90, 63, 0]
	 */
	sizzleMap: maxLevel => {
		maxLevel = maxLevel || 127;
		let pi = Math.PI;
		let piArr = [pi/6, pi/4, pi/3, pi/2, 2*pi/3, 3*pi/4, 5*pi/6, pi];
		let piArrRev = [0, pi/6, pi/4, pi/3, pi/2, 2*pi/3, 3*pi/4, 5*pi/6];
		piArrRev.reverse();
		let arr = piArr.concat(piArrRev);
		return arr.map(element => Math.round(Math.sin(element) * maxLevel));
	}
};

module.exports = utils;

},{}]},{},[1]);
