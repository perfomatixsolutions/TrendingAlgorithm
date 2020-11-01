const init = require('./controllers/init')
const validate = require('./utils/validator')

/**
 * get trending value for each videos based on comments, votes, views and uploadTime
 *
 * @param {[{views: Number, comments: Number, votes: Number, uploadTime: Date}]} videos 
 *
 * @returns {Promise<[{trendingValue: Number,views: Number, comments: Number, votes: Number, uploadTime: Date}]>}
 */
exports.trendingValue = async function(videos) {
  try {
    await validate(videos)
    return await init(videos)
  } catch (error) {
    throw (error)
  }
}