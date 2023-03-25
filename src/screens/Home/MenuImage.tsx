import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import {DynamicImage, DynamicView} from 'src/components';

type MenuImageProps = {uri: string};

const MenuImage = ({uri}: MenuImageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorOccured, setErrorOccured] = useState(false);

  return (
    <DynamicView
      ml="s"
      width={83}
      height={83}
      variant="center"
      backgroundColor="#D9D9D9">
      {!errorOccured ? (
        <DynamicImage
          onLoadStart={() => {
            setIsLoading(true);
          }}
          onLoadEnd={() => {
            setIsLoading(false);
          }}
          onError={() => {
            setErrorOccured(true);
            setIsLoading(false);
          }}
          source={{uri}}
          width="100%"
          height="100%"
          opacity={isLoading ? 0 : 1}
        />
      ) : null}
      {isLoading ? (
        <ActivityIndicator
          style={StyleSheet.absoluteFill}
          size="large"
          color="#495E57"
        />
      ) : null}
      {errorOccured ? (
        <FontAwesome name="image" size={24} color="#495E57" />
      ) : null}
    </DynamicView>
  );
};

export default MenuImage;
