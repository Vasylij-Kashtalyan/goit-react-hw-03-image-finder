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
      const picturesObject = await fetchPicturesWithQuery(nextName, nextPage);

      if (picturesObject.hits.length === 0) {
        return toast.error(`No pictures with name: "${nextName}".`);
      }

      if (prevState.name !== nextName) {
        this.setState({ loading: true });
        const picturesObject = await fetchPicturesWithQuery(nextName, nextPage);

        picturesObject.hits.length !== 0
          ? this.setState({
              pictures: picturesObject.hits,
              totalPicture: picturesObject.totalHits,
              loading: false,
            })
          : this.setState({ loading: false });
      }

      if (prevState.page !== nextPage && nextPage !== 1) {
        this.setState({ loading: true });
        const picturesObject = await fetchPicturesWithQuery(nextName, nextPage);

        this.setState((prevState) => ({
          pictures: [...prevState.pictures, ...picturesObject.hits],
          totalPicture: picturesObject.totalHits,
          loading: false,
        }));
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

  handlerSearchBar = (name) => {
    this.setState({ name });
  };

  render() {
    const { pictures, loading, totalPicture, page } = this.state;

    return (
      <div>
        {loading && <Loader />}
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.handlerSearchBar} />
        {pictures && <ImageGallery pictures={pictures} />}

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
