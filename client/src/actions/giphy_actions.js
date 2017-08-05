import Giphy from '../util/giphy_util';

export const RECEIVE_GIFS = 'RECEIVE_GIFS';

export function fetchGifs(searchTerm){
	return (dispatch) => {
		return Giphy.fetchGifs(searchTerm).then(
			(giphys) => dispatch(receiveGifs(giphys.data))
		);
	};
}

export const receiveGifs = (giphys) => {
	return {
		type: RECEIVE_GIFS,
		giphys
	};
};
