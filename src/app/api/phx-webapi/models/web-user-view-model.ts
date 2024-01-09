/* tslint:disable */
import { OptInViewModel } from './opt-in-view-model';
export interface WebUserViewModel {
  City?: null | string;
  Company?: null | string;
  CompanyAddress?: null | string;
  CompanyAddress2?: null | string;
  CountryID?: number;
  Email?: null | string;
  FirstName?: null | string;
  IndustryID?: null | number;
  LastName?: null | string;
  MobilePhone?: null | string;
  OptIns?: OptInViewModel;
  SalutationID?: number;
  State?: null | string;
  TechniqueCodeIDs?: null | Array<number>;
  WorkPhone?: null | string;
  ZipCode?: null | string;
}
