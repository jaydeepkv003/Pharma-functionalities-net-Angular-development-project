import { GoogleEcommerceItem } from "./google-ecommerce-item";

export class GoogleEcommerce {
  transaction_id?: any;
  value?: any;
  tax?: any;
  shipping?: any;
  coupon?: any;
  currency?: string = 'USD';
  items?: GoogleEcommerceItem[];
}
