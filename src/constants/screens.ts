export const screens = {
  main: 'main',
  productDetail: 'productDetail',
  login: 'login',
  products: 'products',
  notifications: 'notifications',
} as const;

export const tabScreens = {
  home: 'home',
  search: 'search',
  profile: 'profile',
  favorites: 'favorites',
  bag: 'bag',
} as const;

export type RootNativeStackParamList = {
  [screens.main]: undefined;
  [screens.productDetail]: {productId: string};
  [screens.login]: undefined;
  [screens.products]: undefined;
  [screens.notifications]: undefined;
};

export type RootTabNavigatorParamList = {
  [tabScreens.home]: undefined;
  [tabScreens.profile]: undefined;
  [tabScreens.favorites]: undefined;
  [tabScreens.bag]: undefined;
  [tabScreens.search]: undefined;
};
