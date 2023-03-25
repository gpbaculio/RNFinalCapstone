import React, {
  DependencyList,
  EffectCallback,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItem,
  StyleSheet,
} from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import debounce from 'lodash.debounce';

import {
  DynamicImage,
  DynamicText,
  DynamicTextInput,
  DynamicView,
} from 'src/components';
import CategoryFilter from './CategoryFilter';
import MenuItem from './MenuItem';

import {
  createTable,
  filterByQueryAndCategories,
  getMenuItems,
  saveMenuItems,
} from './database';

import {homeImg} from 'assets';

const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

const fetchData = async () => {
  const data = await fetch(API_URL).then(response => response.json());

  return [...data.menu];
};

export type Menu = {
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
};

const Separator = () => (
  <DynamicView
    height={1}
    backgroundColor="#D9D9D9"
    marginVertical="xs"
    marginHorizontal="l"
  />
);

type FooterProps = {isLoading: boolean};

const Footer = ({isLoading}: FooterProps) => {
  if (isLoading)
    return (
      <DynamicView marginVertical="xxL">
        <ActivityIndicator size="large" color="#495E57" />
      </DynamicView>
    );

  return null;
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

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [menu, setMenu] = useState<Menu[]>([]);
  const [query, setQuery] = useState('');
  const [categoriesData, setCategoriesData] = useState<string[]>([]);
  const [searchBarText, setSearchBarText] = useState('');

  useEffect(() => {
    const componentDidMount = async () => {
      try {
        setIsLoading(true);
        await createTable();
        let menuItems = await getMenuItems();

        if (!menuItems.length) {
          menuItems = await fetchData();
          saveMenuItems(menuItems);
        }
        const categories = menuItems.map(({category}) => category);
        const categoriesData = categories.filter(
          (item, pos) => categories.indexOf(item) === pos,
        );
        setCategoriesData(categoriesData);
        setMenu(menuItems);
      } catch (e) {
        // Handle error
        Alert.alert((e as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    componentDidMount();
  }, []);

  const renderMenuItem: ListRenderItem<Menu> | null | undefined = ({item}) => (
    <MenuItem item={item} />
  );

  const [filterSelections, setFilterSelections] = useState(
    categoriesData.map(() => false),
  );

  const lookup = useCallback((q: string) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text: string) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = categoriesData.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every(item => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories,
        );
        setMenu(menuItems);
      } catch (e) {
        Alert.alert((e as Error).message);
      }
    })();
  }, [filterSelections, query]);

  const handleFiltersChange = (index: number) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  const renderCategoryFilter: ListRenderItem<string> | null | undefined = ({
    item,
    index,
  }) => {
    const isSelected = filterSelections[index];
    const onFilterPress = () => {
      handleFiltersChange(index);
    };

    return (
      <CategoryFilter
        item={item}
        isSelected={isSelected}
        onFilterPress={onFilterPress}
      />
    );
  };

  return (
    <FlatList
      nestedScrollEnabled
      data={menu}
      ListHeaderComponent={() => (
        <DynamicView>
          <DynamicView p="l" backgroundColor="#495E57">
            <DynamicText fontSize={36} color="#F4CE14" fontWeight="500">
              Little Lemon
            </DynamicText>
            <DynamicView mt="xxs" flexDirection="row">
              <DynamicView pt="xL" flex={1}>
                <DynamicView position="absolute">
                  <DynamicText fontSize={24} color="#FFFFFF" fontWeight="500">
                    Chicago
                  </DynamicText>
                </DynamicView>
                <DynamicText
                  mt="m"
                  fontSize={16}
                  color="#FFFFFF"
                  fontWeight="500">
                  We are a family owned Mediterranean restaurant, focused on
                  traditional recipes served with a modern twist.
                </DynamicText>
              </DynamicView>
              <DynamicImage ml="m" source={homeImg} width={140} height={150} />
            </DynamicView>
            <DynamicView
              mt="l"
              backgroundColor="#D9D9D9"
              pl="m"
              width="100%"
              flexDirection="row"
              height={36}
              alignItems="center"
              borderRadius={36}
              mr="auto">
              <FontAwesome name="search" size={18} color="#333333" />
              <DynamicTextInput color="#333333" ml="xs" flex={1} />
            </DynamicView>
          </DynamicView>
          <DynamicView pt="l">
            <DynamicText pl="l" mb="s" fontWeight="700" fontSize={18}>
              ORDER FOR DELIVERY
            </DynamicText>
            <FlatList
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={styles.categoryContent}
              data={categoriesData}
              ItemSeparatorComponent={() => <DynamicView width={10} />}
              renderItem={renderCategoryFilter}
            />
            <DynamicView paddingHorizontal="l" mt="l">
              <DynamicView height={1} backgroundColor="#D9D9D9" />
            </DynamicView>
          </DynamicView>
        </DynamicView>
      )}
      ListFooterComponent={<Footer isLoading={isLoading} />}
      ItemSeparatorComponent={Separator}
      renderItem={renderMenuItem}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  categoryContent: {
    paddingLeft: 16,
  },
});
