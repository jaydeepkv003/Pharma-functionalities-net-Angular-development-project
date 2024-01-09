import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CertificateRequestParams } from '../../api/phr-webapi/models/certificate-request-params';
import { WebUserService } from '../../api/phr-webapi/services/web-user.service';
import { CqaRequestError, CqaService, ErrorCode } from '../../_services/cqa.service';
import { SharedService } from '../../_services/shared.service';
import { DashboardCqaAccessModalComponent } from './../dashboard-cqa-access-modal/dashboard-cqa-access-modal.component';

@Component({
  selector: 'app-dashboard-cqa-form',
  templateUrl: './dashboard-cqa-form.component.html',
  styleUrls: ['./dashboard-cqa-form.component.scss']
})
export class DashboardCqaFormComponent implements OnInit {
  @Input() type: string;
  cqaForm: FormGroup;
  parts: FormArray;
  submitted = false;
  userEmail: string;
  alreadyExist: number[] = [];
  wrongPart: number[] = [];
  wrongPointer: number[] = [];

  constructor(
    private fb: FormBuilder,
    private cqaService: CqaService,
    private sharedService: SharedService,
    private modalService: NgbModal,
    private webUserService: WebUserService
  ) { }

  ngOnInit() {
    this.createForm();
    this.getUserEmail();
  }

  createForm() {
    this.cqaForm = this.fb.group({
      parts: this.fb.array([this.createItem()])
    });
  }

  // convenience getter for easy access to form fields
  get partsForm() { return (<FormArray>this.cqaForm.get('parts')).controls; }

  resetForm(formDirective: FormGroupDirective) {
    this.cqaForm.reset();
    this.parts = null;
    this.createForm();
    formDirective.resetForm();
    this.submitted = false;
  }

  createItem() {
    return this.fb.group({
      PartNumber: ['', Validators.required],
      Pointer: ['', Validators.required]
    });
  }

  addItem() {
    this.parts = this.cqaForm.get('parts') as FormArray;
    if (this.parts.length < 6) {
      this.parts.push(this.createItem());
      this.submitted = false;
    }
  }

  removeItem(index: number) {
    this.parts = this.cqaForm.get('parts') as FormArray;
    this.parts.removeAt(index);
    this.submitted = false;
  }

  getUserEmail() {
    this.webUserService.v12WebUserGet().subscribe((res) => {
      this.userEmail = res.Email;
    });
  }

  public async onSubmit(formDirective: FormGroupDirective) {
    const form = this.cqaForm.value;
    if (form.parts.length > 1) {
      const emptyCard: number[] = [];
      form.parts.forEach((item, index) => {
        if (item.PartNumber === '' && item.Pointer === '') {
          emptyCard.push(index);
        }
      });
      if (emptyCard.length) {
        emptyCard.sort((a, b) => a < b ? 1 : a > b ? - 1 : 0);
        emptyCard.forEach(d => { this.removeItem(d); });
      }
    }
    this.submitted = true;
    this.resetVar();
    if (this.cqaForm.valid) {
      this.submitted = false;
      this.sharedService.startLoader();
      const data = this.cqaForm.value;
      const certificatesRequset: CertificateRequestParams[] = data.parts;
      const cqaError: CqaRequestError[] = await this.cqaService.requestCertificates(certificatesRequset);
      if (cqaError && cqaError.length) {
        this.sharedService.stopLoader();
        if (cqaError.length < certificatesRequset.length) {
          this.removeCompletedRequest(cqaError, certificatesRequset.length - 1);
          const modal = this.modalService.open(DashboardCqaAccessModalComponent, { size: 'lg' });
          modal.result.then(x => {
            this.filterError(cqaError);
            this.cqaService.getCertificateHistory(true);
          }, onreject => { }).catch();
        } else {
          this.filterError(cqaError);
        }
      } else {
        this.sharedService.stopLoader();
        this.resetForm(formDirective);
        const modal = this.modalService.open(DashboardCqaAccessModalComponent, { size: 'lg' });
        modal.result.then(x => {
          this.cqaService.getCertificateHistory(true);
        }, onreject => { }).catch();
      }
    }
  }

  removeCompletedRequest(cqaError: CqaRequestError[], size: number) {
    for (let index = size; index >= 0; index--) {
      if (!cqaError.find(d => d.formIndex === index)) {
        this.removeItem(index);
      }
    }
  }

  filterError(cqaError: CqaRequestError[]) {
    const formDate = this.cqaForm.value;
    if (formDate.parts && formDate.parts.length) {
      formDate.parts.forEach((item, index) => {
        const error = cqaError.find(d => d.partNumber === item.PartNumber && d.pointer === item.Pointer);
        if (error) {
          switch (error.errorCode) {
            case ErrorCode.AlreadyExist:
              this.alreadyExist.push(index);
              break;
            case ErrorCode.InvalidPart:
              this.wrongPart.push(index);
              break;
            case ErrorCode.InvalidPointer:
              this.wrongPointer.push(index);
              break;
            default:
              break;
          }
        }
      });
    }
  }

  resetVar() {
    this.alreadyExist = [];
    this.wrongPart = [];
    this.wrongPointer = [];
  }

}
