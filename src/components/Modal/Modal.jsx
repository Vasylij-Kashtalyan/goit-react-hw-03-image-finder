import React, { Component } from "react";
import { createPortal } from "react-dom"
import s from "./Modal.module.css"

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    componentDidMount() {
        window.addEventListener("keydown", this.onEscKeyDown);
    }
    
    componentWillUnmount() {
        window.removeEventListener("keydown", this.onEscKeyDown);
    }

    onBackdropClick = evt => {
        if (evt.currentTarget === evt.target) {
            this.props.onModalClose();
        }
    }

    onEscKeyDown = evt => {
        if (evt.code === "Escape") {
            this.props.onModalClose();
        }
    }

    render() {
        return createPortal (
            <div className={s.overlay} onClick={this.onBackdropClick}>
                <div className={s.modal}>
                    {/* <img src="" alt="" /> */}
                    <div>{this.props.children}</div>
                </div>
            </div>,
            modalRoot,
        );
    }
}

export default Modal;