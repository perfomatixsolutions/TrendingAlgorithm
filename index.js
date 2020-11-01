const init = require('./controllers/init')
const validate = require('./utils/validator')

exports.trendingValue = async function(videos) {
  try {
    validate(videos)
    return await init(videos)
  } catch (error) {
    throw (error)
  }
}