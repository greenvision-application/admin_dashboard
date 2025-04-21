import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageGalleryProps } from './propTypes';

const ImageGallery = ({ images = [], plantName }: ImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className="relative mb-2 aspect-square overflow-hidden rounded-lg bg-gray-50">
        <img
          src="https://peicannabiscorp.com/wp-content/uploads/2022/08/woocommerce-placeholder-1200x1200-1-510x510.jpg"
          alt="Placeholder"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const placeholderUrl =
    'https://peicannabiscorp.com/wp-content/uploads/2022/08/woocommerce-placeholder-1200x1200-1-510x510.jpg';

  return (
    <>
      <div className="relative mb-2 aspect-square overflow-hidden rounded-lg bg-gray-50">
        <img
          src={images[currentImageIndex] || placeholderUrl}
          alt={plantName}
          className="h-full w-full object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 -translate-y-1/2 transform rounded-full bg-white/70 p-2 transition-colors hover:bg-white/90"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 -translate-y-1/2 transform rounded-full bg-white/70 p-2 transition-colors hover:bg-white/90"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute right-0 bottom-2 left-0 flex justify-center gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto p-1">
          {images.map((url, index) => (
            <div
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`aspect-square w-24 flex-none cursor-pointer overflow-hidden rounded-md ${
                index === currentImageIndex ? 'ring-2 ring-green-500' : ''
              }`}
            >
              <img
                src={url || placeholderUrl}
                alt={`${plantName} ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ImageGallery;
