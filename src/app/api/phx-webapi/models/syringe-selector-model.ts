/* tslint:disable */
import { VialSelectorTotalVolumeModel } from './vial-selector-total-volume-model';
export interface SyringeSelectorModel {
  Answers?: null | Array<string>;
  Format?: null | string;
  OptionExtraText?: null | Array<string>;
  OptionImages?: null | Array<string>;
  OptionNames?: null | Array<string>;
  Options?: null | Array<string>;
  QuestionDisplay?: null | string;
  QuestionText?: null | string;
  Questions?: null | Array<string>;
  SeptumTypes?: null | Array<string>;
  TotalVolume?: null | Array<string>;
  TotalVolumes?: null | Array<VialSelectorTotalVolumeModel>;
}
