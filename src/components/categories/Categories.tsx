import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import React from 'react';
import {Colors} from '../../theme/colors';
import {
  setCategory,
  useGetCategories,
  useSelectedCategory,
} from '../../service/categories';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  RootNativeStackParamList,
  RootTabNavigatorParamList,
  screens,
} from '../../constants/screens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {UseMutateFunction} from '@tanstack/react-query';

type HomeScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabNavigatorParamList, 'home'>,
  NativeStackNavigationProp<RootNativeStackParamList, 'products'>
>;

type CategoryProps = {
  item: string;
  navigation: HomeScreenProps;
  mutate: UseMutateFunction<string, Error, string, unknown>;
  category: string;
};

const Categories = () => {
  const {data, error, isPending} = useGetCategories();
  const navigation = useNavigation<HomeScreenProps>();
  const {mutate} = setCategory();
  const {data: category} = useSelectedCategory();

  return (
    <View>
      {isPending ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error!</Text>
      ) : (
        data && (
          <FlatList
            data={data}
            renderItem={({item}) => (
              <Category
                item={item}
                navigation={navigation}
                mutate={mutate}
                category={category as unknown as string}
              />
            )}
            horizontal
            contentContainerStyle={styles.categories}
            showsHorizontalScrollIndicator={false}
          />
        )
      )}
    </View>
  );
};

const Category: React.FC<CategoryProps> = ({
  item,
  navigation,
  category,
  mutate,
}) => {
  const handlePress = () => {
    mutate(item);
    navigation.navigate(screens.products);
  };

  const bgColor = category === item && styles.selected;
  const color = category === item && styles.selectedText;

  return (
    <Pressable style={[styles.category, bgColor]} onPress={handlePress}>
      <Text style={[styles.text, color]}>{item}</Text>
    </Pressable>
  );
};

export default Categories;

const styles = StyleSheet.create({
  category: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 50,
  },

  categories: {
    gap: 10,
    paddingBottom: 10,
  },

  text: {
    textAlign: 'center',
  },

  selected: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
  },

  selectedText: {
    color: 'white',
  },
});
