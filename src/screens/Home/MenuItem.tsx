import React from 'react';

import {DynamicText, DynamicView} from 'src/components';
import {Menu} from './Home';
import MenuImage from './MenuImage';

type MenuItemProps = {
  item: Menu;
};

const MenuItem = ({item}: MenuItemProps) => {
  const uri = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`;

  return (
    <DynamicView p="l">
      <DynamicText fontSize={18} mb="xxs" color="#000000" fontWeight="700">
        {item.name}
      </DynamicText>
      <DynamicView flexDirection="row">
        <DynamicView flex={1} justifyContent="center">
          <DynamicText fontWeight="400" fontSize={16} color="#495E57">
            {item.description}
          </DynamicText>
          <DynamicText fontWeight="500" fontSize={18} color="#495E57">
            ${item.price}
          </DynamicText>
        </DynamicView>
        <MenuImage uri={uri} />
      </DynamicView>
    </DynamicView>
  );
};

export default MenuItem;
