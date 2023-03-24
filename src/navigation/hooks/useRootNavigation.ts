import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { NativeStackNavigatorParamList } from "../Navigation";

const useRootNavigation = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<NativeStackNavigatorParamList>>();

  return navigation;
};

export default useRootNavigation;
