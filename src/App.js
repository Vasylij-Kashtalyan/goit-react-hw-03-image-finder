import { fetchPicturesWithQuery } from "./api/Fetch.js";
import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import ImageGallery from "./components/ImageGallery";
import { toast } from "react-toastify";
import Searchbar from "./components/Searchbar/Searchbar";
import Loader from "./components/Loader/";
import Button from "./components/Button";
import s from "./components/ImageGallery/ImageGallery.module.css";

class App extends Component {
  state = {
    totalPicture: 0,
    loading: false,
    pictures: [],
    error: null,
    name: "",
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const nextName = this.state.name;
    const nextPage = this.state.page;

    try {
      if (prevState.name !== nextName || prevState.page !== nextPage) {
        this.setState({ loading: true });

        await fetchPicturesWithQuery(nextName, nextPage).then((pictures) => {
          this.setState({ loading: false });
          if (pictures.hits.length === 0) {
            return toast.error(`No pictures with name: "${nextName}".`);
          }

          this.setState((prevState) => ({
            pictures: [...prevState.pictures, ...pictures.hits],
            totalPicture: pictures.totalHits,
            loading: false,
          }));
        });
      }
    } catch (error) {
      this.setState({ error });
    }
  }

  handleButtonMore = (ev) => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  resetPage = () => {
    this.setState({ page: 1, pictures: [] });
  };

  handlerSearchBar = (name) => {
    this.setState({ name });
    this.resetPage();
  };

  render() {
    const { pictures, loading, totalPicture, page } = this.state;

    return (
      <div>
        {loading && <Loader />}
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.handlerSearchBar} />
        <ImageGallery pictures={pictures} />

        <div className={s.boxButton}>
          {pictures.length !== 0 && page !== Math.ceil(totalPicture / 12) && (
            <Button onClickLoad={this.handleButtonMore} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
