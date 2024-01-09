import { WishListDetailViewModel, WishListViewModel } from '../../api/phr-webapi/models';
import { PartViewModelExtended } from '../application/PartViewModelExtended';
import { DocumentViewModelExtended } from './DocumentViewModelExtended';

export interface WishListViewModelExtended extends WishListViewModel {
    FavoriteListDetail?: WishListDetailViewModelExtended[];
    IsExpanded?: boolean;
}


export interface WishListDetailViewModelExtended extends WishListDetailViewModel {
    Document?: DocumentViewModelExtended;
    Part?: PartViewModelExtended;
}
