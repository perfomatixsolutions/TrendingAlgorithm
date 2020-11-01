'use strict';

module.exports = async function(videodata) {
  try {
    videodata.forEach(video => {
      if(!(isFinite(video.views) && isFinite(video.comments) && isFinite(video.votes))) {
        throw ('views, comments and votes are required for each videos and they must be numbers')
      }
      if(!(video.uploadTime && is_date(new Date(video.uploadTime)))) {
        throw('video uploadTime is required for all videos and it must be a Date Object')
      }
    }); 
    return;
  } catch (error) {
    throw (error);
  }
}

const is_date = function(input) {
  if ( Object.prototype.toString.call(input) === "[object Date]" ) 
    return true;
  return false;   
};