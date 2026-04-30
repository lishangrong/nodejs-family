#!/usr/bin/env node

const { program } = require("commander");

const myHelp = require("../lib/core/help");
myHelp(program);

// 自定义命令
const myCommander = require("../lib/core/myCommander");
myCommander(program);

program.parse(process.argv);
