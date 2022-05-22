import { ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar/Searchbar";
import React, { Component } from "react";
import ImageGallery from "./components/ImageGallery";

class App extends Component {
  state = {
    name: "",
  };

  handlerSearchBar = (name) => {
    this.setState({ name });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handlerSearchBar} />
        <ToastContainer autoClose={3000} />
        <ImageGallery name={this.state.name} />
      </div>
    );
  }
}

export default App;
