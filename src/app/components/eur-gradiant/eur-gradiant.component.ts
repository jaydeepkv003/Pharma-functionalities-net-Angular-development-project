import { Component, OnInit } from '@angular/core';
import { UspCalculatorService } from '../../api/phr-webapi/services';
import { SharedService } from '../../_services/shared.service';

@Component({
  selector: 'app-eur-gradiant',
  templateUrl: './eur-gradiant.component.html',
  styleUrls: ['./eur-gradiant.component.scss', '../web-tool-usp-calculator-tool/web-tool-usp-calculator-tool.component.scss']
})
export class EurGradiantComponent implements OnInit {
  columnTempA: number = 10;
  colLengthA: number = 150;
  ColInnerDiaA: number = 4.60;
  columnLengthAF: number = 150;
  columnLengthAT: number = 70;
  columnDiameterAF: number = 4.6;
  columnDiameterAT: number = 4;
  particleSizeAF: number = 5.00;
  pheurMonographAF: number = 0.25;
  RequirementsExist: string = '';
  selectedClass: any = '';
  PhEurToolNumber: any[] = [];
  PhEurToolDescription: any[] = [];
  objectkeys = Object.keys;

  constructor(private uspService: UspCalculatorService,private sharedService: SharedService,) { }

  ngOnInit() {
    this.sharedService.startLoader();
    this.uspService.v12WebToolsUspCalculatorPhEurToolGet().subscribe((results: any) => {
      this.PhEurToolNumber = results.PhEurToolNumber;
      this.PhEurToolDescription = results.PhEurToolDescription;
      this.sharedService.stopLoader();
    }, (error: any) => {
      this.sharedService.stopLoader();
    })
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

  ColInnerDiaAV() {
    let num = this.ColInnerDiaA;
    if (num === null) {
      return "Please enter a value";
    }
    else {
      return "";
    }
  }
  colLengthAV() {
    let num = this.colLengthA;
    if (num === null) {
      return "Please enter a value";
    }
    else {
      return "";
    }
  }
  particleSizeAFV() {
    let num = this.particleSizeAF;
    if (num === null) {
      return "Please enter a value";
    }
    else {
      return "";
    }
  }
  columnLengthAFV() {
    let num = this.columnLengthAF;
    if (num === null) {
      return "Please enter a value";
    }
    else {
      return "";
    }
  }
  columnLengthATV() {
    let num = this.columnLengthAT;
    if (num === null) {
      return "Please enter a value";
    }
    else {
      return "";
    }
  }


  columnDiameterAFV() {
    let num = this.columnDiameterAF;
    if (num === null) {
      return "Please enter a value";
    }
    else {
      return "";
    }
  }


  columnDiameterATV() {
    let num = this.columnDiameterAT;
    if (num === null) {
      return "Please enter a value";
    }
    else {
      return "";
    }
  }

  pheurMonographAFV() {
    let num = this.pheurMonographAF;
    if (num === null) {
      return "Please enter a value";
    }
    else {
      return "";
    }
  }


  checkDesiredLength() {
    this.columnLengthValidation();
  }

  checkDesiredDiameter() {
    this.columnDiameterValidation();
  }

  // column Length Validation
  columnLengthValidation() {
    let lenAF: any = this.columnLengthAF !== null ? this.columnLengthAF.toString() : '';
    let lenAT: any = this.columnLengthAT !== null ? this.columnLengthAT.toString() : '';
    lenAF = parseFloat(lenAF.replace(',', '.').replace(' ', ''));
    lenAT = parseFloat(lenAT.replace(',', '.').replace(' ', ''));
    let calField1 = lenAF * 1.7;
    let txt: any = document.getElementById("tdcolumnLengthValidation");
    if (lenAT > calField1) {
      txt.style = "color: red;font-weight: bold;"
      txt.innerText = "Ph. Eur. only allows ±70% change. Choose a value which is suggested above."
      return txt;
    }
    else {
      if ((lenAT >= (lenAF * 0.3)) && (lenAT <= (lenAF * 1.7))) {
        txt.style = "color: green; font-weight: bold;"
        txt.innerText = "Can be used."
        return txt;
      }
      else {
        txt.style = "color: red;font-weight: bold;"
        txt.innerText = "Is Not Recommended."
        return txt;
      }
    }
  };

  // column Diameter Validation
  columnDiameterValidation() {
    let diamAF: any = this.columnDiameterAF !== null ? this.columnDiameterAF.toString() : '';
    let diamAT: any = this.columnDiameterAT !== null ? this.columnDiameterAT.toString() : '';
    diamAF = parseFloat(diamAF.replace(',', '.').replace(' ', ''));
    diamAT = parseFloat(diamAT.replace(',', '.').replace(' ', ''));
    let calField1 = diamAF * 1.25;
    let txt: any = document.getElementById("tdcolumnDiameterValidation");
    if (diamAT > calField1) {
      txt.style = "color: red;font-weight: bold;"
      txt.innerText = "Ph. Eur. recommends change ±25% for column id. Choose a value which is suggested above."
      return txt;
    }
    else {
      if ((diamAT >= (diamAF * 0.75)) && (diamAT <= (diamAF * 1.25))) {
        txt.style = "color: green; font-weight: bold;"
        txt.innerText = "Can be used."
        return txt;
      }
      else {
        txt.style = "color: red;font-weight: bold;"
        txt.innerText = "Is Not Recommended."
        return txt;
      }
    }
  };

  //Column Temperature (°C)
  columnTempAF() {
    let b5: any = this.columnTempA !== null ? this.columnTempA.toString() : '';
    b5 = parseFloat(b5.replace(',', '.').replace(' ', ''));
    return (b5 - 5);
  };

  columnTempAT() {
    let b5: any = this.columnTempA !== null ? this.columnTempA.toString() : '';
    b5 = parseFloat(b5.replace(',', '.').replace(' ', ''));
    return (b5 + 5);
  };

  //Column length (mm)
  colLengthAF() {
    let b7: any = this.colLengthA !== null ? this.colLengthA.toString(): '';
    b7 = parseFloat(b7.replace(',', '.').replace(' ', ''));
    return (b7 * 0.3);
  };

  colLengthAT() {
    let b7: any = this.colLengthA !== null ? this.colLengthA.toString() : '';
    b7 = parseFloat(b7.replace(',', '.').replace(' ', ''));
    return (b7 * 1.7);
  };

  //Column Inner Diameter (mm)
  ColInnerDiaAF() {
    let b8: any = this.ColInnerDiaA !== null ? this.ColInnerDiaA.toString() : '';
    b8 = parseFloat(b8.replace(',', '.').replace(' ', ''));
    return (b8 * 0.75);
  };

  ColInnerDiaAT() {
    let b8: any = this.ColInnerDiaA !== null ? this.ColInnerDiaA.toString() : '';
    b8 = parseFloat(b8.replace(',', '.').replace(' ', ''));
    return (b8 * 1.25);
  };

  //Particle Size (µm)
  particleSizeAT() {
    let b18: any = this.particleSizeAF !== null ? this.particleSizeAF.toString() : '';
    b18 = parseFloat(b18.replace(',', '.').replace(' ', ''));
    return b18;
  };

  flowRateVelF() {
    let b16: any = this.columnLengthAF !== null ? this.columnLengthAF.toString() : '';
    b16 = parseFloat(b16.replace(',', '.').replace(' ', ''));
    let b17: any = this.columnDiameterAF !== null ? this.columnDiameterAF.toString() : '';
    b17 = parseFloat(b17.replace(',', '.').replace(' ', ''));
    let b18: any = this.particleSizeAF !== null ? this.particleSizeAF.toString() : '';
    b18 = parseFloat(b18.replace(',', '.').replace(' ', ''));
    let b20: any = this.pheurMonographAF !== null ? this.pheurMonographAF.toString() : '';
    b20 = parseFloat(b20.replace(',', '.').replace(' ', ''));
    let c16: any = this.columnLengthAT !== null ? this.columnLengthAT.toString() : '';
    c16 = parseFloat(c16.replace(',', '.').replace(' ', ''));
    let c17: any = this.columnDiameterAT !== null ? this.columnDiameterAT.toString() : '';
    c17 = parseFloat(c17.replace(',', '.').replace(' ', ''));
    return (b20 * ((c16 *(c17^2)) / (b16 *(b17^2))));
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
