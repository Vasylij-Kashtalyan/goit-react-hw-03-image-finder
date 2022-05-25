import { fetchPicturesWithQuery } from "../../api/Fetch.js"
import ImageGalleryItem from "../ImageGalleryItem"
import { Component } from "react";
import PropTypes from 'prop-types';
import Loader from "../Loader"
import Button from "../Button";
import s from "./ImageGallery.module.css"


class ImageGallery extends Component {
  state = {
    pictures: [],
    page: 1,
    error: null,
    status: "idle"
  };

  async componentDidUpdate(prevProps, prevState) {
    const nextName = this.props.name;
    const nextPage = this.state.page;
    
    try {
        
      if (prevProps.name !== nextName) {
        this.setState({  status:"pending" });
        const picturesObject = await fetchPicturesWithQuery(nextName, nextPage);

        (picturesObject.length !== 0)
          ? this.setState({ pictures: picturesObject, status:"resolve" })
          : this.setState({ status:"rejected" })
      };

      if ((prevState.page !== nextPage) && (nextPage !== 1)) {
        this.setState({  loading: true, status:"pending" });
        const picturesObject = await fetchPicturesWithQuery(nextName, nextPage);

        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...picturesObject],
          status: "resolve"
        }));
      };
    } catch (error) {
      this.setState({ error });
    } 
  }

  handleButtonMore = (ev) => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  }
  
  render() {
    const { pictures, status, } = this.state;
    if (status === "idle") {
      return (
        <img scr="../../image/fantasy.jpg" alt=""/>
      );
    };
    
    if (status === "pending") {
      return (
        <Loader />
      );
    };

    if (status === 'rejected') {
      return (<h1>Sorry, not find...</h1>);
    };

    if (status === "resolve") {
      return (
        <main className={s.container}>
          <ul className={s.ImageGallery}>
            {pictures.map(({ id, webformatURL, largeImageURL }) => {
              return <ImageGalleryItem key={id} largeImageURL={largeImageURL} webformatURL={webformatURL} />
            })}
          </ul>
          <div className={s.boxButton}>
          {(pictures.length !== 0) && <Button onClickLoad={this.handleButtonMore}/>}  
          </div>
        </main>
      ); 
      
    };
  };
};

ImageGallery.propTypes = {
  name: PropTypes.string.isRequired,
  
}

export default ImageGallery;