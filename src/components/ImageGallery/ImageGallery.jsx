import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={css.gallery}>
      {images.map((image) => (
        <li key={image.id} className={css.item}>
          <ImageCard image={image} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
