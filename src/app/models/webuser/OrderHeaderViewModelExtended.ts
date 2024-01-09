import { OrderHeaderViewModel } from "../../api/phr-webapi/models";

export interface OrderHeaderViewModelExtended extends OrderHeaderViewModel {
    StatusDisplayName?: string;
}
