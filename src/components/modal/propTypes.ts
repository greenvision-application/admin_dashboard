import { ReactNode } from 'react';

export type ModalSizeType = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export const enum ModalSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  full = 'full'
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: ModalSizeType;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  preventBodyScroll?: boolean;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  footer?: ReactNode;
  closeOnEsc?: boolean;
  showOverlay?: boolean;
}
