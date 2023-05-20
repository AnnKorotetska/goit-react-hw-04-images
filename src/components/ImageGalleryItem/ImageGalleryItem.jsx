import PropTypes from 'prop-types';
import { GalleryImage } from './ImageGalleryItemStyled';

function ImageGalleryItem({ webformatURL, tags, largeImageURL, onImageClick }) {
  return (
    <li
      onClick={() => {
        onImageClick({ largeImageURL, tags });
      }}
    >
      <GalleryImage src={webformatURL} alt={tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
