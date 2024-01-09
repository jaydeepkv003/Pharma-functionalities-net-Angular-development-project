import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard-cqa-download-zip-modal',
  templateUrl: './dashboard-cqa-download-zip-modal.component.html',
  styleUrls: ['./dashboard-cqa-download-zip-modal.component.scss']
})
export class DashboardCqaDownloadZipModalComponent implements OnInit {
  @Input() zipUrl: string;
  zipFileName: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.zipFileName = this.zipUrl.substring(this.zipUrl.lastIndexOf('/')+1);
  }

  close() {
    this.activeModal.close('closed');
  }
}
