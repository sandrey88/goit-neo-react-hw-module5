import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1200,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    border: 'none',
    maxWidth: '90vw',
    maxHeight: '90vh',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'auto',
  },
};

const ImageModal = ({ isOpen, onClose, image }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Image Modal"
    >
      <div className={css.modalContent}>
        <img
          src={image.urls.regular}
          alt={image.alt_description}
          className={css.modalImage}
        />
        <div className={css.imageInfo}>
          <h2 className={css.author}>
            Photo by{' '}
            <a
              href={image.user.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className={css.link}
            >
              {image.user.name}
            </a>
          </h2>
          {image.description && (
            <p className={css.description}>{image.description}</p>
          )}
          <div className={css.stats}>
            <p>
              <span className={css.label}>Likes:</span> {image.likes}
            </p>
            {image.downloads && (
              <p>
                <span className={css.label}>Downloads:</span> {image.downloads}
              </p>
            )}
            {image.views && (
              <p>
                <span className={css.label}>Views:</span> {image.views}
              </p>
            )}
          </div>
          {image.location && image.location.name && (
            <p className={css.location}>
              <span className={css.label}>Location:</span> {image.location.name}
            </p>
          )}
          <div className={css.tags}>
            {image.tags && image.tags.map((tag, index) => (
              <span key={index} className={css.tag}>
                #{tag.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
