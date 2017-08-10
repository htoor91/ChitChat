import React from 'react';
import GiphyItem from './giphy_item';

class GiphySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectGiphy = this.selectGiphy.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchGifs('');
    document.addEventListener("click", this.handleClick);
  }

  componentWillUnmount(){
    document.removeEventListener("click", this.handleClick);
  }

  handleClick(e){
    e.preventDefault();
    if (e.target.id !== "giphys-container" && e.target.id !== "giphy-form" && e.target.id !== "search-giphy-box") {
      this.props.toggleGiphySearch();
    }
  }

  handleChange(e) {
    this.setState({ searchTerm: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const searchTerm = this.state.searchTerm.split(' ').join('+');
    this.props.fetchGifs(searchTerm);
  }

  selectGiphy(giphy){
    this.props.addGiphy(giphy, this.state.searchTerm);
    this.props.toggleGiphySearch();
  }

  render() {
    let giphys;
    let giphyContainer;
    if(this.props.giphys){
      giphys = this.props.giphys.map((giphy, idx) =>
      <GiphyItem key={idx}
        giphyUrl={giphy.images.fixed_height.url}
        selectGiphy={this.selectGiphy}/>);

      giphyContainer = (
        <div id="giphys-container">
          <ul id="giphys-list">
            { giphys.slice(0,6) }
          </ul>
          <ul id="giphys-list">
            { giphys.slice(6,12) }
          </ul>
          <ul id="giphys-list">
            { giphys.slice(12,18) }
          </ul>
        </div>
      );
    }


    return (
      <div>
        <form id="giphy-form" onSubmit={this.handleSubmit}>
          <img
            src="" />
          {giphyContainer}
          <input type="text"
            id="search-giphy-box"
            onChange={this.handleChange}
            value={this.state.searchTerm}
            placeholder="Search for giphys"
            autoComplete="off" />
        </form>
      </div>
    );
  }
}

export default GiphySearch;
