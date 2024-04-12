import React from 'react';
import { components, GroupBase, MultiValueRemoveProps } from 'react-select';
import { RickAndMortyCharacter } from 'types';

export const CustomMultiValueRemove = (
  props: MultiValueRemoveProps<
    RickAndMortyCharacter,
    boolean,
    GroupBase<RickAndMortyCharacter>
  >,
) => {
  return (
    <components.MultiValueRemove {...props}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="3" y1="3" x2="21" y2="21" stroke="white" strokeWidth="3" />
        <line x1="21" y1="3" x2="3" y2="21" stroke="white" strokeWidth="3" />
      </svg>
    </components.MultiValueRemove>
  );
};
