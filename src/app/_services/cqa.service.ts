import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CertificateRequestWrapperViewModelPaginationViewModel } from '../api/phr-webapi/models/certificate-request-wrapper-view-model-pagination-view-model';
import { DOCUMENT_LIST_QUERY, MASTER_LIST_QUERY } from '../components/dashboard-cqa/dashboard-cqa.graphql';
import { FavoriteAddModalComponent } from '../components/favorite-add-modal/favorite-add-modal.component';
import { AuthService } from '../components/_core/auth.service';
import { JssGraphQLService } from '../jss-graphql.service';
import { FAVORITE_TYPE, TEMPLATE_PATH_QUERY } from '../models/constants';
import { CertificateRequestWrapperViewModelExtended, DocCollection } from '../models/webuser/CertificateRequestWrapperViewModelExtended';
import { CertificateRequestParams } from './../api/phr-webapi/models/certificate-request-params';
import { CertificateRequestService } from './../api/phr-webapi/services/certificate-request.service';
import { MessageService } from './message.service';
import { SharedService } from './shared.service';

export enum ErrorCode {
  AlreadyExist = 'CertificateRequest0001',
  InvalidPart = 'CertificateRequest0002',
  InvalidPointer = 'CertificateRequest0003'
}

@Injectable({
  providedIn: 'root'
})
export class CqaService {
  certificateHistory: CertificateRequestWrapperViewModelPaginationViewModel;
  query$: Observable<ApolloQueryResult<any>>;
  pageSize = 25;
  offset = 0;
  filterCluase: any[] = [];
  currentHostName: string = environment.sitecoreApiHost;

