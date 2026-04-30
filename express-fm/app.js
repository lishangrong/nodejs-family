const express = require("express");
const db = require("./db");

const app = express();
// 接收 encoded 格式的请求体
app.use(express.urlencoded());
// 接收 json 格式的请求体
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const jsonObj = await db.getDb();
    res.send(jsonObj.users);
  } catch (error) {
    res.status(500).json({ err });
  }
});

app.post("/", async (req, res) => {
  // console.log(req.headers);
  console.log(req.body);
  const body = req.body;
  if (!body) {
    res.status(403).json({ error: "缺少用户信息" });
  }
  const jsonObj = await db.getDb();
  body.id = jsonObj.users[jsonObj.users.length - 1].id + 1;
  jsonObj.users.push(body);
  try {
    let w = await db.serveDb(jsonObj);
    if (!w) {
      res.status(200).send({ msg: "添加成功" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.put("/:id", async (req, res) => {
  try {
    let userInfo = await db.getDb();
    let userId = Number.parseInt(req.params.id);
    let user = userInfo.users.find((item) => item.id === userId);
    if (!user) {
      res.status(404).json({ error: "用户不存在" });
      return;
    }
    // res.send(user);
    const body = req.body;
    user.username = body.username ? body.username : user.username;
    user.age = body.age ? body.age : user.age;
    userInfo.users[userId - 1] = user;
    let w = await db.serveDb(userInfo);
    if (!w) {
      res.status(200).send({ msg: "更新成功" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(3000, () => {
  console.log("http://127.0.0.1:3000");
});
