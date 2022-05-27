import ImageGalleryItem from "../ImageGalleryItem";
import { Component } from "react";
import PropTypes from "prop-types";
import s from "./ImageGallery.module.css";

class ImageGallery extends Component {
  render() {
    return (
      <main className={s.container}>
        <ul className={s.ImageGallery}>
          {this.props.pictures.map(({ id, webformatURL, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                largeImageURL={largeImageURL}
                webformatURL={webformatURL}
              />
            );
          })}
        </ul>
      </main>
    );
  }
}

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};

export default ImageGallery;
