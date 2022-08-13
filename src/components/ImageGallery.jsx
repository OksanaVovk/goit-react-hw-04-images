import fetchImages from 'fetchImages';
import Loader from './Loader';
import Button from './Button';
import ImageGalleryItem from './ImageGalleryItem';
import { useState } from 'react';
import { useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function ImageGallery({ onImgClick, searchWord }) {
  const [totalHits, setTotalHits] = useState(null);
  const [hits, setHits] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setHits([]);
    setPage(1);
  }, [searchWord]);

  useEffect(() => {
    if (!searchWord) {
      return;
    } else {
      fetchImages(searchWord, page)
        .then(data => {
          setHits(prevState => [...prevState, ...data.hits]);
          setTotalHits(data.totalHits);
          setStatus('resolved');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }
  }, [searchWord, page]);

  const onLoadButtonClick = () => {
    setPage(prevState => prevState + 1);
  };

  if (totalHits === 0) {
    return Notify.info(`The image ${searchWord} didn't find`);
  }
  if (hits.length > 0) {
    return (
      <>
        <ul className="gallery">
          {hits.map(image => (
            <ImageGalleryItem
              onImgCl={onImgClick}
              id={image.id}
              large={image.largeImageURL}
              small={image.webformatURL}
            />
          ))}
        </ul>
        {status === 'pending' && <Loader />}
        {totalHits > 12 && totalHits > hits.length && (
          <Button loadMoreClick={() => onLoadButtonClick()} />
        )}
      </>
    );
  }
  if (status === 'rejected') {
    return Notify.info({ error });
  }
}
