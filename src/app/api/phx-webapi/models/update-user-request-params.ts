/* tslint:disable */
import { OptIn } from './opt-in';
export interface UpdateUserRequestParams {
  City?: null | string;
  Company?: null | string;
  CompanyAddress?: null | string;
  CompanyAddress2?: null | string;
  CountryID?: null | number;
  Email?: null | string;
  FirstName?: null | string;
  IndustryID?: null | number;
  LastName?: null | string;
  MobilePhone?: null | string;
  OptIns?: OptIn;
  SalutationID?: null | number;
  State?: null | string;
  TechniqueCodeIDs?: null | Array<number>;
  WorkPhone?: null | string;
  ZipCode?: null | string;
}
