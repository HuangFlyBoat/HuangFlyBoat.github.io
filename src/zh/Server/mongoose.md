---
title: Mongoose
icon: page
order: 1
author: HCX
date: 2024-09-17
category:
  - Mongoose
  - Server
tag:
  - Mongoose
sticky: true
star: true
footer: fly fly fly ~
---

# Mongoose 快速入门

Mongoose 是一个用于 Node.js 环境下操作 MongoDB 数据库的对象数据建模（ODM）工具。它提供了一套简便的 API，让开发者能够更轻松地与 MongoDB 进行交互。

## 创建连接、schema 与 modal 定义

### 连接

`mongoose.connect` 方法连接到 MongoDB 数据库，MongoDB的默认端口号为27017，这里也可以省略会默认指向27017的端口

```js
// 引入依赖
const mongoose = require('mongoose');

// 连接到 MongoDB 数据库，mydatabase 为数据库的名称
mongoose.connect('mongodb://localhost:27017/mydatabase', {
   useNewUrlParser: true, // 设置 useNewUrlParser: true，手动启用新解析器，从而避免旧解析器的兼容性问题
   useUnifiedTopology: true // 同上，消除兼容性的警告使用
});

// 通过 on 方法监听连接相应的事件，open、close、error等，具体可查官方文档
mongoose.connect.on("open", () => {
  console.log("已连接")
})

```

### Shema 和 modal

- 在 Mongoose 中，Schema 是用来定义 MongoDB 集合中文档的数据结构的

- 类似于 mysql 里表的概率，在 MongoDB 里面用 schema 来表示，约束了字段和类型。通过mongoose来创建schema，能够对类型和字段进行强约束。

- 一般 MongoDB 与 MySQL 存储数据的角度并不一样，它并不在意数据冗余，也不考虑范式，MongoDB 适用于存储独立性强的数据，数据与数据之间联系比较少，不适合需要过多连表查询的业务

- 因此 schema 的定义上应该注意和 mysql 的表设计有所差异，具体表现在将所有会用的字段都聚合在了一起，一条数据对应的字段会有嵌套来表示内在关系，而不是重新定义一个 schema 来区分。当然通用的 schema 也会进行复用，如通用的数据结构

- 定义好 schema 后，往里面插入数据是接入模型 modal 的相关api，因此要先创建模型并对外暴露，或者暴露一些通用方法

```js
const mongoose = require('mongoose');

// 定义一个用户的 Schema
const userSchema = new mongoose.Schema({
  uid: { 
    index: true, // 标记该字段为索引，会创建索引
    unique: true, // 创建唯一索引，mongoose 验证使用
    type: String, // 类型为 string，mongoose 验证使用
    required: true  // 必须存在，mongoose 验证使用
  }, 
  name: String, // 简单的结构也可以之间书写类型
  favors: { // 数组类型的定义方式
    type: [String], // 限定数组类型为字符串数组，如果不限制则使用 [] 或者 Array
    require: false,
    default: []
  },
  address: { // 对象类型的定义
    // type: addressSchema 也可以创建通用的 schema，从外界导入对应的 schema
    type: {
      country: String,
      province: String 
    },
    require: true,
  },
  extra: {
    type: Object,
    default: {}
  },
  createdAt: { type: Date, default: Date.now } // 创建时间字段，默认为当前时间
});

// 基于 Schema 创建一个用户模型，此时会在连接的 db 里创建一个 User 的集合，里面目前没有数据
const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
```

需要注意的是在定义后并不会直接在 MongoDB 里创建对应的集合，会在模型使用时才会自动创建集合。

并且，如果后续要删除字段，也不会影响到之前 db 里已有的数据，新增的字段则会在之后新增的数据里带上。

索引的删除需要特别注意，它并不会与你在 schema 里定义的索引同步，当你在 schema 里删除 unique 或者 index 等索引时，并不会实际生效。这时需要用到指定的方法来同步结构，如以下所示

