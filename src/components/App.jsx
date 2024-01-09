import React, { Component } from 'react';
import { requestImages } from '../api.js';
import { Searchbar } from './Searchbar';
import ImageGallery from './ImageGallery';
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
    modalData: [],
    // largeImageURL: '',
    error: null,
    isLoadMore: false,
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (page !== prevState.page || prevState.query !== query) {
      this.fetchImages(query, page);
    }
  }

  fetchImages = async (query, page) => {
    try {
      if (!this.state.query.trim()) {
        return;
      }

      this.setState({ isLoadMore: true });
      const { hits, totalHits } = await requestImages(query, page);

      if (hits.length === 0) {
        return alert('We did not find');
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        totalPages: page < Math.ceil(totalHits / 12),
        status: 'success',
        isLoadMore: false,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({
        status: 'error',
        error: error.message,
        isLoadMore: false,
      });
    } finally {
      this.setState({ isLoadMore: false });
    }
  };

  handleSubmit = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({ query: query, images: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      // isLoadMore: false,
    }));
  };

  handleOpenModal = (largeImageURL, tags) => {
    this.setState({
      modalData: { largeImageURL, tags },
      isOpenModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  render() {
    const { images, isOpenModal, isLoadMore, totalPages } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoadMore && <Loader />} {}
        <ImageGallery images={images} onClickModal={this.handleOpenModal} />
        {isOpenModal && (
          <Modal
            isOpenModal={isOpenModal}
            onCloseModal={this.handleCloseModal}
            modalData={this.state.modalData}
          />
        )}
        {/* {isLoadMore && <Button handleLoadMore={this.handleLoadMore} />} */}
        { totalPages && !isLoadMore  && images.length > 0 (
          <Button handleLoadMore={this.handleLoadMore} />
        )}

      </div>
    );
  }
}
