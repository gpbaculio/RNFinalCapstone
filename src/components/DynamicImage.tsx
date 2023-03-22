import {Image, ImageProps} from 'react-native';
import {
  createBox,
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';

import {Theme} from 'restyleTheme';

const BoxImage = createBox<Theme, ImageProps>(Image);

const DynamicFastImage = createRestyleComponent<
  VariantProps<Theme, 'imageVariants'> & React.ComponentProps<typeof BoxImage>,
  Theme
>([createVariant({themeKey: 'imageVariants'})], BoxImage);

export default DynamicFastImage;
