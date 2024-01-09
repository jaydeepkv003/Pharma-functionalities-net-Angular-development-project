import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss']
})
export class DocumentFormComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  constructor() { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('DocumentForm component initialized with component data', this.rendering);
  }

  FormSubmitOperation() {
    var txtIsFormSubmitted = (document.getElementById("isFormSubmitted")) as HTMLInputElement;
    txtIsFormSubmitted.value = "1";
    document.cookie = "isDocumentFormSubmitted=y; path=/";
    alert("Document Form Submitted successfully via cookies.");
  }

}
