import React, { Component } from 'react';
import {requestImages} from '../api.js';
import { Searchbar } from './Searchbar';
import ImageGallery from './ImageGallery'


export default class App extends Component{
  state = {
    searchImage: '',
    status: 'idle', // "idle" | "pending" | "success" | "error"
    page: 1,
    images: [],
    totalPages: null,
    showModal: false,
    largeImageURL: '',
    error: null,
  };

  componentDidMount() {
    this.fetchImages();
  }

  fetchImages = async () => {
    try {
      const response = await requestImages();
      const hits = response.hits;
  
      this.setState({
        images: hits, 
        status: 'success',
      });
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({
        status: 'error',
        error: error.message,
      });
    }
  }
  
  handleSubmit = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({ query: query, images: [], page: 1 });
  };

  
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images}/>
      </div>
    );
  }
}
