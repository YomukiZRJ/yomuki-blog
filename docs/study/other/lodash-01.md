# lodash - 数组

npm i [lodash-es](https://www.npmjs.com/package/lodash-es)

## 将数组拆分成多个长度的区块

将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 如果 array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。

```javascript
_.chunk(array, [(size = 1)]);

_.chunk(["a", "b", "c", "d"], 2);
// => [['a', 'b'], ['c', 'd']]

_.chunk(["a", "b", "c", "d"], 3);
// => [['a', 'b', 'c'], ['d']]
```

## 数组翻转-改变原数组

**这个方法会改变数组。**

```javascript
_.reverse(array);
```

## 裁剪数组

裁剪数组 array，从 start 位置开始到 end 结束，但不包括 end 本身的位置。

```javascript
_.slice(array, [(start = 0)], [(end = array.length)]);
```

## 过滤数组中的假值

false, null,0, "", undefined, 和 NaN 都是被认为是“假值”。

```
_.compact(array)
```

## 数组连接

创建一个新数组，将 array 与任何数组 或 值连接在一起。

```javascript
_.concat(array, [values]);

var array = [1];
var other = _.concat(array, 2, [3], [[4]]);

console.log(other);
// => [1, 2, 3, [4]]

console.log(array);
// => [1]
```

## 获取两个数组的不同值

创建一个具有唯一 array 值的数组，每个值不包含在其他给定的数组中。（注：即创建一个新数组，这个数组中的值，为第一个数字（array 参数）排除了给定数组中的值。）该方法使用[SameValueZero](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)做相等比较。结果值的顺序是由第一个数组中的顺序确定。

```javascript
_.difference(array, [values]);

_.difference([3, 2, 1], [4, 2]);
// => [3, 1]
```

## 获取两个数组的不同值 By 对每个元素调用方法(thisVal)

这个方法类似[\_.difference](https://www.lodashjs.com/docs/lodash.differenceBy#difference) ，除了它接受一个 iteratee （注：迭代器）， 调用 array 和 values 中的每个元素以产生比较的标准。 结果值是从第一数组中选择。iteratee 会调用**一个参数：**_**(value)**_。（注：首先使用迭代器分别迭代 array 和 values 中的每个元素，返回的值作为比较值）。

1. array _(Array)_: 要检查的数组。
1. [values] _(...Array)_: 排除的值。
1. [iteratee=_.identity] _(Array|Function|Object|string)_: iteratee 调用每个元素。

```javascript
_.differenceBy(array, [values], [(iteratee = _.identity)]);

_.differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor);
// => [3.1, 1.3]

// The `_.property` iteratee shorthand.
_.differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], "x");
// => [{ 'x': 2 }]
```

## 获取两个数组的不同值 By 对每个元素调用比较器(thisVal,otherVal)

这个方法类似[\_.difference](https://www.lodashjs.com/docs/lodash.differenceWith#difference) ，除了它接受一个 comparator （注：比较器），它调用比较 array，values 中的元素。 结果值是从第一数组中选择。comparator 调用参数有**两个：**_**(arrVal, othVal)**_。

1. [comparator] _(Function)_: comparator 调用每个元素。

```javascript
_.differenceWith(array, [values], [comparator]);

var objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
];

_.differenceWith(objects, [{ x: 1, y: 2 }], _.isEqual);
// => [{ 'x': 2, 'y': 1 }]
```

## 在数组中查找符合条件的索引值

该方法返回第一个通过 predicate 判断为真值的元素的索引值（index）
返回值
_(number)_: 返回找到元素的 索引值（index），否则返回 -1。

```javascript
_.findIndex(array, [(predicate = _.identity)], [(fromIndex = 0)]);

var users = [
  { user: "barney", active: false },
  { user: "fred", active: false },
  { user: "pebbles", active: true },
];

_.findIndex(users, function (o) {
  return o.user == "barney";
});
// => 0

// The `_.matches` iteratee shorthand.
_.findIndex(users, { user: "fred", active: false });
// => 1

// The `_.matchesProperty` iteratee shorthand.
_.findIndex(users, ["active", false]);
// => 0

// The `_.property` iteratee shorthand.
_.findIndex(users, "active");
// => 2
```

## 在数组中查找符合条件的索引值，从右到左的迭代

```javascript
_.findLastIndex(array, [(predicate = _.identity)], [(fromIndex = array.length - 1)]);

var users = [
  { user: "barney", active: true },
  { user: "fred", active: false },
  { user: "pebbles", active: false },
];

_.findLastIndex(users, function (o) {
  return o.user == "pebbles";
});
// => 2

// The `_.matches` iteratee shorthand.
_.findLastIndex(users, { user: "barney", active: true });
// => 0

// The `_.matchesProperty` iteratee shorthand.
_.findLastIndex(users, ["active", false]);
// => 2

// The `_.property` iteratee shorthand.
_.findLastIndex(users, "active");
// => 0
```

## 获取数组第一个元素

```javascript
_.head(array);
```

## 获取数组的最后一个元素

```javascript
_.last(array);
```

## 获取数组的第 n 个元素

获取 array 数组的第 n 个元素。如果 n 为负数，则返回从数组结尾开始的第 n 个元素。

```javascript
_.nth(array, [(n = 0)]);
```

## 在数组中查找某个值

返回首次 value 在数组 array 中被找到的 索引值， 如果 fromIndex 为负值，将从数组 array 尾端索引进行匹配。

```javascript
_.indexOf(array, value, [(fromIndex = 0)]);

_.indexOf([1, 2, 1, 2], 2);
// => 1

// Search from the `fromIndex`.
_.indexOf([1, 2, 1, 2], 2, 2);
// => 3
```

## 在数组中查找某个值，从右到左遍历

```javascript
_.lastIndexOf(array, value, [(fromIndex = array.length - 1)]);

_.lastIndexOf([1, 2, 1, 2], 2);
// => 3

// Search from the `fromIndex`.
_.lastIndexOf([1, 2, 1, 2], 2, 2);
// => 1
```

##

## 去除数组头部 N 个元素

```javascript
_.drop(array, [(n = 1)]);
```

## 去除数组尾部 N 个元素

```javascript
_.dropRight(array, [(n = 1)]);
```

## 去除数组的最后一个元素

获取数组 array 中除了最后一个元素之外的所有元素（注：去除数组 array 中的最后一个元素）。

```javascript
_.initial(array);
```

## 去除数组中的元素，根据索引-改变原数组

根据索引 indexes，移除 array 中对应的元素，并返回被移除元素的数组。
**这个方法会改变数组。**

```javascript
_.pullAt(array, [indexes]);

var array = [5, 10, 15, 20];
var evens = _.pullAt(array, 1, 3);

console.log(array);
// => [5, 15]

console.log(evens);
// => [10, 20]
```

## 去除数组中和给定值相同的元素-改变原数组

移除数组 array 中所有和给定值相等的元素，使用[SameValueZero](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) 进行全等比较。
**这个方法会改变数组。**

```javascript
_.pull(array, [values]);
var array = [1, 2, 3, 1, 2, 3];

_.pull(array, 2, 3);
console.log(array);
// => [1, 1]
```

## 去除数组中的给定数组-改变原数组

**这个方法会改变数组。**

```javascript
_.pullAll(array, values);

var array = [1, 2, 3, 1, 2, 3];

_.pullAll(array, [2, 3]);
console.log(array);
// => [1, 1]
```

## 去除数组中的元素，在对其元素进行处理后

**这个方法会改变数组。**
接受一个 iteratee（迭代函数） 调用 array 和 values 的每个值以产生一个值，通过产生的值进行了比较。iteratee 会传入一个参数： _(value)_。
_(Array|Function|Object|string)_: iteratee（迭代器）调用每个元素。

```javascript
_.pullAllBy(array, values, [(iteratee = _.identity)]);

var array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];

_.pullAllBy(array, [{ x: 1 }, { x: 3 }], "x");
console.log(array);
// => [{ 'x': 2 }]
```

## 去除数组中的元素，在对其进行比较后

**这个方法会改变数组。**
这个方法接受 comparator 调用 array 中的元素和 values 比较。comparator 会传入两个参数：(arrVal, othVal)。

```javascript
_.pullAllWith(array, values, [comparator]);

var array = [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
  { x: 5, y: 6 },
];

_.pullAllWith(array, [{ x: 3, y: 4 }], _.isEqual);
console.log(array);
// => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
```

## 去除数组中符合要求的值-改变原数组

**这个方法会改变数组。**
移除数组中 predicate（断言）返回为真值的所有元素，并返回移除元素组成的数组。predicate（断言） 会传入 3 个参数： _(value, index, array)_。

```javascript
_.remove(array, [(predicate = _.identity)]);

var array = [1, 2, 3, 4];
var evens = _.remove(array, function (n) {
  return n % 2 == 0;
});

console.log(array);
// => [1, 3]

console.log(evens);
// => [2, 4]
```

## 去除数组从符合要求(返回 false)到尾部的元素

创建一个切片数组，去除 array 中从 predicate 返回假值开始到尾部的部分。predicate 会传入 3 个参数： _(value, index, array)_。

```javascript
_.dropRightWhile(array, [(predicate = _.identity)]);

var users = [
  { user: "barney", active: true },
  { user: "fred", active: false },
  { user: "pebbles", active: false },
];

_.dropRightWhile(users, function (o) {
  return !o.active;
});
// => objects for ['barney']

// The `_.matches` iteratee shorthand.
_.dropRightWhile(users, { user: "pebbles", active: false });
// => objects for ['barney', 'fred']

// The `_.matchesProperty` iteratee shorthand.
_.dropRightWhile(users, ["active", false]);
// => objects for ['barney']

// The `_.property` iteratee shorthand.
_.dropRightWhile(users, "active");
// => objects for ['barney', 'fred', 'pebbles']
```

## 去除数组从头部到符合要求(返回 false)的元素

创建一个切片数组，去除 array 中从起点开始到 predicate 返回假值结束部分。predicate 会传入 3 个参数： _(value, index, array)_。

```javascript
_.dropWhile(array, [(predicate = _.identity)]);

var users = [
  { user: "barney", active: false },
  { user: "fred", active: false },
  { user: "pebbles", active: true },
];

_.dropWhile(users, function (o) {
  return !o.active;
});
// => objects for ['pebbles']

// The `_.matches` iteratee shorthand.
_.dropWhile(users, { user: "barney", active: false });
// => objects for ['fred', 'pebbles']

// The `_.matchesProperty` iteratee shorthand.
_.dropWhile(users, ["active", false]);
// => objects for ['pebbles']

// The `_.property` iteratee shorthand.
_.dropWhile(users, "active");
// => objects for ['barney', 'fred', 'pebbles']
```

## 填充（替换数组）-改变原数组

使用 value 值来填充（替换） array，从 start 位置开始, 到 end 位置结束（但不包含 end 位置）。
**Note: 这个方法会改变 array（注：不是创建新数组）。**

```javascript
_.fill(array, value, [(start = 0)], [(end = array.length)]);

var array = [1, 2, 3];

_.fill(array, "a");
console.log(array);
// => ['a', 'a', 'a']

_.fill(Array(3), 2);
// => [2, 2, 2]

_.fill([4, 6, 8, 10], "*", 1, 3);
// => [4, '*', '*', 10]
```

##

## 获取数组 s 的交集

创建唯一值的数组，这个数组包含所有给定数组都包含的元素，使用[SameValueZero](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)进行相等性比较。（注：可以理解为给定数组的交集）

```javascript
_.intersection([arrays]);
_.intersection([2, 1], [4, 2], [1, 2]);
// => [2]
```

## 获取数组 s 的交集，在对每个元素处理后

这个方法类似[\_.intersection](https://www.lodashjs.com/docs/lodash.intersectionBy#intersection)，区别是它接受一个 iteratee 调用每一个 arrays 的每个值以产生一个值，通过产生的值进行了比较。结果值是从第一数组中选择。iteratee 会传入一个参数：_(value)_。

1. [iteratee=_.identity] _(Array|Function|Object|string)_: iteratee（迭代器）调用每个元素。

```javascript
_.intersectionBy([arrays], [(iteratee = _.identity)]);

_.intersectionBy([2.1, 1.2], [4.3, 2.4], Math.floor);
// => [2.1]

// The `_.property` iteratee shorthand.
_.intersectionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], "x");
// => [{ 'x': 1 }]
```

## 获取数组 s 的交集，通过比较器

这个方法类似[\_.intersection](https://www.lodashjs.com/docs/lodash.intersectionWith#intersection)，区别是它接受一个 comparator 调用比较 arrays 中的元素。结果值是从第一数组中选择。comparator 会传入两个参数：_(arrVal, othVal)_。

```javascript
_.intersectionWith([arrays], [comparator]);
var objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
];
var others = [
  { x: 1, y: 1 },
  { x: 1, y: 2 },
];

_.intersectionWith(objects, others, _.isEqual);
// => [{ 'x': 1, 'y': 2 }]
```

## 将数组转为字符串

```javascript
_.join(array, [(separator = ",")]);
```

## 获取插入值的最小索引，通过二进制

使用二进制的方式检索来决定 value 值 应该插入到数组中 尽可能小的索引位置，以保证 array 的排序。

```javascript
_.sortedIndex(array, value);

_.sortedIndex([30, 50], 40);
// => 1
```
