import Searchbar from './Searchbar';
import Modal from './Modal';
import ImageGallery from './ImageGallery';
import { useState } from 'react';

export default function App() {
  const [searchWord, setSearchWord] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imgModal, setImgModal] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFormSubmit = searchWord => {
    setSearchWord(searchWord);
  };

  const onImageClick = large => {
    setImgModal(large);
    toggleModal();
  };

  return (
    <div className="app">
      {showModal && <Modal imgForModal={imgModal} onClose={toggleModal} />}
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchWord={searchWord} onImgClick={onImageClick} />
    </div>
  );
}
