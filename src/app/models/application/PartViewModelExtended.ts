import { PartViewModel } from '../../api/phr-webapi/models';

export interface PartViewModelExtended extends PartViewModel {
    Quantity?: null | number;
}
