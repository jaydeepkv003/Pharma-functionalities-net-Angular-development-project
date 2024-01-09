export class FeatureModel {
  QuickOrder?: boolean;
  CQA_CofA?: boolean;
  Quotes?: boolean;
  Promotions?: boolean;
  PopupBanner?: boolean;
}

export class MessageModel {
  showAuthPopup?: boolean;
  route?: string;
  payload?: CartObjModel;
  checkForCartUpdate?: boolean;
  checkForTabScroll?: boolean;
  featureAmsLoaded?: boolean;
  topMenus?: any[];
}

export class CartObjModel {
  type: string;
  qty: number;
  partId?: number;
  otherInfo?: any;
}

export class TabYearsModel {
  heading: string
  value: string
  url: string
}

export class PaginatorModel {
  currentPage: number;
  recordsPerPage: number;
  totalRecords?: number;
  searchTerm?: string;
  defaultRecordsPerPage?: number;
  pageSizeOptions?: null | Array<number>;
}
