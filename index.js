const init = require('./controllers/init')

exports.trendingValue = async function(videos) {
  const validate = require('./utils/validate')
  return await init(videos)
}