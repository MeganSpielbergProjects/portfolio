import { useState } from 'react';
import { MediaItem } from '../types';

interface MediaCarouselProps {
  items: MediaItem[];
  projectTitle: string;
}

export function MediaCarousel({ items, projectTitle }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  const currentItem = items[currentIndex];
  const isVideo = currentItem.type === 'video';
  const isYouTube = currentItem.type === 'youtube';

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
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
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
    </div>
  );
}
