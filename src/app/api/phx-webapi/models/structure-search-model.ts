/* tslint:disable */
import { CompoundMatchModel } from './compound-match-model';
export interface StructureSearchModel {
  CompoundList?: null | Array<CompoundMatchModel>;
  Phase?: null | Array<string>;
  SeparationMode?: null | Array<string>;
  Technique?: null | Array<string>;
  Total?: number;
}
