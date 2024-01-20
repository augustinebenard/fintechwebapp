import React from 'react';
import clsx from 'clsx';
import './button.module.scss';


type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  fullWidth?: boolean;
  outline?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    { className, onClick, fullWidth, outline, loading, size, ...props },
    ref
  ) => {
    return (
      <button
        onClick={onClick}
        disabled={loading}
        className={clsx(
          'py-4 px-7 bg-secondary-500 rounded text-primary-500',
          className,
          { ['w-full']: fullWidth },
          {
            ['bg-white text-secondary-500 border border-secondary-500']:
              outline,
          },
          { ['sizeSm']: size === 'sm' },
          { ['disabled']: loading }
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export default Button;
