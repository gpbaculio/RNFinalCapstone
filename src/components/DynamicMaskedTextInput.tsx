import React from 'react';
import {TextInputProps} from 'react-native';

import {
  createBox,
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';
import {MaskedTextInput} from 'react-native-mask-text';
import {MaskedTextInputProps} from 'react-native-mask-text/lib/typescript/src/components/MaskedTextInput';

import {Theme} from 'restyleTheme';
import DynamicText from './DynamicText';

const BoxMaskedTextInput = createBox<
  Theme,
  TextInputProps &
    MaskedTextInputProps &
    React.ComponentProps<typeof DynamicText>
>(MaskedTextInput);

const DynamicMaskedTextInput = createRestyleComponent<
  VariantProps<Theme, 'textVariants'> &
    React.ComponentProps<typeof BoxMaskedTextInput>,
  Theme
>([createVariant({themeKey: 'textVariants'})], BoxMaskedTextInput);

export default DynamicMaskedTextInput;
