import { CountryViewModel, BillToAddressRequestParams } from '../../api/phr-webapi/models';

export interface BillToAddressRequestParamsExtended extends BillToAddressRequestParams {
    Country?: CountryViewModel;
}
