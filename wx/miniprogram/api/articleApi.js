let {yun} = require("./yun.js");

exports.selectReplies = (filter) =>{
    return yun("article.selectReplies",filter);
}

exports.addReply = (reply) => {
    return yun("article.addReply",reply);
}

exports.like = (articleId) => {
    return yun("article.like",articleId);
}

exports.unlike = (articleId) => {
    return yun("article.unlike",articleId);
}

exports.selectArticles = (filter) => {
    return yun("article.selectArticles",filter);
}

exports.getArticle = (articleId) => {
    return yun("article.getArticle",articleId);
}

exports.updateArticle = (article) => {
    return yun("article.updateArticle",article);
}

exports.addArticle = (article) => {
    return yun("article.addArticle",article);
}

