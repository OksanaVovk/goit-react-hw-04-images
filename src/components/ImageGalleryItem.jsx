const ImageGalleryItem = ({ id, large, small, onImgCl }) => (
  <li key={id} className="gallery-item" onClick={() => onImgCl(large)}>
    <img src={small} alt={large} className="gallery-img" />
  </li>
);

export default ImageGalleryItem;
