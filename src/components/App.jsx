import { useState, useEffect } from 'react';
import Api from './API/Api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { Loader } from './Loader/Loader';
import Button from './Button/Button';
import { AppWrapper } from './AppStyled';

export const App = () => {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState('');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await Api(value, page);
        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotal(data.totalHits);
      } catch (err) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (page !== 1 || value !== '') {
      fetchData();
    }
  }, [page, value]);

  const handleSearchbarSubmit = value => {
    setValue(value);
    setPage(1);
    setImages([]);
  };

  const setIsModalData = modalData => {
    setModalData(modalData);
    setIsModalOpen(true);
  };

  const changePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const totalPage = total / images.length;

  return (
    <>
      <Searchbar onFormSubmit={handleSearchbarSubmit} />
      <AppWrapper>
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={setIsModalData} />
        )}
      </AppWrapper>
      {isLoading && <Loader />}
      {totalPage > 1 && !isLoading && images.length > 0 && (
        <Button onClick={changePage} />
      )}
      {isModalOpen && (
        <Modal modalData={modalData} onModalClose={handleModalClose} />
      )}
    </>
  );
};

export default App;
