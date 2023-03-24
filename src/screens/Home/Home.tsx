import React, {useEffect, useState} from 'react';
import {Alert, FlatList, ScrollView} from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import {DynamicImage, DynamicText, DynamicView} from 'src/components';

import {createTable, getMenuItems} from './database';
import {SectionDataType} from './utils';

import {homeImg} from 'assets';

const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

const fetchData = async () => {
  const data = await fetch(API_URL).then(response => response.json());

  return [...data.menu];
};

const menuData = [
  {
    name: 'Greek Salad',
    price: 12.99,
    description:
      'Our delicious salad is served with Feta cheese and peeled cucumber. Includes tomatoes, onions, olives, salt and oregano in the ingredients.',
    image: 'greekSalad.jpg',
  },
  {
    name: 'Bruschetta',
    price: 7.99,
    description:
      'Delicious grilled bread rubbed with garlic and topped with olive oil and salt. Our Bruschetta includes tomato and cheese.',
    image: 'bruschetta.jpg',
  },
];

const Home = () => {
  const [data, setData] = useState<SectionDataType[]>([]);

  useEffect(() => {
    const componentDidMount = async () => {
      try {
        await createTable();
        let menuItems = await getMenuItems();
        // useDevLogData(menuItems, "getMenuItems()");
        // The application only fetches the menu data once from a remote URL
        // and then stores it into a SQLite database.
        // After that, every application restart loads the menu from the database
        if (!menuItems.length) {
          menuItems = await fetchData();
        }
      } catch (e) {
        // Handle error
        Alert.alert((e as Error).message);
      }
    };

    componentDidMount();
  }, []);

  const pills = ['Lunch', 'Mains', 'Desserts', 'A La Carte', 'Specials'];

  return (
    <DynamicView flex={1}>
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
            <DynamicText mt="m" fontSize={16} color="#FFFFFF" fontWeight="500">
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </DynamicText>
          </DynamicView>
          <DynamicImage ml="m" source={homeImg} width={140} height={150} />
        </DynamicView>
        <DynamicView
          mt="l"
          backgroundColor="#D9D9D9"
          padding="xxs"
          width={36}
          height={36}
          borderRadius={36}
          variant="center"
          mr="auto">
          <FontAwesome name="search" size={18} color="#333333" />
        </DynamicView>
      </DynamicView>
      <DynamicView pt="l">
        <DynamicText pl="l" mb="s" fontWeight="700" fontSize={18}>
          ORDER FOR DELIVERY
        </DynamicText>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{paddingLeft: 16}}
          data={pills}
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
      <FlatList
        data={menuData}
        contentContainerStyle={{padding: 16}}
        ItemSeparatorComponent={() => (
          <DynamicView
            height={1}
            backgroundColor="#D9D9D9"
            marginVertical="xs"
          />
        )}
        renderItem={({item}) => (
          <DynamicView>
            <DynamicText
              fontSize={18}
              mb="xxs"
              color="#000000"
              fontWeight="700">
              {item.name}
            </DynamicText>
            <DynamicView flexDirection="row">
              <DynamicView flex={1}>
                <DynamicText fontWeight="400" fontSize={16} color="#495E57">
                  {item.description}
                </DynamicText>
                <DynamicText fontWeight="500" fontSize={18} color="#495E57">
                  ${item.price}
                </DynamicText>
              </DynamicView>
              <DynamicImage
                source={{
                  uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
                }}
                ml="s"
                width={83}
                height={83}
              />
            </DynamicView>
          </DynamicView>
        )}
      />
    </DynamicView>
  );
};

export default Home;
