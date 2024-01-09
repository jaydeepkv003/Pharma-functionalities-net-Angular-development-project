import { CartViewModelPartDetail, CartViewModelPromotion } from "../../api/phr-webapi/models";

export interface CartViewModelPartDetailExtended extends CartViewModelPartDetail {
    Promotion: CartViewModelPromotion;
}
