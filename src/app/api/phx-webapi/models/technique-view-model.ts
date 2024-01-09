/* tslint:disable */
import { TechniqueCodeViewModel } from './technique-code-view-model';
export interface TechniqueViewModel {
  CodeCategory?: null | string;
  Codes?: null | Array<TechniqueCodeViewModel>;
  Order?: number;
}
