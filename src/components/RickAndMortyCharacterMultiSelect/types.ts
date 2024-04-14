import { GroupBase } from 'react-select';
import { AsyncPaginateProps } from 'react-select-async-paginate';

export type RickAndMortyCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};
export type RickAndMortyApiResponse = {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: RickAndMortyCharacter[];
};
export type RickAndMortyAsyncPaginateProps = AsyncPaginateProps<
  RickAndMortyCharacter,
  GroupBase<RickAndMortyCharacter>,
  {
    page: number;
  },
  boolean
>;
export type RickAndMortyCharacterMultiSelectErrorComponentProps = {
  errorMessage: string;
  retryRequest: () => void;
};
export type RickAndMortyCharacterMultiSelectProps =
  Partial<RickAndMortyAsyncPaginateProps> & {
    errorComponent?: React.FC<RickAndMortyCharacterMultiSelectErrorComponentProps>;
  };
