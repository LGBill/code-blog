const {Article} = require('../../model/article')
const {Comment} = require('../../model/comment')


module.exports = async (req, res) => {
  const id = req.query.id
  let article = await Article.findOne({_id: id}).populate('author')
  article = JSON.stringify(article);
  article = JSON.parse(article);
  let comments = await Comment.find({aid: id}).populate('uid')
  comments = JSON.stringify(comments);
  comments = JSON.parse(comments);

  res.render('home/article', {
    article,
    comments
  })
}
