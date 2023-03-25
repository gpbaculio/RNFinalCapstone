import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, FlatList, ListRenderItem} from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import {
  DynamicImage,
  DynamicText,
  DynamicTextInput,
  DynamicView,
} from 'src/components';
import MenuItem from './MenuItem';

import {createTable, getMenuItems, saveMenuItems} from './database';

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

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [menu, setMenu] = useState<Menu[]>([]);

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

  const pills = ['Lunch', 'Mains', 'Desserts', 'A La Carte', 'Specials'];

  const renderMenuItem: ListRenderItem<Menu> | null | undefined = ({item}) => (
    <MenuItem item={item} />
  );

  const categories = menu.map(({category}) => category);
  const categoriesData = categories.filter(
    (item, pos) => categories.indexOf(item) === pos,
  );

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
              contentContainerStyle={{paddingLeft: 16}}
              data={categoriesData}
              ItemSeparatorComponent={() => <DynamicView width={10} />}
              renderItem={({item}) => (
                <DynamicView variant="orderPill">
                  <DynamicText variant="orderPill">{item}</DynamicText>
                </DynamicView>
              )}
            />
            <DynamicView paddingHorizontal="l" mt="l">
              <DynamicView height={1} backgroundColor="#D9D9D9" />
            </DynamicView>
          </DynamicView>
        </DynamicView>
      )}
      ListFooterComponent={() =>
        isLoading ? (
          <DynamicView marginVertical="xxL">
            <ActivityIndicator size="large" color="#495E57" />
          </DynamicView>
        ) : null
      }
      ItemSeparatorComponent={() => (
        <DynamicView
          height={1}
          backgroundColor="#D9D9D9"
          marginVertical="xs"
          marginHorizontal="l"
        />
      )}
      renderItem={renderMenuItem}
    />
  );
};

export default Home;
