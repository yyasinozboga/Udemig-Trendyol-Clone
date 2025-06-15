import {IProduct} from './products';

export interface ICart {
  product: IProduct;
  amount: number;
}
