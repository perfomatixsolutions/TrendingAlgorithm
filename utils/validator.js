'use strict';

module.exports = async function(videodata) {
  try {
    videodata.forEach(video => {
      if (!(video.views && video.comments && video.votes)){
        throw ('votes, comments and views are required for each video') 
      }
      if(!(isNaN(video.views) && isNaN(video.comments) && isNaN(video.votes))) {
        throw ('views, comments and votes must be a number')
      }
      if(!(video.uploadTime && is_date(new Date(video.uploadTime)))) {
        throw('video upload time is required for all videos')
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