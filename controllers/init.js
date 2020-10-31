'use strict';

const avgValuesPerTenMinute = require('./avgValuesPerTenMinute')
const normalizedValues = require('./normalizedValues')

module.exports = async function(videos) {
  try {
    // calculate avg values per 10 minutes of each metadata
    const {trendingVideoData, valuesPerTenMin} = avgValuesPerTenMinute(videos);

    // calculate normalized values for each metadata
    normalizedValues(trendingVideoData, valuesPerTenMin);

    // Calculate trending values of each video and update in Database
    trendingVideoData.forEach(async ele => {
      ele.trendingValue = (((0.6 * ele.normalizedViews) + (0.2 * ele.normalizedComments) + (0.2 * ele.normalizedVotes)) * 100);
    });
    return trendingVideoData
  } catch (error) {
    throw(error);
  }
}