```js
// 通过这种方式，会在后台执行命令同步schema的索引，详情见官网文档
// This function will drop any indexes that are not defined in the model's schema except the _id index, and build any indexes that are in your schema but not in MongoDB.
// https://mongoosejs.com/docs/api/model.html#Model.syncIndexes()
await MyModel.syncIndexes()

// 如果只是想删除索引，则也可以使用下面这种方式
// MyModel 为你通过 mongoose.model('collegeName', userSchema); 创建的
MyModel.collection.dropIndexes(function (err, results) {
    // Handle errors
});
```

## 新增文档

通过mongoose定义好模型后，再通过mongoose进行增加数据时便会自动验证，但验证是基于mongoose的，如果直接通过 MongoDB 的控制台指令来插入数据，并不会有验证

在保存时，mongoose 会自动为每一个对象，包括对象里面的子对象添加唯一键 _id，类型为 ObjectId，可以在配置属性时设置 `_id: false` 来关闭

在保存时会进行规则验证，当不通过时会报错，如唯一索引出现了重复(错误码：E11000)，缺失了必选的属性等。但是如果出现了 schema 没有定义的多余的属性，内部不会报错，会自动去除多余的属性字段

```js
const { User } = require('./models')

const params = {
  id: 'test',
  name: 'xx',
  address: {
    country: 'test-country',
    province: 'test-provinece'
  }
};

const model = new User(params);
// 保存方式一，回调
model.save((err,result) => {
  // result 为保存后返回的模型实例，可以继续调用 save 方法，也可以直接访问并修改相关属性
  console.log(result);
})
// 保存方式二，异步
const result = await model.save()

// 保存方式三，推荐，直接调用接口方式，支持同时传多个对象进行批量保存
const result = await User.create(params);

// 批量创建，使用第一个参数为对象数组，第二个为配置参数
const result = await User.create([params], {}) 

// 批量创建时还可以使用 inserMany 方法进行大量创建, 效率较高
// 第一个参数为对象数组，第二个为配置参数
const result = await User.insertMany([params], {}) 
```

## 查询文档

`Model.find(filter, projection);` filter为查询参数，类型为对象。projection是投影，可选参数，类似于 mysql 的 select

查询通过 find 函数来实现，后面通过点的方式来链式调用查询后的函数，如排序 `.sort()` 和计数 `.count()`，跳过 `.skip()`，链式调用的函数顺序并不会影响结果

查询条件为空对象时表示查询所有 `find({})`

模糊查询可以直接书写正则 `find({name: /王/})`

在查询中如果涉及到或和且等复杂逻辑时，以 `$开头` 的属性被称为操作符，以下为常见的操作符：

- `$and`：与操作 `User.find({ $and: [{ age: { $gt: 18 } }, { age: { $lt: 30 } }] }）`
- `$or`: 或者 `User.find({ $or: [{ age: { $lt: 18 } }, { age: { $gt: 65 } }] })`
- `$in`: 在指定数组中， `User.find({ 'age': { $in: [18, 20] } })`
- `$nin`: 不在指定数组中
- `$gt`: 大于
- `$gte`: 大于等于
- `$lt`:小于
- `$lte`: 小于等于
- `$exist`: 查找存在某条属性的对象 `User.find({ 'address': { $exists: true } })`
- `$regex`: 正则，{ name: { $regex: /^A/, $options: 'i' } } // 以 A 开头，不区分大小写


如果查询条件为文档里嵌套对象的某个属性，则可以直接书写属性名 `User.find('address.country' : {})` 来表示

mongoose 扩充了原本MongoDB的 find 方法，提供了

- findOne: 查询单条数据
- findById: 用于根据文档的唯一标识符（ _id 字段, 可以是字符串或 ObjectId 类型）查找特定文档。`User.findById("12153")`

使用 findById 时，始终是根据 _id 字段进行查找，而不是你在 Schema 中定义的其他字段（如 id）。如果需要根据自定义字段查询，可以使用 findOne 或其他查询方法。

如果不可避免涉及到多个表直接的联合查询，MongoDB也有提供联表操作 `User.find().poplate(属性名, 投影字段)`,属性名需要在对应定义时用 ref 指定外链的集合，且属性名的值为外链集合的_id。这时候会自动将对应关联的表单数据一并查出来

