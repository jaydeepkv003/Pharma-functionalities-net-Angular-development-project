/* tslint:disable */
import { Applications } from './applications';
import { DocumentViewModel } from './document-view-model';
import { PartViewModel } from './part-view-model';
export interface WishListDetailViewModel {
  Application?: Applications;
  Document?: DocumentViewModel;
  Part?: PartViewModel;
  Type?: null | string;
  WishListDetailID?: number;
}
