import {useRef, useEffect, EffectCallback, DependencyList} from 'react';

export const SECTION_LIST_MOCK_DATA = [
  {
    title: 'Appetizers',
    data: [
      {
        id: '1',
        title: 'Pasta',
        price: '10',
      },
      {
        id: '3',
        title: 'Pizza',
        price: '8',
      },
    ],
  },
  {
    title: 'Salads',
    data: [
      {
        id: '2',
        title: 'Caesar',
        price: '2',
      },
      {
        id: '4',
        title: 'Greek',
        price: '3',
      },
    ],
  },
];

type CategoryType = string | {title: string};

export type DataType = {
  name: string;
  price: number;
  description: string;
  image: string;
};

export type SectionDataType = {
  title: string;
  data: {id: number; title: string; price: string}[];
};

export function useUpdateEffect(
  effect: EffectCallback,
  dependencies: DependencyList = [],
) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
