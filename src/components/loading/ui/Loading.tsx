import React from 'react';
import { cn } from '../../../utils';
import { LoadingProps } from '../propTypes';

const sizeMap = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
  xl: 'h-12 w-12'
};

const Loading: React.FC<LoadingProps> = ({
  size = 'lg',
  className = '',
  label
}) => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div
          className={cn(
            'inline-block animate-spin rounded-full border-6 border-solid border-green-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
            sizeMap[size],
            className
          )}
          role="status"
        />
        {label && (
          <span className="animate-pulse text-sm text-green-950">{label}</span>
        )}
      </div>
    </div>
  );
};

export default Loading;
