//日志 文章

// 云函数入口函数
exports.add = async (article, cloud) => {
  console.log(article);
  console.log(cloud);
  return true;
}

exports.update = async (article, cloud) => {
  console.log(article);
  console.log(cloud);
  return false;
}