import { ButtonProps } from '../propTypes';
import { cn } from '../../../utils';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'text',
  className = '',
  ...props
}) => {
  const baseClasses =
    'flex items-center justify-center transition-colors focus:outline-none';
  const variantClasses = {
    icon: 'h-14 w-14 rounded-xl',
    text: 'px-4 py-2 rounded-md text-gray-400'
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
