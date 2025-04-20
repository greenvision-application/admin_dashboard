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
    icon: 'rounded-xl',
    text: 'px-4 py-2 rounded-md text-gray-400'
  };

  return (
    <button
      className={cn(baseClasses, className, variantClasses[variant])}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
