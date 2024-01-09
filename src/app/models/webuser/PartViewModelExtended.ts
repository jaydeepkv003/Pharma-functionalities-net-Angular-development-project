import { PartViewModel } from '../../api/phr-webapi/models';

export interface PartViewModelExtended extends PartViewModel {
    AddedToCart?: null | boolean;
    Quantity?: null | number;
}
