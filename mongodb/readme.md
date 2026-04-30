## mongodb 安装（macOS）

brew tap mongodb/brew
brew install mongodb-community@8.0

## mongodb 启动

brew services start mongodb-community@8.0

## mongodb 停止

brew services stop mongodb-community@8.0

## mongodb 连接

mongosh
show dbs

## mongodb 数据库操作

show dbs // 显示所有数据库
use 库名 // 切换到指定数据库
db // 显示当前数据库

use mytest // 切换到 mytest 数据库（如果不存在则创建）
db.cc.insert({x: 1, y: 2}) // 插入数据 到 cc库

db.dropDatabase() // 删除当前数据库 先确认当前数据库是否是需要删除的数据库

show collections // 显示当前数据库的所有集合

db.ff.drop() // 删除 ff 集合
