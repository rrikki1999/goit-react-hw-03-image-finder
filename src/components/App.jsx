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
      const images = await requestImages();
      console.log("images:", images); 
      this.setState({images});
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }

  
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images}/>
      </div>
    );
  }
}
