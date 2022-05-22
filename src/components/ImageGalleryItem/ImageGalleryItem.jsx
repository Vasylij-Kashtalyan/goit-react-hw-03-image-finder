import { Component } from "react";
import Modal from "../Modal"

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  }

  handlerModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  }
  render() {
    const { largeImageURL, id, webformatURL } = this.props;
    const { showModal } = this.state;

    return (
      <li id={id} className="gallery-item">
        <img
          src={webformatURL}
          alt=""
          onClick={this.handlerModal}
        />
        {showModal && <Modal onModalClose={this.handlerModal}><img src={largeImageURL} alt=""/></Modal>}
      </li>
    );
  }
}

export default ImageGalleryItem;