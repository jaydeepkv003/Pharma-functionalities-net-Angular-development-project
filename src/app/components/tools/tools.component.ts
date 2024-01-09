import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
})
export class ToolsComponent implements OnInit {

  @Input() rendering: ComponentRendering;
  title = 'sampleApp';
  results: any;
  link: string;

  ngOnInit() {
    this.link = "https://localhost:44333/info/page/tools";
    //this.link = "http://phendev.cloudapp.net/info/page/tools";
  }

  //Callback function to process data from window.
  @HostListener('window:message', ['$event'])
  recieveMessage = (event: MessageEvent) => {
    if (typeof event.data === "string") {
      this.results = event.data
    }
    else if (event.data.data == undefined) {
      this.results = undefined;
    }
  }

  //Send postMessage() to iframe
  myFunction() {
    var message = Math.random()
    var iframe = document.getElementById("iframeComponent")
    var iWindow = (<HTMLIFrameElement>iframe).contentWindow;
    iWindow.postMessage(message, "*")
  }

  changeLink(newLink) {
    this.results = "";
    this.link = newLink;
  }
}
