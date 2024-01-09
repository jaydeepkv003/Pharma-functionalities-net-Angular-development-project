import { CreateOrderParams, DeliveryTimeViewModel, WebUserViewModel } from '../../api/phr-webapi/models';
import { BillToAddressRequestParamsExtended } from './BillToAddressModelExtended';
import { ShipToAddressRequestParamsExtended } from './ShipToAddressModelExtended';

export interface CreateOrderParamsExtended extends CreateOrderParams {
    BillTo?: BillToAddressRequestParamsExtended;
    ShipTo?: ShipToAddressRequestParamsExtended;
    DeliveryTimeViewModel?: DeliveryTimeViewModel;
    WebUser?: WebUserViewModel;
}
