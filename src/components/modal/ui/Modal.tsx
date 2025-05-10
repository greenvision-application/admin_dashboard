import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../../utils';
import { ModalProps } from '../propTypes';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOutsideClick = true,
  preventBodyScroll = true,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  footer,
  closeOnEsc = true,
  showOverlay = true
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsVisible(true);
      }, 10);

      if (preventBodyScroll) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      setIsVisible(false);
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);

      if (preventBodyScroll) {
        document.body.style.overflow = '';
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, preventBodyScroll]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscKey);
    }

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose, closeOnEsc]);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isAnimating) {
    return null;
  }

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-7xl min-h-9/10 m-0 rounded-none'
  };

  const modalSizeClass = sizeClasses[size];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        showOverlay ? 'bg-black/50 backdrop-blur-sm' : ''
      } transition-all duration-300 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleOutsideClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={cn(
          `relative w-full transform rounded-xl bg-white shadow-2xl transition-all duration-300 ease-out`,
          modalSizeClass,
          isVisible ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95',
          'ring-1 ring-black/5',
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div
            className={cn(
              'flex items-center justify-between border-b border-gray-100 px-6 py-4',
              headerClassName
            )}
          >
            {title && (
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            )}
            {showCloseButton && (
              <button
                type="button"
                className="rounded-full p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none"
                onClick={onClose}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className={cn('px-6 py-4', bodyClassName)}>{children}</div>

        {/* Footer */}
        {footer && (
          <div
            className={cn(
              'rounded-b-2xl border-t border-gray-100 bg-gray-50 px-6 py-4',
              footerClassName
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
