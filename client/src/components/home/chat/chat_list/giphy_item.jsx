import React from 'react';

const GiphyItem = ({giphyUrl, selectGiphy}) => {
  return (
    <li id="giphy-item">
      <img id="giphy-image" src={giphyUrl}
        onClick={() => selectGiphy(giphyUrl)} />
    </li>
  );
};

export default GiphyItem;
