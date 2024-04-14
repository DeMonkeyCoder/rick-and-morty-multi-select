import { RickAndMortyAsyncPaginateProps } from './types';

// Style constants
export const colors = {
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
export const borderRadius = '14px';
export const fontSize = '16px';
export const padding = '2px';
export const scrollbarWidth = '18px';

// Custom styles using the constants
const styles: RickAndMortyAsyncPaginateProps['styles'] = {
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

export default styles;
