import { Component } from "react";

import "./index.css";

const buttonsList = [
  { id: 1, buttonValue: "Mountain", buttonText: "Mountain" },
  { id: 2, buttonValue: "Flowers", buttonText: "Flowers" },
  { id: 3, buttonValue: "Beaches", buttonText: "Beaches" },
  { id: 4, buttonValue: "Cities", buttonText: "Cities" },
];

const apiStatusConstants = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  fail: "FAIL",
};

class Images extends Component {
  state = {
    search: "Mountain",
    photosList: [],
    inputSearch: "",
    pageCount: 1,
    apiStatus: apiStatusConstants.initial,
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ apiStatus: apiStatusConstants.loading });
    const { search, pageCount } = this.state;

    // https://api.unsplash.com/search/photos?page=1&query=office>
    const url = `https://api.unsplash.com/search/photos/?client_id=9ORXrAO97wzegtzE_njMVBZVORU41NoG198GSkwvL8M&query=${search}&page=${pageCount}`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok === true) {
      console.log(data);
      const listOfData = data.results;
      const updatedData = listOfData.map((each) => ({
        id: each.id,
        url: each.urls.thumb,
        alt: each.alt_description,
      }));
      this.setState({
        apiStatus: apiStatusConstants.success,
        photosList: updatedData,
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.fail });
    }
  };

  onChange = (event) => {
    console.log(event.target.value);
    this.setState({ search: event.target.value }, this.getData);
  };

  onInputChange = (event) => {
    this.setState({ inputSearch: event.target.value });
  };

  onSearchButton = () => {
    const { inputSearch } = this.state;
    this.setState({ search: inputSearch, inputSearch: "" }, this.getData);
  };

  onPagePrev = () => {
    const { pageCount } = this.state;
    if (pageCount > 1) {
      this.setState(
        (prevState) => ({ pageCount: prevState.pageCount - 1 }),
        this.getData
      );
    }
  };

  onPageNxt = () => {
    this.setState(
      (prevState) => ({ pageCount: prevState.pageCount + 1 }),
      this.getData
    );
  };

  renderingData = () => {
    const { apiStatus, photosList, inputSearch, pageCount } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <div className="bgContainer">
            <h1 className="head">Search For Images</h1>
            <div className="pageNation">
              <button
                className="prevButton"
                onClick={this.onPagePrev}
                type="button"
              >
                Prev
              </button>
              <p className="pageCount">{pageCount}</p>
              <button
                className="nxtButton"
                onClick={this.onPageNxt}
                type="button"
              >
                Next
              </button>
            </div>
            <div className="inputBox">
              <input
                value={inputSearch}
                onChange={this.onInputChange}
                type="text"
                className="input"
              />
              <button
                className="searchButton"
                onClick={this.onSearchButton}
                type="button"
              >
                Search
              </button>
            </div>
            <ul className="searchKeysContainer">
              {buttonsList.map((button) => (
                <li key={button.id} className="searchKey">
                  <button
                    type="button"
                    value={button.buttonValue}
                    onClick={this.onChange}
                    className="searchButtonEach"
                  >
                    {button.buttonText}
                  </button>
                </li>
              ))}
            </ul>
            <ul className="displayContainer">
              {photosList.map((each) => (
                <li className="eachListItem" key={each.id}>
                  <img className="image" src={each.url} alt={each.alt} />
                </li>
              ))}
            </ul>
          </div>
        );
      case apiStatusConstants.loading:
        return (
          <div className="constant">
            <p>Please Wait Fetching Data....</p>
          </div>
        );
      case apiStatusConstants.fail:
        return (
          <div className="constant">
            <p>We are unlivable to fetch your request</p>
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    return this.renderingData();
  }
}

export default Images;
