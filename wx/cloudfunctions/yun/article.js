// let articles = {
//   _id: '',
//   title: '',
//   content: '',
//   time: '',
//   like: 0,
//   reply: 0,
//   anonymity: false,
//   openId: ''
// }

// let articleLike = {
//   openId: '',
//   articleId: ''
// }

// let articleReply = {
//   openId: '',
//   articleId: '',
//   content: "",
//   at:'',
//   time: '',
// }

exports.selectReplies = async (filter,cloud) =>{
    //filter:{articleId:'',pageIndex:1,pageSize}
    filter.pageIndex = filter.pageIndex || 1;
    filter.pageSize = filter.pageSize || 30;
    var list = cloud.database().collection('articleReplies').where({ articleId: filter.articleId });
    if (filter.pageIndex > 1) {
      list = list.skip((filter.pageIndex - 1) * filter.pageSize);
    }
    return await list.limit(filter.pageSize).orderBy('time', 'desc').get();
}

exports.delReply = async (replyId,cloud) =>{
  let openId = cloud.getWXContext().OPENID;
  
}

exports.addReply = async (reply, cloud) => {
  reply.time = new Date();
  reply.openId = cloud.getWXContext().OPENID;

  let result = await cloud.database().collection('articleReplies').add({
    data: reply
  });
  reply._id = result._id;

  await cloud.database().collection('articles').doc(reply.articleId).update({ data: { reply: cloud.database().command.inc(1) } })
  return reply;
}


exports.like = async (articleId, cloud) => {
  let openId = cloud.getWXContext().OPENID;
  let list = await cloud.database().collection('articleLikes').where({
    openId: openId,
    articleId: articleId
  }).get();
  if (list.data.length < 1) {
    await cloud.database().collection('articleLikes').add({ openId, articleId })
    await cloud.database().collection('articles').doc(articleId).update({ data: { like: cloud.database().command.inc(1) } })
  }
  return true;
}

exports.unlike = async (articleId, cloud) => {
  let openId = cloud.getWXContext().OPENID;

  let result = await cloud.database().collection('articleLikes').where({
    openId: openId,
    articleId: articleId
  }).remove();
  if (result.stats.removed > 0) {
    await cloud.database().collection('articles').doc(articleId).update({ data: { like: cloud.database().command.inc(-1) } })
  }
  return true;
}


exports.selectArticles = async (filter, cloud) => {
  //filter:{openId:'',pageIndex:1,pageSize}
  filter.pageIndex = filter.pageIndex || 1;
  filter.pageSize = filter.pageSize || 30;
  var list = cloud.database().collection('articles');
  if (filter.hasOwnProperty('openId')) {
    list = list.where({ openId: filter.openId });
  }
  if (filter.pageIndex > 1) {
    list = list.skip((filter.pageIndex - 1) * filter.pageSize);
  }
  return await list.limit(filter.pageSize).orderBy('time', 'desc').get();
}


exports.getArticle = async (articleId, cloud) => {
  return await cloud.database().collection('articles').doc(article._id).get();
}

exports.updateArticle = async (article, cloud) => {
  let obj = await cloud.database().collection('articles').doc(article._id).get();
  if (obj.data.openId == cloud.getWXContext().OPENID) {
    await cloud.database().collection('articles').doc(article._id).update({
      data: {
        title: article.title,
        content: article.content,
        anonymity: article.anonymity
      }
    });
    return true;
  } else {
    return false;
  }
}

exports.addArticle = async (article, cloud) => {
  article.time = new Date();
  article.like = 0;
  article.reply = 0;
  article.openId = cloud.getWXContext().OPENID;

  let result = await cloud.database().collection('articles').add({
    data: article
  });
  console.log(result);
  article._id = result._id;

  return article;
}

