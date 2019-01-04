
let {yun} = require("./yun.js");

exports.get = (key) => {
  return yun("config.get",key);
}