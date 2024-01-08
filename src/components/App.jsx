import React, { Component } from 'react';
import {requestImages} from '../api.js';
import { Searchbar } from './Searchbar';
import ImageGallery from './ImageGallery'
import { Button } from './Button.jsx';
import { Loader } from './Loader.jsx';
import { Modal } from './Modal.jsx';

export default class App extends Component {
  state = {
    query: '',
    status: 'idle',
    page: 1,
    images: [],
    totalPages: null,
    isOpenModal: false,
    largeImageURL: '',
    error: null,
    loading: false,
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (page !== prevState.page || prevState.query !== query) {
      this.fetchImages();
    }
  }
  
  fetchImages = async () => {
    try {
      if (!this.state.query.trim()) {
        return;
      }
  
      this.setState({ loading: true });
      const response = await requestImages();
      const hits = response.hits;
      
  
      // Фільтруємо тільки елементи з імеджами
      const imagesWithUrls = hits.filter(item => item.type === 'photo' && item.previewURL);
  
      this.setState({
        images: imagesWithUrls,
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

  handleOpenModal = (largeImageURl, tags) => {
    this.setState({
      modalData: { largeImageURl, tags },
      isOpenModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  render() {
    const { images, totalPages, page, loading,isOpenModal } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {loading && <Loader />} {}
        <ImageGallery images={images} 
        onClickModal={this.handleOpenModal}/>
        {!loading && (
          
          images.length > 0 && page < totalPages && <Button handleLoadMore={this.handleLoadMore} />
        )}
         {isOpenModal && (
          <Modal
            isOpenModal={isOpenModal}
            onCloseModal={this.handleCloseModal}
            modalData={this.state.modalData}
          />
        )}
      </div>
    );
  }
}
