'use strict';

/**
 * @typedef {{minview: Number, minComment: number, minVote: Number, maxView: Number, maxComment: Number, maxVote: Number}} valuesPerTenMin
 * @typedef {{id: Number, avgViewsPerTenMin: Number, avgCommentPerTenMin: Number, avgVotePerTenMin: Number}} trendingVideoDataObject
*/
/**
 * Function to find average values per ten minute of videos
 * Function also calculates each metadatas minimum and maximum values
 *
 * @param {{id: Number, loops: Number, uploadTime: Date, metaData: { commentCount: Number, voteCount: Number}}} videos
 * @returns {{valuesPerTenMin: valuesPerTenMin, trendingVideoData: [trendingVideoDataObject]}}
 */
module.exports = (videos) =>{
  try {
    const valuesPerTenMin = {
      minView: 0,
      minComment: 0,
      minVote: 0,
      maxView: 0,
      maxComment: 0,
      maxVote: 0
    }
    const trendingVideoData = [];
    for (let [index, video] of videos.entries()) {
      const avgViewsPerTenMin = getAvgValuePerTenMinute(video.views, video.uploadTime);
      const avgCommentPerTenMin = getAvgValuePerTenMinute(video.comments, video.uploadTime);
      const avgVotePerTenMin = getAvgValuePerTenMinute(video.votes, video.uploadTime);
      trendingVideoData.push({
        avgViewsPerTenMin,
        avgCommentPerTenMin,
        avgVotePerTenMin,
        ...video
      })
      if (index === 0) {
        // set avg values of 1st iteration video as min and max values
        valuesPerTenMin.minView = avgViewsPerTenMin;
        valuesPerTenMin.minComment = avgCommentPerTenMin;
        valuesPerTenMin.minVote = avgVotePerTenMin;
        // max
        valuesPerTenMin.maxView = avgViewsPerTenMin;
        valuesPerTenMin.maxComment = avgCommentPerTenMin;
        valuesPerTenMin.maxVote = avgVotePerTenMin;
      } else {
        // compare avg values with min values
        if(avgViewsPerTenMin < valuesPerTenMin.minView) {
          valuesPerTenMin.minView = avgViewsPerTenMin
        }
        //
        if(avgCommentPerTenMin < valuesPerTenMin.minComment) {
          valuesPerTenMin.minComment = avgCommentPerTenMin
        }
        //
        if(avgVotePerTenMin < valuesPerTenMin.minVote) {
          valuesPerTenMin.minVote = avgVotePerTenMin
        }
        // compare avg values with max values
        if(avgViewsPerTenMin > valuesPerTenMin.maxView) {
          valuesPerTenMin.maxView = avgViewsPerTenMin
        }
        //
        if(avgCommentPerTenMin > valuesPerTenMin.maxComment) {
          valuesPerTenMin.maxComment = avgCommentPerTenMin
        }
        //
        if(avgVotePerTenMin > valuesPerTenMin.maxVote) {
          valuesPerTenMin.maxVote = avgVotePerTenMin
        }
      }
    };
    return {
      trendingVideoData,
      valuesPerTenMin
    }
  } catch (error) {
    throw(error);
  }
}

/**
 * Function to get the average value per ten minute for a video
 *
 * @param {Number} count total count of views/comments/votes of video
 * @param {Date} uploadTime uploaded time of video
 * @returns {Number}
 */
function getAvgValuePerTenMinute(count, uploadTime) {
  return (count/(6*getVideoDuration(uploadTime)));
}

/**
 * Function to get the age of a given time in hours
 *
 * @param {Date} time time
 * @returns {Number}
 */
function getVideoDuration(time){
  const currentTime = new Date();
  const diff =((currentTime.getTime() - time.getTime()) / 1000)/(60 * 60);
  return Math.abs(Math.round(diff));
}