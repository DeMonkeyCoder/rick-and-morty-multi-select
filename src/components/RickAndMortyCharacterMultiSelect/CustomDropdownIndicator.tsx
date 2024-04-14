import React, { useState } from 'react';
import { components, DropdownIndicatorProps, GroupBase } from 'react-select';

import { RickAndMortyCharacter } from './types';

export const CustomDropdownIndicator = (
  props: DropdownIndicatorProps<
    RickAndMortyCharacter,
    boolean,
    GroupBase<RickAndMortyCharacter>
  >,
) => {
  const [isHovered, setIsHovered] = useState(false);
  const fillColor = props.isFocused
    ? '#475569'
    : isHovered
    ? '#94a3b8'
    : '#CBD5E1';
  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        fill={fillColor}
        style={{ transition: 'fill 0.2s ease' }}
      >
        <path d="M 3,7 Q 3,6 4,6 L 16,6 Q 17,6 17,7 L 10,15 Q 9,15 10,15 Z" />
      </svg>
    </components.DropdownIndicator>
  );
};
