import { CartViewModelPartDetail } from '../../api/phr-webapi/models';

export interface CartDetailViewModelExtended extends CartViewModelPartDetail {
  showAllParts?: boolean;
}
