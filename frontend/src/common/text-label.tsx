import React from 'react';

interface TextLabelProps {
  text: string;
  sx?: React.CSSProperties;
  className?: string;
}

export const TextLabel = (props: TextLabelProps) => {
  const { text, sx, className } = props;
  return (
    <div
      className={className}
      data-testid={`${text}-label`}
      style={{
        ...sx,
      }}
    >
      {text}
    </div>
  );
};
