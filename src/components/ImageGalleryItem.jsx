import React from 'react';

const ImageGalleryItem = ({ image, onClickModal }) => {
    const { id, tags, webformatURL, largeImageURL } = image;
  
    return (
      <li key={id} className="galleryItem">
        <img
          className="galleryItemImage"
          src={webformatURL}
          alt={tags}
          onClick={() => {
            onClickModal(largeImageURL, tags);
          }}
        />
      </li>
    );
  };
export default ImageGalleryItem;