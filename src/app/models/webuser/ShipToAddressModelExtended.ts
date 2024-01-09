import { CountryViewModel, ShipToAddressRequestParams } from '../../api/phr-webapi/models';

export interface ShipToAddressRequestParamsExtended extends ShipToAddressRequestParams {
    Country?: CountryViewModel;
}