  constructor(
    private graphQLService: JssGraphQLService,
    private certificateRequestService: CertificateRequestService,
    private sharedService: SharedService,
    private authService: AuthService,
    private messageService: MessageService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  public getCertificateHistory(isPageReset: boolean = false) {
    if (isPageReset) {
      this.onReset();
    }
    const params: {
      Limit?: number;
      Offset?: number;
    } = {
      Limit: this.pageSize,
      Offset: this.offset
    };

    this.sharedService.startLoader();
    this.certificateRequestService.v12CertificateRequestsGet(params).subscribe(res => {
      this.sharedService.stopLoader();
      if (res.Count > 0) {
        if (this.certificateHistory && this.certificateHistory.Results.length) {
          this.certificateHistory.Results = this.certificateHistory.Results.concat(res.Results);
          this.certificateHistory.Limit = res.Limit;
          this.certificateHistory.Offset = res.Offset;
        } else {
          this.certificateHistory = res;
        }
      }
    }, err => {
      this.sharedService.stopLoader();
    });
  }

  public showMoreSimilarApplication() {
    if (this.pageSize < this.certificateHistory.Count) {
      const extendSize = (this.pageSize + 25) > this.certificateHistory.Count ? (this.certificateHistory.Count - this.pageSize) : 25;
      this.pageSize += extendSize;
      this.offset = this.pageSize - extendSize;
      this.getCertificateHistory();
    }
  }

  public getFilters(item: CertificateRequestWrapperViewModelExtended, brandId: string, techniqueId: string) {
    this.filterCluase = [
      { name: '_fullpath', value: TEMPLATE_PATH_QUERY.documentsListPath },
      { name: '_templatename', value: 'Document' },
    ];

    this.filterCluase.push({ name: 'techniquesList', value: techniqueId });
    this.filterCluase.push({ name: 'brandsList', value: brandId });

    this.query$ = this.graphQLService.query({
      query: DOCUMENT_LIST_QUERY,
      variables: {
        filter: this.filterCluase,
        keyword: '',
      },
    });

    this.query$.subscribe(res => {
      if (res.data.search.results.items && res.data.search.results.items.length) {
        let result: DocCollection[] = [];
        res.data.search.results.items.forEach(doc => {
          if (doc.item && doc.item.doclink) {
            result.push({
              id: doc.item.id,
              title: doc.item.title.value,
              description: doc.item.description.value,
              doclink: `${this.currentHostName}/jssmedia/phrjss${doc.item.doclink.url}`,
              url: doc.item.url,
              documentTypeList: doc.item.documentTypeList.targetItems.map(x => x.displayName),
              isSupportingDoc: doc.item.documentTypeList.targetItems.filter(x => x.displayName === "Supporting Docs").length > 0,
              isExpanded: false
            });
          }
        });

        result.sort((a, b) =>
          a.title > b.title ? 1 : b.title > a.title ? -1 : 0
        );

        item.PartId = item.Part.PartID,
        item.DocCollection = result.filter(x => x.isSupportingDoc);
      }
      item.IsLoaded = true;
      this.sharedService.stopLoader();
    },
      (err) => {
        item.IsLoaded = true;
        this.sharedService.stopLoader();
        console.log(err);
      }
    );
  }

  public getSupptingDocs(item: CertificateRequestWrapperViewModelExtended) {

    if (!item.DocCollection) {
      item.DocCollection = [];
    }
    if (item.DocCollection.length > 0 || !item.Part.BrandID || !item.Part.TechniqueID) {
      item.IsLoaded = true;
      return;
    }

    this.sharedService.startLoader();
    item.IsLoaded = false;

    this.query$ = this.graphQLService.query({
      query: MASTER_LIST_QUERY,
      variables: { brandID: item.Part.BrandID.toString(), techniqueID: item.Part.TechniqueID.toString() },
    });

    this.query$.subscribe(res => {
      const techniquesCollection =
        res.data.technique.results.items.filter(d => d.item !== null);
      const brandsCollection =
        res.data.brand.results.items.filter(d => d.item !== null);

      if (brandsCollection.length && techniquesCollection.length) {
        this.getFilters(item, brandsCollection[0].id.toLowerCase(), techniquesCollection[0].id.toLowerCase())
      } else {
        this.sharedService.stopLoader();
      }
    }, err => {
      this.sharedService.stopLoader();
      console.log(err);
    });
  }

  public requestCertificates(data: CertificateRequestParams[]): Promise<CqaRequestError[]> {
    return new Promise<CqaRequestError[]>(async (resolve) => {
      const requestError: CqaRequestError[] = [];
      this.certificateRequestService.v12CertificateRequestsPost({ body: data }).subscribe((res) => {
        if (res && res.length) {
          const error = res.filter(d => d.ErrorCode !== null);
          if (error && error.length) {
            data.forEach((item, index) => {
              const existOrPointerError = error.find(d => d.CertificateRequest.Pointer === item.Pointer && d.Part !== null && d.Part.PartNumber === item.PartNumber);
              if (existOrPointerError) {
                requestError.push({ errorCode: existOrPointerError.ErrorCode, formIndex: index, partNumber: item.PartNumber, pointer: item.Pointer });
              } else {
                const partError = error.find(d => d.CertificateRequest.Pointer === item.Pointer && !d.Part);
                if (partError) {
                  requestError.push({ errorCode: partError.ErrorCode, formIndex: index, partNumber: item.PartNumber, pointer: item.Pointer });
                }
              }
            });
          }
        }
        this.sharedService.stopLoader();
        resolve(requestError);

      }, err => {
        this.sharedService.stopLoader();
        resolve(requestError);
      });
    });
  }

  addToFavorite(doc: DocCollection) {
    if (!this.authService.hasValidToken()) {
      this.messageService.sendMessage({ showAuthPopup: true });
      return;
    }
    const documentData = {
      docId: doc.id,
      docDescription: doc.description,
      pdfFullUrl: doc.doclink
    };
    const modalRef = this.modalService.open(FavoriteAddModalComponent, { size: 'lg' });
    modalRef.componentInstance.modalType = FAVORITE_TYPE.DOCUMENT;
    modalRef.componentInstance.documentData = documentData;
  }

  gotoPart(partNumber: string) {
    this.router.navigate(['/part'], { queryParams: { partNo: partNumber } });
  }

  onReset(): void {
    this.certificateHistory = null;
    this.pageSize = 25;
    this.offset = 0;
    this.filterCluase = [];
  }
}

export class CqaRequestError {
  errorCode: string;
  formIndex: number;
  partNumber?: string;
  pointer?: string;
}
