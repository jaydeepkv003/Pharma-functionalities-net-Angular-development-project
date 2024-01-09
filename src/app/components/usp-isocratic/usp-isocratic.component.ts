import { Component, OnInit } from '@angular/core';
import { UspCalculatorService } from '../../api/phr-webapi/services';
import { SharedService } from '../../_services/shared.service';

@Component({
  selector: 'app-usp-isocratic',
  templateUrl: './usp-isocratic.component.html',
  styleUrls: ['./usp-isocratic.component.scss', '../web-tool-usp-calculator-tool/web-tool-usp-calculator-tool.component.scss']
})
export class UspIsocraticComponent implements OnInit {

  mobilePhaseMinorA: number = 45.32;
  mobilePhasePhA: number = 1;
  messageA: string = "";
  bufferConcentrationA: number = 22;
  columnTempA: number = 22;
  flowRateA: number = 0.9;
  columnLengthAF: number = 250;
  columnLengthAT: number = 250;
  columnDiameterAF: number = 4;
  columnDiameterAT: number = 4.6;
  particleSizeAF: number = 5;
  particleSizeAT: number = 5;
  injectionVolumeA: number = 25;
  uspTools: any[] = [];
  recomended: any = '';
  objectkeys = Object.keys;


  constructor(private uspService: UspCalculatorService, private sharedService: SharedService,) { }

  ngOnInit() {
    this.sharedService.startLoader();
    this.uspService.v12WebToolsUspCalculatorUspToolGet().subscribe((results: any) => {
      this.uspTools = results;
      this.sharedService.stopLoader();
    }, (error: any) => {
      this.sharedService.stopLoader();
    })
  }


  checkModel() {
    console.log(this.recomended)
  }

  mobilePhaseMinorAF() {
    let num = this.mobilePhaseMinorA;
    if (num !== null) {
      let b2: any = num.toString();
      b2 = parseFloat(b2.replace(',', '.').replace(' ', ''));
      if ((b2 * 0.7) > (b2 - 10)) {
        return (b2 * 0.7);
      }
      else {
        return (b2 - 10);
      }
    }
    else {
      return NaN;
    }
  }

  mobilePhaseMinorAT() {
    let num = this.mobilePhaseMinorA;
    if (num !== null) {
      let b2: any = num.toString();
      b2 = parseFloat(b2.replace(',', '.').replace(' ', ''));
      if ((b2 * 1.3) < (b2 + 10)) {
        return (b2 * 1.3);
      }
      else {
        return (b2 + 10);
      }
    }
    else {
      return NaN;
    }
  }


  mobilePhaseMinorAV() {
    let num = this.mobilePhaseMinorA;
    if (num === null) {
      return "Please enter a value <=50%";
    }
    else if (num > 50) {
      return "Please enter a value less than or equal to 50.";
    }
    else {
      return "";
    }
  }



  //ph
  mobilePhasePhAF() {
    let b3: any = this.mobilePhasePhA !== null ? this.mobilePhasePhA.toString() : '';
    b3 = parseFloat(b3.replace(',', '.').replace(' ', ''));
    return (b3 - 0.2);
  }

  mobilePhasePhAT() {
    let b3: any = this.mobilePhasePhA !== null ? this.mobilePhasePhA.toString() : '';
    b3 = parseFloat(b3.replace(',', '.').replace(' ', ''));
    return (b3 + 0.2);
  }


  mobilePhasePhAV() {
    let num = this.mobilePhasePhA;
    if (num === null) {
      return "Please enter a value";
    }
    else if (num > 14 && num != 0) {
      return "Please enter a value less than or equal to 14.";
    }
    else if (num == 0) {
      return "Please enter a value greater than or equal to 1."
    }
    else {
      return "";
    }
  }



  //Buffer concentration (mM)
  bufferConcentrationAF() {
    let b4: any = this.bufferConcentrationA !== null ? this.bufferConcentrationA.toString() : '';
    b4 = parseFloat(b4.replace(',', '.').replace(' ', ''));
    return (b4 * 0.9);
  }

