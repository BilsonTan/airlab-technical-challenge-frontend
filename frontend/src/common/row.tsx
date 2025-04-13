import React from 'react';

interface RowProps {
  children: React.ReactNode;
  sx?: React.CSSProperties;
  className?: string;
}

export const Row = (props: RowProps) => {
  const { children, sx, className } = props;
  return (
    <div
      className={className}
      data-testid={`${className || 'common'}-row`}
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        ...sx,
      }}
    >
      {children}
    </div>
  );
};
