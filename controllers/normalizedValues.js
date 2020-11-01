'use strict';

/**
 * @typedef {{minview: Number, minComment: number, minVote: Number, maxView: Number, maxComment: Number, maxVote: Number}} valuesPerTenMin
 * @typedef {{id: Number, avgViewsPerTenMin: Number, avgCommentPerTenMin: Number, avgVotePerTenMin: Number}} trendingVideoDataObject
*/
/**
 * Function to calculate normalized values for each video
 *
 * @param {[trendingVideoDataObject]} videos
 * @param {valuesPerTenMin} valuesPerTenMin
 * @returns {}
 */
module.exports = (videos, valuesPerTenMin) =>{
  try {
    const avgViewDiff = valuesPerTenMin.maxView - valuesPerTenMin.minView;
    const avgCommentDiff = valuesPerTenMin.maxComment - valuesPerTenMin.minComment;
    const avgVoteDiff = valuesPerTenMin.maxVote - valuesPerTenMin.minVote;
    videos.forEach(video => {
      // normalized view value
      video.normalizedViews = avgViewDiff !== 0 ?
        ((video.avgViewsPerTenMin - valuesPerTenMin.minView) / avgViewDiff) : 0;
      // normalized comment value
      video.normalizedComments = avgCommentDiff !== 0 ?
        ((video.avgCommentPerTenMin - valuesPerTenMin.minComment) / avgCommentDiff) : 0;
      // normalized vote value
      video.normalizedVotes = avgVoteDiff !== 0 ?
        ((video.avgVotePerTenMin - valuesPerTenMin.minVote) / avgVoteDiff) : 0;
    });
    return videos
  } catch (error) {
    throw(error);
  }
}
