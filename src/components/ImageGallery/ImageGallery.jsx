import { Component } from "react";
import {fetchPicturesWithQuery} from "../../api/Fetch.js"
import ImageGalleryItem from "../ImageGalleryItem"


class ImageGallery extends Component {
  state = {
    loading: false,
    pictures: [],
    page: 1,
    error: null,
    totalPicture: 0,
    status: "idle"
  };

  async componentDidUpdate(prevProps, prevState) {
    try {
      if (prevProps.name !== this.props.name) {
        this.setState({
          loading: true
        });

        const pictures = await fetchPicturesWithQuery(this.props.name, this.state.page);

        (pictures.data.hits.lenght !== 0) ? this.setState({
          pictures: pictures.data.hits,
          totalPicture: pictures.data.totalHits,
        }) : this.setState({ loading: false})


      } else if ((prevState.page !== this.state.page) && (this.state.page !== 1)) {
                const pictures = await fetchPicturesWithQuery(this.props.name, this.state.page);

                this.setState(prevState => ({
                    pictures: [...prevState.pictures, ...pictures.data.hits],
                    totalPicture: pictures.data.totalHits,
                    status: "resolve"
                }))
            }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  
    
    // if ((prevState.page !== this.state.page) && (this.state.page !== 1)) {

    //   Fetch(prevName)
    //     .then(res => res.data.hits)
    //     .then(pictures => this.setState([...pictures, ...pictures ]))
    // }
  }

  handelButtonMore = (ev) => {
    ev.preventDefault();
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }
  
    render() {
      const { pictures, loading } = this.state;
    
      return pictures.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <div>
          
            {loading && <p>Loading...</p>}
            {pictures &&
              <ul>
                <ImageGalleryItem key={id} largeImageURL={largeImageURL} webformatURL={webformatURL} />
              </ul >
            }
          
            {pictures && <button type="submit" onClick={this.handelButtonMore}></button>}

          </div>   
        )
      })
    }

}

export default ImageGallery;

// async componentDidUpdate(prevProps, prevState) {
//     // const prevName = prevProps.name;
//     // const nextName = this.props.name;
//     try {
//       if (prevName !== nextName) {
//         console.log('Змінилось імя', nextName);
//         this.setState({ loading: true });
//         const pictures = await api.fetchPicturesWithQuery(nextName, this.state.page);
//         this.setState({ pictures });
//       }
//     } catch (error) {
//       this.setState({ error });
//     } finally {
//       this.setState({ loading: false });
//     }
  