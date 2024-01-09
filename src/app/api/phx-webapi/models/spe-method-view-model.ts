/* tslint:disable */
import { SpeMethodPartDetailModel } from './spe-method-part-detail-model';
export interface SpeMethodViewModel {
  AcidicPKA?: null | string;
  Alternative?: SpeMethodPartDetailModel;
  AnalyteName?: null | string;
  BasicPKA?: null | string;
  LogP?: null | string;
  Primary?: SpeMethodPartDetailModel;
  RapidHighThroughput?: SpeMethodPartDetailModel;
  SampleMatrixId?: number;
  SampleMatrixName?: null | string;
  Units?: null | string;
  Volume?: number;
}
