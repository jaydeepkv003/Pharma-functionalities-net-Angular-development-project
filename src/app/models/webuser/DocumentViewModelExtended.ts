import { DocumentViewModel } from '../../api/phr-webapi/models';
import { Field } from '@sitecore-jss/sitecore-jss-angular';

export interface DocumentViewModelExtended extends DocumentViewModel {
    PdfURL?: String;
    url?: string;
    title?: Field;
}
