const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://127.0.0.1:27017");
// 连接数据库
const clientFun = async (c) => {
  await client.connect();
  const db = client.db("mytest");
  return db.collection(c);
};
const main = async () => {
  const cc = await clientFun("cc");
  // const data = await cc.find();
  // console.log(await data.toArray());
  // const d = await cc.insertOne({ name: "lisr", age: 33 });
  // const d = await cc.insertMany([
  //   { name: "lisr1", age: 30 },
  //   { name: "卡卡", age: 21 },
  //   { name: "峰峰", age: 41 },
  //   { name: "艳艳", age: 21 },
  // ]);

  // const d = await cc.find({ age: { $gt: 31 } });
  // console.log(await d.toArray());

  // let d = await cc.updateOne({ name: "卡卡" }, { $set: { age: 11 } });
  // let d = await cc.updateMany(
  //   { age: { $gt: 31 } },
  //   { $set: { name: "Monika" } },
  // );

  // let d = await cc.deleteOne({ age: { $gt: 40 } });
  // let d = await cc.deleteMany({ age: { $gt: 20 } });
  // console.log(d);
};
main().finally(() => client.close());
