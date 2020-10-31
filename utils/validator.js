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
    }); 
    return;
  } catch (error) {
    throw (error);
  }
}