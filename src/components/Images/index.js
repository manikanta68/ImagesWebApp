import { Component } from "react";

import "./index.css";

class Images extends Component {
  state = { search: "Mountain", photosList: [] };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { search } = this.state;
    console.log(search);
    // https://api.unsplash.com/search/photos?page=1&query=office>
    const url = `https://api.unsplash.com/search/photos/?client_id=9ORXrAO97wzegtzE_njMVBZVORU41NoG198GSkwvL8M&query=${search}`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok === true) {
      console.log(data.results);
      const listOfData = data.results;
      const updatedData = listOfData.map((each) => ({
        id: each.id,
        url: each.urls.small,
        alt: each.alt_description,
      }));
      console.log(updatedData);
      this.setState({ photosList: updatedData });
    }
  };

  onChangeButton = (event) => {
    console.log(event);
    this.setState({ search: event.target.value }, this.getData);
  };

  render() {
    const { photosList } = this.state;
    return (
      <div className="bgContainer">
        <h1>website</h1>
        <div className="inputBox">
          <input type="text" />
          <button type="button">Search</button>
        </div>
        <div className="searchKeysContainer">
          <button
            onClick={this.onChangeButton}
            className="searchKey"
            type="button"
          >
            Mountain
          </button>
          <button
            onClick={this.onChangeButton}
            className="searchKey"
            type="button"
          >
            Flowers
          </button>
          <button
            onClick={this.onChangeButton}
            className="searchKey"
            type="button"
          >
            Beaches
          </button>
          <button
            onClick={this.onChangeButton}
            className="searchKey"
            type="button"
          >
            Cities
          </button>
        </div>
        <ul className="displayContainer">
          {photosList.map((each) => (
            <li className="eachListItem" key={each.id}>
              <img src={each.url} alt={each.alt} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Images;
