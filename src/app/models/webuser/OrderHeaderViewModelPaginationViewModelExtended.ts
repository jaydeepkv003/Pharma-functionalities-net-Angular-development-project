import { OrderHeaderViewModelExtended } from "./OrderHeaderViewModelExtended";

export interface OrderHeaderViewModelPaginationViewModelExtended {
    Count?: number;
    Limit?: number;
    Offset?: number;
    Results?: null | Array<OrderHeaderViewModelExtended>;
}