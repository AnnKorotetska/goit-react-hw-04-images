import React, { Component } from 'react';
import Api from './API/Api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { Loader } from './Loader/Loader';
import Button from './Button/Button';
import { AppWrapper } from './AppStyled';

export class App extends Component {
  state = {
    images: [],
    value: '',
    total: 0,
    page: 1,
    isLoading: false,
    isModalOpen: false,
    modalData: null,
  };

  componentDidUpdate(_, prevState) {
    const { value, page } = this.state;

    if (page !== prevState.page || value !== prevState.value) {
      this.setState({ isLoading: true });
      Api(value, page)
        .then(({ data }) =>
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            total: data.totalHits,
          }))
        )
        .catch(err => alert(err.message))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  handleSearchbarSubmit = value => {
    this.setState({ value, page: 1, images: [] });
  };

  setModalData = modalData => {
    this.setState({ modalData, isModalOpen: true });
  };

  changePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false, modalData: null });
  };

  render() {
    const { images, isLoading, modalData, isModalOpen, total } = this.state;
    const totalPage = total / images.length;
    return (
      <>
        <Searchbar onFormSubmit={this.handleSearchbarSubmit} />
        <AppWrapper>
          {images.length > 0 && (
            <ImageGallery images={images} onImageClick={this.setModalData} />
          )}
        </AppWrapper>
        {isLoading && <Loader />}
        {totalPage > 1 && !isLoading && images.length > 0 && (
          <Button onClick={this.changePage} />
        )}
        {isModalOpen && (
          <Modal modalData={modalData} onModalClose={this.handleModalClose} />
        )}
      </>
    );
  }
}

export default App;
