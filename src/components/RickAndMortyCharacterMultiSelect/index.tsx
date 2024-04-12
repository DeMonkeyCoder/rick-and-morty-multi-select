import axios from 'axios';
import { CustomDropdownIndicator } from 'components/RickAndMortyCharacterMultiSelect/CustomDropdownIndicator';
import { CustomMultiValueRemove } from 'components/RickAndMortyCharacterMultiSelect/CustomMultiValueRemove';
import { HighlightTextMatch } from 'components/RickAndMortyCharacterMultiSelect/HighlightTextMatch';
import React, { useState } from 'react';
import { components, GroupBase, OptionProps } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';
import {
  RickAndMortyApiResponse,
  RickAndMortyAsyncPaginateProps,
  RickAndMortyCharacter,
} from 'types';

// Style constants
const colors = {
  primary: '#94a3b8',
  secondary: '#dcdcdc',
  tertiary: '#e2e8f0',
  hoverPrimary: '#8392a7',
  scrollbarThumb: '#c1c1c1',
  scrollbarThumbHover: '#888',
  scrollbarBackground: '#fafafa',
  multiValueBg: '#e2e8f0',
  multiValueText: '#000',
  optionSelected: '#DEEBFF',
  optionActive: '#B2D4FF',
};

const borderRadius = '14px';
const fontSize = '16px';
const padding = '2px';
const scrollbarWidth = '18px';

// Custom styles using the constants
const customStyles: RickAndMortyAsyncPaginateProps['styles'] = {
  input: (provided) => ({
    ...provided,
    fontSize,
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: state.hasValue ? padding : provided.padding,
  }),
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused
      ? `1px solid ${colors.primary}`
      : `1px solid ${colors.secondary}`,
    boxShadow: state.isFocused
      ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)`
      : '',
    borderRadius,
    padding,
    '&:hover': {
      border: `1px solid ${colors.primary}`,
    },
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: '12px',
    border: `1px solid ${colors.primary}`,
    boxShadow: 'none',
    borderRadius,
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '450px',
    '::-webkit-scrollbar': {
      width: scrollbarWidth,
    },
    '::-webkit-scrollbar-track': {
      background: colors.scrollbarBackground,
      borderRadius: '0px',
    },
    '::-webkit-scrollbar-thumb': {
      background: colors.scrollbarThumb,
      borderRadius,
      border: `4px solid ${colors.scrollbarBackground}`,
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: colors.scrollbarThumbHover,
    },
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: colors.multiValueBg,
    borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '4px',
    padding: `6px 9px`,
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    fontSize,
    color: colors.multiValueText,
    paddingRight: '6px',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    backgroundColor: colors.primary,
    color: 'white',
    cursor: 'pointer',
    borderRadius: '6px',
    ':hover': {
      backgroundColor: colors.hoverPrimary,
      color: 'white',
    },
    padding: '6px',
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: `12px 6px`,
    borderBottom: `1px solid ${colors.primary}`,
    backgroundColor: state.isSelected
      ? state.isFocused
        ? colors.optionSelected
        : 'transparent'
      : provided.backgroundColor,
    color: state.isSelected ? 'black' : provided.color,
    ':active': {
      ...provided[':active'],
      backgroundColor: state.isSelected
        ? colors.optionActive
        : provided[':active']?.backgroundColor,
    },
  }),
};

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
        <div style={{ textAlign: 'left' }}>
          <span style={{ color: '#475569', fontWeight: 600 }}>
            <HighlightTextMatch
              text={data.name}
              query={inputValue}
              defaultStyle={{ fontWeight: 600 }}
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
      styles={customStyles}
      {...props}
    />
  );
};

export default RickAndMortyCharacterMultiSelect;
