import { TechniqueCodeViewModel, TechniqueViewModel } from '../../api/phr-webapi/models';

export interface TechniqueViewModelExtended extends TechniqueViewModel {
    Codes?: null | Array<TechniqueCodeViewModelExtended>;
    checked?: null | boolean;
    indeterminate?: null | boolean;
}

export interface TechniqueCodeViewModelExtended extends TechniqueCodeViewModel {
    checked?: null | boolean;
}
