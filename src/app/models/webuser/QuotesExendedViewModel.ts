import { QuoteViewModel, QuoteViewModelPaginationViewModel } from "../../api/phr-webapi/models";

export interface QuoteViewModelExtended extends QuoteViewModel {
  IsExpanded?: boolean;
}

export interface QuoteViewModelPaginationViewModelExtended extends QuoteViewModelPaginationViewModel {
  Results?: null | Array<QuoteViewModelExtended>;
}
