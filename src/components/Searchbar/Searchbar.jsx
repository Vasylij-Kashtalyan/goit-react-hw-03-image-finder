import 'react-toastify/dist/ReactToastify.css';
import { Component } from "react";
import { ImSearch } from "react-icons/im";
import { toast } from 'react-toastify';


class Searchbar extends Component {
  state = {
    name: '',
  }

  handlerNameChanche = (evt) => {
    this.setState({ name: evt.currentTarget.value });
  }

  handlerSubmit = (evt) => {
    evt.preventDefault();

    if (this.state.name.trim() === '') {
      toast.error("Введіть імя для пошуку");
      return;
    }

    this.props.onSubmit(this.state.name);
    this.setState({ name: '' });
  }
    render() {
        return (
          <header className="searchbar">
            <form className="form" onSubmit={this.handlerSubmit}>
              <button type="submit" className="button">
                <ImSearch style={{marginRight: 8}}/>
                <span className="button-label">Search</span>
              </button>
            
              <input
                name="name"
                onChange={this.handlerNameChanche}
                value={this.state.name}
                className="input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
            </form>
          </header>
        )
    }
}

export default Searchbar;