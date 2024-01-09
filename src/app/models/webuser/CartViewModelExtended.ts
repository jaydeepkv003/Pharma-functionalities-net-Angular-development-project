import { CartViewModel } from '../../api/phr-webapi/models';
import { CartDetailViewModelExtended } from './CartDetailViewModelExtended';

export interface CartViewModelExtended extends CartViewModel {
  Parts?: null | Array<CartDetailViewModelExtended>;
}
