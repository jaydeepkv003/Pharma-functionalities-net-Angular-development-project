import { Component, OnInit } from '@angular/core';
import { UspCalculatorService } from '../../api/phr-webapi/services';
import { SharedService } from '../../_services/shared.service';

@Component({
  selector: 'app-usp-gradiant',
  templateUrl: './usp-gradiant.component.html',
  styleUrls: ['./usp-gradiant.component.scss', '../web-tool-usp-calculator-tool/web-tool-usp-calculator-tool.component.scss']
})
export class UspGradiantComponent implements OnInit {
  mobilePhasePhA: number = 12.00;
  bufferConcentrationA: number = 12;
  columnTempA: number = 12;
  uspTools: any[] = [];
  recomended: any = '';
  objectkeys = Object.keys;

  constructor(private uspService: UspCalculatorService,private sharedService: SharedService,) { }

  ngOnInit() {
    this.sharedService.startLoader();
    this.uspService.v12WebToolsUspCalculatorUspToolGet().subscribe((results: any) => {
      this.uspTools = results;
      this.sharedService.stopLoader();
    }, (error: any) => {
      this.sharedService.stopLoader();
    })
  }


  mobilePhasePhAV() {
    let num = this.mobilePhasePhA;
    if (num === null) {
      return "Please enter a value";
    }
    else if (num > 14 && num != 0) {
      return "Please enter a value less than or equal to 14.";
    }
    else if(num == 0) {
      return "Please enter a value greater than or equal to 1."
    }
    else {
      return "";
    }
  }

  bufferConcentrationAV() {
    let num = this.bufferConcentrationA;
    if (num === null) {
      return "Please enter a value";
    }
    else {
      return "";
    }
  }


  columnTempAV() {
    let num = this.columnTempA;
    if (num === null) {
      return "Please enter a value";
    }
    else {
      return "";
    }
  }
  // Computed observables

  //Mobile Phase pH
  mobilePhasePhAF() {
    let b3: any = this.mobilePhasePhA !== null ? this.mobilePhasePhA.toString() : '';
    b3 = parseFloat(b3.replace(',', '.').replace(' ', ''));
    return (b3 - 0.2);
  };

  mobilePhasePhAT() {
    let b3: any = this.mobilePhasePhA !== null ? this.mobilePhasePhA.toString() : '';
    b3 = parseFloat(b3.replace(',', '.').replace(' ', ''));
    return (b3 + 0.2);
  };

  //Buffer concentration (mM)
  bufferConcentrationAF() {
    let b4: any = this.bufferConcentrationA !== null ? this.bufferConcentrationA.toString() : '';
    b4 = parseFloat(b4.replace(',', '.').replace(' ', ''));
    return (b4 * 0.9);
  };

  bufferConcentrationAT() {
    let b4: any = this.bufferConcentrationA !== null ? this.bufferConcentrationA.toString() : '';
    b4 = parseFloat(b4.replace(',', '.').replace(' ', ''));
    return (b4 * 1.1);
  };

  //Column Temperature (°C)
  columnTempAF() {
    let b5: any = this.columnTempA !== null ? this.columnTempA.toString() : '';
    b5 = parseFloat(b5.replace(',', '.').replace(' ', ''));
    return (b5 - 10);
  };

  columnTempAT() {
    let b5: any = this.columnTempA !== null ? this.columnTempA.toString() : '';
    b5 = parseFloat(b5.replace(',', '.').replace(' ', ''));
    return (b5 + 10);
  };

  getDecimalValue(val: string) {
    if(val.includes('.00')) {
      return parseInt(val).toString();
    }
    else {
      return val;
    }
  }

}
