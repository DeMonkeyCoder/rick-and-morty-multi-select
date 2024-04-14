import axios from 'axios';
import { CustomDropdownIndicator } from 'components/RickAndMortyCharacterMultiSelect/CustomDropdownIndicator';
import { CustomMultiValueRemove } from 'components/RickAndMortyCharacterMultiSelect/CustomMultiValueRemove';
import { HighlightTextMatch } from 'components/RickAndMortyCharacterMultiSelect/HighlightTextMatch';
import styles, {
  fontSize,
} from 'components/RickAndMortyCharacterMultiSelect/styles';
import React, { useState } from 'react';
import { components, GroupBase, OptionProps } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';
import {
  RickAndMortyApiResponse,
  RickAndMortyAsyncPaginateProps,
  RickAndMortyCharacter,
} from 'types';

const RickAndMortyAsyncPaginate: React.FC<RickAndMortyAsyncPaginateProps> = (
  props,
) => {
  return <AsyncPaginate {...props} />;
};
const RickAndMortyCharacterMultiSelect = (
  props: Partial<RickAndMortyAsyncPaginateProps>,
) => {
  const [inputValue, setInputValue] = useState('');

  const loadOptions: RickAndMortyAsyncPaginateProps['loadOptions'] = async (
    searchQuery,
    loadedOptions,
    additional,
  ) => {
    const page = additional?.page || 1;
    try {
      const response = await axios.get<RickAndMortyApiResponse>(
        `https://rickandmortyapi.com/api/character/`,
        {
          params: {
            name: searchQuery,
            page,
          },
        },
      );
      return {
        options: response.data.results,
        hasMore: response.data.info.next != null,
        additional: {
          page: page + 1,
        },
      };
    } catch (e: any) {
      if (e?.response?.status === 404) {
        return {
          options: [],
          hasMore: false,
          additional,
        };
      }
      throw e;
    }
  };
  const CustomOption = (
    props: OptionProps<
      RickAndMortyCharacter,
      boolean,
      GroupBase<RickAndMortyCharacter>
    >,
  ) => {
    const { data, isSelected } = props;
    return (
      <components.Option {...props}>
        <div
          style={{
            marginRight: '10px',
            fontSize,
          }}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => null}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <img
          src={data.image}
          style={{ width: '24px', height: '24px', marginRight: '10px' }}
          alt={data.name}
        />
        <div style={{ textAlign: 'left', fontSize: '18px' }}>
          <span style={{ color: '#475569' }}>
            <HighlightTextMatch
              text={data.name}
              query={inputValue}
              defaultStyle={{ fontWeight: 500 }}
              highlightStyle={{ fontWeight: 800 }}
            />
          </span>
          <br />
          <span
            style={{ color: '#64748b' }}
          >{`${data.episode.length} Episodes`}</span>
        </div>
      </components.Option>
    );
  };

  return (
    <RickAndMortyAsyncPaginate
      isClearable={false}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      isMulti
      defaultOptions
      additional={{
        page: 1,
      }}
      getOptionValue={(option) => String(option.id)}
      getOptionLabel={(option) => option.name}
      loadOptions={loadOptions}
      onInputChange={(newValue) => setInputValue(newValue)}
      components={{
        Option: CustomOption,
        DropdownIndicator: CustomDropdownIndicator,
        MultiValueRemove: CustomMultiValueRemove,
        IndicatorSeparator: () => null,
      }}
      styles={styles}
      {...props}
    />
  );
};

export default RickAndMortyCharacterMultiSelect;