  bufferConcentrationAT() {
    let b4: any = this.bufferConcentrationA !== null ? this.bufferConcentrationA.toString() : '';
    b4 = parseFloat(b4.replace(',', '.').replace(' ', ''));
    return (b4 * 1.1);
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


  //Column Temperature (°C)
  columnTempAF() {
    let b5: any = this.columnTempA !== null ? this.columnTempA.toString() : '';
    b5 = parseFloat(b5.replace(',', '.').replace(' ', ''));
    return (b5 - 10);
  }

  columnTempAT() {
    let b5: any = this.columnTempA !== null ? this.columnTempA.toString() : '';
    b5 = parseFloat(b5.replace(',', '.').replace(' ', ''));
    return (b5 + 10);
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

  //Flow rate (mL/min)
  flowRateAF() {
    let b6: any = this.flowRateA !== null ? this.flowRateA.toString() : '';
    b6 = parseFloat(b6.replace(',', '.').replace(' ', ''));
    return (b6 * 0.5);
  }

  flowRateAT() {
    let b6: any = this.flowRateA !== null ? this.flowRateA.toString() : '';
    b6 = parseFloat(b6.replace(',', '.').replace(' ', ''));
    return (b6 * 1.5);
  }


  flowRateAV() {
    let num = this.flowRateA;
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
      return "Enter length of column in mm as per USP monograph.";
    }
    else {
      return "";
    }
  };
  columnLengthATV() {
    let num = this.columnLengthAT;
    if (num === null) {
      return "Please enter length of column in mm.";
    }
    else {
      return "";
    }
  };
  columnDiameterAFV() {
    let num = this.columnDiameterAF;
    if (num === null) {
      return "Enter diameter of column in mm as per USP monograph.";
    }
    else {
      return "";
    }
  };
  columnDiameterATV() {
    let num = this.columnDiameterAT;
    if (num === null) {
      return "Please enter diameter of column in mm.";
    }
    else {
      return "";
    }
  };
  particleSizeAFV() {
    let num = this.particleSizeAF;
    if (num === null) {
      return "Enter particle size of column in mm as per USP monograph.";
    }
    else {
      return "";
    }
  };
  particleSizeATV() {
    let num = this.particleSizeAT;
    if (num === null) {
      return "Please enter particle size of column in mm.";
    }
    else {
      return "";
    }
  };

  checkDesiredDimension() {
    this.desiredDiamesionAF();
    this.desiredDiamesionAT();
  }


  // L/Dp
  ldpAF() {
    let b10: any = this.columnLengthAF !== null ? this.columnLengthAF.toString() : '';
    let b12: any = this.particleSizeAF !== null ? this.particleSizeAF.toString() : '';
    b10 = parseFloat(b10.replace(',', '.').replace(' ', ''));
    b12 = parseFloat(b12.replace(',', '.').replace(' ', ''));

    return ((b10 / b12) * 1000)
  };

  ldpAT() {
    let d10: any = this.columnLengthAT !== null ? this.columnLengthAT.toString() : '';
    let d12: any = this.particleSizeAT !== null ? this.particleSizeAT.toString() : '';
    d10 = parseFloat(d10.replace(',', '.').replace(' ', ''));
    d12 = parseFloat(d12.replace(',', '.').replace(' ', ''));

    return ((d10 / d12) * 1000)
  };

  getDecimalValue(val: string) {
    if (val.includes('.00')) {
      return parseInt(val).toString();
    }
    else {
      return val;
    }
  }


  //Relative Flow rate suggestion
  relativeFlowRateAF() {
    let b6: any = this.flowRateA !== null ? this.flowRateA.toString() : '';
    b6 = parseFloat(b6.replace(',', '.').replace(' ', ''));
    return b6;
  };

  relativeFlowRateAT() {
    let d11: any = this.columnDiameterAT !== null ? this.columnDiameterAT.toString() : '';
    d11 = parseFloat(d11.replace(',', '.').replace(' ', ''));
    let b12: any = this.particleSizeAF !== null ? this.particleSizeAF.toString() : '';
    b12 = parseFloat(b12.replace(',', '.').replace(' ', ''));
    let b11: any = this.columnDiameterAF !== null ? this.columnDiameterAF.toString() : '';
    b11 = parseFloat(b11.replace(',', '.').replace(' ', ''));
    let d12: any = this.particleSizeAT !== null ? this.particleSizeAT.toString() : '';
    d12 = parseFloat(d12.replace(',', '.').replace(' ', ''));
    let b7: any = this.flowRateA !== null ? this.flowRateA.toString() : '';
    b7 = parseFloat(b7.replace(',', '.').replace(' ', ''));

    let a1 = Math.pow(d11, 2);
    let a2 = Math.pow(b11, 2);
    return (b7 * ((a1 * b12) / (a2 * d12)));
  };


  //The column with desired dimension
  async desiredDiamesionAF() {
    let d14: any = await this.ldpAT().toString();
    d14 = parseFloat(d14.replace(',', '.').replace(' ', ''));

    let c10: any = await this.ldpAF().toString();
    c10 = parseFloat(c10.replace(',', '.').replace(' ', ''));

    let c13: any = (c10 * 0.75);
    let c14: any = (c10 * 1.5);
    let txt: any = document.getElementById("tdDesiredDiamesionAF");
    if ((d14 > c13) && (d14 < c14)) {
      txt.style = "color: green; font-weight: bold;"
      txt.innerText = "Can be used."
      return txt;
    }
    else {
      txt.style = "color: red;font-weight: bold;"
      txt.innerText = "Is Not Recommended."
      return txt;
    }
  };

  async desiredDiamesionAT() {
    let d13: any = await this.ldpAT().toString();
    d13 = parseFloat(d13.replace(',', '.').replace(' ', ''));
    let c10: any = await this.ldpAF().toString();
    c10 = parseFloat(c10.replace(',', '.').replace(' ', ''));
    let txtAF: any = document.getElementById("tdDesiredDiamesionAF");
    let txtnAT: any = document.getElementById("tdDesiredDiamesionAT");
    if (txtAF.innerText == "Is Not Recommended.") {
      txtnAT.style = "color: red;font-weight: bold;"
      txtnAT.innerText = ((d13 - c10) / c10 * 100).toFixed(2) + "%";
    }
    else {
      txtnAT.innerText = ((d13 - c10) / c10 * 100).toFixed(2) + "%";
    }
    return txtnAT;
  };

  injectionVolumeAF() {
    let d10: any = this.columnLengthAT !== null ? this.columnLengthAT.toString() : '';
    d10 = parseFloat(d10.replace(',', '.').replace(' ', ''));
    let d11: any = this.columnDiameterAT !== null ? this.columnDiameterAT.toString() : '';
    d11 = parseFloat(d11.replace(',', '.').replace(' ', ''));
    let b10: any = this.columnLengthAF !== null ? this.columnLengthAF.toString() : '';
    b10 = parseFloat(b10.replace(',', '.').replace(' ', ''));
    let b11: any = this.columnDiameterAF !== null ? this.columnDiameterAF.toString() : '';
    b11 = parseFloat(b11.replace(',', '.').replace(' ', ''));
    let b20: any = this.injectionVolumeA !== null ? this.injectionVolumeA.toString() : '';
    b20 = parseFloat(b20.replace(',', '.').replace(' ', ''));

    let d19 = ((22 / 7) * (Math.pow((d11 / 2), 2) * d10)) / 1000;
    let b19 = ((22 / 7) * (Math.pow((b11 / 2), 2) * b10)) / 1000;

    return Math.round((b20 * d19) / b19);
  };


  injectionVolumeAV() {
    let num = this.injectionVolumeA;
    if (num === null) {
      return "Please enter a value.";
    }
    else {
      return "";
    }
  };

}
