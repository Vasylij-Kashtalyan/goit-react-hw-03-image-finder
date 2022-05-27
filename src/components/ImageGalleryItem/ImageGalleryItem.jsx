import { Component } from "react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import s from "./ImageGalleryItem.module.css";

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  handlerModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { largeImageURL, webformatURL } = this.props;
    const { showModal } = this.state;

    return (
      <li className={s.ImageGalleryItem}>
        <img
          className={s.ImageGalleryItemImage}
          src={webformatURL}
          alt=""
          onClick={this.handlerModal}
        />
        {showModal && (
          <Modal onModalClose={this.handlerModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,

  webformatURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
