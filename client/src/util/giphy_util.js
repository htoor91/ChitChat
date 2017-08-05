const GiphyUtil = {

  fetchGifs(searchTerm){
    return $.ajax({
      method: 'GET',
      url: `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=6b7cfeaff97c49aa8af86bd5f8ea9b83&limit=18`
    });
  },

  translateToGif(searchTerm){
    return $.ajax({
      method: 'GET',
      url: `https://api.giphy.com/v1/gifs/translate?s=${searchTerm}&api_key=6b7cfeaff97c49aa8af86bd5f8ea9b83`
    });
  }
};


export default GiphyUtil;
