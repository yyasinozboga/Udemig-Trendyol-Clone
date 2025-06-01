export const screens = {
  main: 'main',
  productDetail: 'productDetail',
  login: 'login',
  signup: 'signup',
} as const;

export const tabScreens = {
  home: 'home',
  search: 'search',
  products: 'products',
  favorites: 'favorites',
  bag: 'bag',
};

export type RootNativeStackParamList = {
  [screens.main]: undefined;
  [screens.productDetail]: {productId: string};
  [screens.login]: undefined;
  [screens.signup]: undefined;
};

export type RootTabNavigatorParamList = {
  [tabScreens.home]: undefined;
  [tabScreens.products]: undefined;
  [tabScreens.favorites]: undefined;
  [tabScreens.bag]: undefined;
  [tabScreens.search]: undefined;
};
