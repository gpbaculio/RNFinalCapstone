import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createTable, getMenuItems} from './database';
import {SectionDataType} from './utils';
import {DynamicPressable, DynamicView} from 'src/components';
import {useRootNavigation} from 'src/navigation/hooks';

const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

const fetchData = async () => {
  // 1. Implement this function
  const data = await fetch(API_URL).then(response => response.json());

  // Fetch the menu from the API_URL endpoint. You can visit the API_URL in your browser to inspect the data returned
  // The category field comes as an object with a property called "title". You just need to get the title value and set it under the key "category".
  // So the server response should be slighly transformed in this function (hint: map function) to flatten out each menu item in the array,
  return [...data.menu];
};

const Home = () => {
  const [data, setData] = useState<SectionDataType[]>([]);

  useEffect(() => {
    const didMount = async () => {
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

    didMount();
  }, []);
  const nav = useRootNavigation();

  return (
    <DynamicView flex={1} variant="center">
      <DynamicPressable
        onPress={() => {
          nav.navigate('Profile');
        }}>
        <Text>Home</Text>
      </DynamicPressable>
    </DynamicView>
  );
};

export default Home;