```js
const mongoose = require('mongoose');
const { User } = require('./models');
const Schema = mongoose.Schema;

const params = {
  id: 'test',
  name: 'xx',
  address: {
    country: 'test-country',
    province: 'test-provinece'
  },
  operations: [{
    type: Schema.Types.ObjectId,
    ref: "Operation" // _id 关联表的名称
  }]
};

```

## 更新与删除

### 调用原生的更新方法

- `db.User.updateOne(filter, updateParams)`
- `db.User.updateMany(filter, updateParams)`

filter 格式与 find 方法一致，updateParameters 里书写要更新的属性和对应值，使用 `$set` 操作符。如：
`db.User.updateOne({_id:"xxx"}, {$set: {name: 'newName'}})`

返回类型为一个对象，其中包含着操作是否成功执行 acknowledged, 以及实际修改的文档数量 modifiedCount 和匹配到的数量 matchedCount。当修改时并没有与原有值产生变化，则会返回 modifiedCount 为 0

除了 set 操作符外，还有一些直接更改结构的操作，通常用于处理新老数据结构上兼容的问题

- `$rename`: 重命名，将指定的属性名进行更改。如将 name 修改为 label, `User.updateOne({_id:"xxx"}, {$rename: {name: "label"}}`
- `$unset`: 用于从文档中移除指定的字段，删除文档中不再需要的字段，而保留其他字段的数据。删除在 $unset 的值中，通常可以用空字符串或 null，Mongoose 会识别到这是一个删除操作。实际的值并不重要，关键是字段的键名。`User.updateOne({ _id: userId }, { $unset: { age: "" } })`

如何更新数组里面的元素 ？

- `$push` 向数组中添加新元素，`User.updateOne({ _id: userId }, { $push: { friends: 'newFriendId' }})`
- `$pull` 从数组中删除特定元素 `User.updateOne({ _id: userId }, { $pull: { friends: 'friendIdToRemove' }})`
- `$set` 和 `$` 修改指定元素，根据查询条件来修改 `User.updateOne({ _id: userId, 'friends.friendId': 'friendIdToUpdate' }, { $set: { 'friends.$': 'newFriendId' }})`

当然也可以先查找到该数据，然后修改该数据后再存入到db里

### mongoose 更新功能扩展

在 mongoose 里面调用 updateOne 或者 updateMany 时并不用书写 `$set`，可以直接写要更新的属性和对应值

需要注意的是，默认情况下 mongoose 更新操作并不会触发验证，需要在 option 里设置 `runValidators: true`

### 删除

删除，也是两个通用方法，MongoDB原生支持 `deleteOne(filter)` 与 `deleteMany(filter)`，mongoose 也是

## 索引

索引的作用主要是显著提高查询效率，但会增加额外的存储空间，它们类似于书籍的目录，允许快速查找特定数据而无需扫描整个集合。

- **创建索引**

使用 MongoDB Shell 创建索引：
```bash
db.users.createIndex({ name: 1 }); // 第一个参数为索引的 key，第二个参数为配置项
db.users.createIndex({ email: 1 }, { unique: true, background: true, name: 'email' }); // 创建唯一索引, 设置后台运行不会阻塞其他数据库操作，索引名称为 email，
db.users.getIndexes() // 查看所有索引
```

在定义模型时，可以在 Schema 中使用 index 方法或直接在字段上添加 index 选项。

```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, index: true }, // 创建单字段索引
  age: Number,
  email: { type: String, unique: true } // 创建唯一索引
});

// 创建复合索引
userSchema.index({ age: 1, name: -1 }); // age 升序, name 降序

const User = mongoose.model('User', userSchema);
```

- **删除索引**

删除所有索引： `User.collection.dropIndexes(); `
删除指定名称 name_1(自动生成的名称) 索引:  `User.collection.dropIndex('name_1');`

应该尽量避免在程序运行的过程中，频繁的创建和删除索引，且只对有必要的场景使用索引
