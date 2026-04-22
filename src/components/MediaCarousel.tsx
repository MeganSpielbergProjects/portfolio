import { useEffect, useState } from 'react';
import { MediaItem } from '../types';

interface MediaCarouselProps {
  items: MediaItem[];
  projectTitle: string;
}

export function MediaCarousel({ items, projectTitle }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  const currentItem = items[currentIndex];
  const isVideo = currentItem.type === 'video';
  const isYouTube = currentItem.type === 'youtube';
  const isPdf = currentItem.type === 'pdf';
  const isImage = !isVideo && !isYouTube && !isPdf;

  useEffect(() => {
    setIsLightboxOpen(false);
  }, [currentIndex]);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isLightboxOpen]);

  return (
    <div className="media-carousel">
      <div className="carousel-viewport" key={currentItem.src}>
        {isYouTube ? (
          <iframe
            width="100%"
            height="100%"
            src={currentItem.src}
            title={currentItem.alt}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ minHeight: '280px' }}
          />
        ) : isPdf ? (
          <iframe
            width="100%"
            height="100%"
            src={currentItem.src}
            title={currentItem.alt}
            style={{ minHeight: '280px', border: 0 }}
          />
        ) : isVideo ? (
          <video
            src={currentItem.src}
            controls
            autoPlay
            muted
            onError={(event) => {
              (event.currentTarget as HTMLVideoElement).style.display = 'none';
            }}
          />
        ) : (
          <img
            src={currentItem.src}
            alt={currentItem.alt}
            className="carousel-image-default"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
            onClick={() => setIsLightboxOpen(true)}
          />
        )}
      </div>

      <div className="carousel-controls">
        <button
          type="button"
          className="carousel-arrow carousel-arrow-prev"
          onClick={goToPrevious}
          aria-label={`Previous media for ${projectTitle}`}
          title="Previous"
        >
          ←
        </button>

        <div className="carousel-info">
          {currentItem.caption && <span className="image-caption">{currentItem.caption}</span>}
          {isImage ? (
            <button
              type="button"
              className="carousel-zoom-toggle"
              onClick={() => setIsLightboxOpen(true)}
            >
              View large
            </button>
          ) : null}
          <span className="carousel-counter">
            {currentIndex + 1} / {items.length}
          </span>
        </div>

        <button
          type="button"
          className="carousel-arrow carousel-arrow-next"
          onClick={goToNext}
          aria-label={`Next media for ${projectTitle}`}
          title="Next"
        >
          →
        </button>
      </div>

      {isImage && isLightboxOpen ? (
        <div
          className="carousel-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Large view for ${projectTitle}`}
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="carousel-lightbox-frame" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="carousel-lightbox-close"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close large image view"
            >
              Close
            </button>
            <img src={currentItem.src} alt={currentItem.alt} className="carousel-lightbox-image" />
            {currentItem.caption ? <p className="carousel-lightbox-caption">{currentItem.caption}</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
