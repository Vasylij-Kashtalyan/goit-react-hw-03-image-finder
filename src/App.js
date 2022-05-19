import React, { Component } from "react";
import Modal from "./components/Modal";

class App extends Component {
  state = {
    showModal: false,
  };
  handlerModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;

    return (
      <div>
        <button type="button" onClick={this.handlerModal}>
          Open Modal
        </button>

        {showModal && (
          <Modal onModalClose={this.handlerModal}>
            <button type="button" onClick={this.handlerModal}>
              Close Modal
            </button>
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
