import React, { CSSProperties } from 'react';

export const HighlightTextMatch = ({
  text,
  query,
  defaultStyle,
  highlightStyle,
}: {
  text: string;
  query: string;
  defaultStyle?: CSSProperties;
  highlightStyle?: CSSProperties;
}) => {
  if (!query) return <span style={defaultStyle}>{text}</span>;
  return (
    <>
      {text.split(new RegExp(`(${query})`, 'gi')).map((part, index) => (
        <span
          key={index}
          style={
            part.toLowerCase() === query.toLowerCase()
              ? highlightStyle
              : defaultStyle
          }
        >
          {part}
        </span>
      ))}
    </>
  );
};
