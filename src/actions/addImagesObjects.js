import request from 'superagent';

export const addImagesObjects = breed => {
  return function(dispatch, getState) {
    if (getState().imagesObjects.length < 85) {
      return request
        .get(`https://dog.ceo/api/breed/${encodeURIComponent(breed)}/images`)
        .then(response => {
          dispatch({
            type: 'ADD_IMAGES_OBJECTS',
            payload: { breed, photos: response.body.message.slice(0, 5) }
          });
          // this.props.breeds.map(breed => this.requirePhotos(breed))
        })
        .catch(console.error);
    }
  };
};
