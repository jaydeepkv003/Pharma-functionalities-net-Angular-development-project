import { CertificateRequestWrapperViewModel } from '../../api/phr-webapi/models';
export interface CertificateRequestWrapperViewModelExtended extends CertificateRequestWrapperViewModel {
  IsLoaded?: boolean;
  PartId?: number;
  DocCollection?: DocCollection[];
}

export class DocCollection {
  id?: string;
  title?: string;
  description?: string;
  doclink?: string;
  url?: string;
  documentTypeList?: string[];
  isSupportingDoc?: boolean;
  isExpanded?: boolean;
}
