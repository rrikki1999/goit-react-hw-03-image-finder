import React, { Component } from 'react';
import {requestImages} from '../api.js';
import { Searchbar } from './Searchbar';
import ImageGallery from './ImageGallery'
import { Button } from './Button.jsx';
import { Loader } from './Loader.jsx';

export default class App extends Component {
  state = {
    query: '',
    status: 'idle',
    page: 1,
    images: [],
    totalPages: null,
    showModal: false,
    largeImageURL: '',
    error: null,
    loading: false,
  };

  componentDidMount() {
    this.fetchImages();
  }

  fetchImages = async () => {
    try {
      if (!this.state.query.trim()) {
        return;
      }
      
      this.setState({ loading: true });
      const response = await requestImages();
      const hits = response.hits;

      this.setState({
        images: hits,
        status: 'success',
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({
        status: 'error',
        error: error.message,
        loading: false,
      });
    }
  };

  handleSubmit = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({ query: query, images: [], page: 1 });
    this.fetchImages(); 
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.fetchImages(); 
  };

  render() {
    const { images, totalPages, page, loading } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {loading && <Loader />} {}
        <ImageGallery images={images} />
        {!loading && (
          
          images.length > 0 && page < totalPages && <Button handleLoadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
