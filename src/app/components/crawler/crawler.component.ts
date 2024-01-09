import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { SharedService } from '../../_services/shared.service';
import { SearchService } from '../../_services/search.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-crawler',
  templateUrl: './crawler.component.html',
  styleUrls: ['./crawler.component.css']
})
export class CrawlerComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  crawlForm: FormGroup;
  submitted: boolean = false;
  environments: string[] = ['dev', 'stage'];
  config = {
    dev: {
      SwiftypeApi: 'https://api.swiftype.com/api/v1/engines/{{engine_slug}}/domains/{{domain_id}}/crawl_url.json',
      DomainId: '5fba59c128ccbcbabbac5d2c',
      APIKey: '-6bDzHerqTjfgk6Zjbts',
      EngineSlug: 'web20-dev-1',
      BaseUrl: 'https://dev.phenpreview2.com'
    },
    stage: {
      SwiftypeApi: 'https://api.swiftype.com/api/v1/engines/{{engine_slug}}/domains/{{domain_id}}/crawl_url.json',
      DomainId: '5fc87eff28ccbc48606fc2d4',
      APIKey: '-6bDzHerqTjfgk6Zjbts',
      EngineSlug: 'web20-stage',
      BaseUrl: 'https://www.phenpreview2.com'
    }
  };
  urls: string = ``;
  Types = [
    { name: 'Applications', url: '/applications/single?appid=' },
    { name: 'Parts', url: '/part?partNo=' },
    { name: 'Products', url: '/products/' },
    { name: 'Webinars', url: '' },
    { name: 'Phases', url: '' }]

  constructor(private searchService: SearchService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('crawler component initialized with component data', this.rendering);
    this.crawlForm = this.formBuilder.group({
      Environment: ['dev', Validators.required],
      SwiftypeApi: ['https://api.swiftype.com/api/v1/engines/{{engine_slug}}/domains/{{domain_id}}/crawl_url.json', Validators.required],
      DomainId: ['5f61117d28ccbc835e8a9f0b', Validators.required],
      APIKey: ['x1roE5e7i5M1ecf6xiJ4', Validators.required],
      EngineSlug: ['web20-dev', Validators.required],
      Urls: [this.urls, Validators.required],
      Type: [''],
      BaseUrl: ['']
    });

    this.onEnvChange();
  }
  get f() { return this.crawlForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.crawlForm.invalid) {
      return;
    }

    let api: string = this.crawlForm.value.SwiftypeApi
      .replace('{{engine_slug}}', this.crawlForm.value.EngineSlug)
      .replace('{{domain_id}}', this.crawlForm.value.DomainId);
    let urls: string[] = this.crawlForm.value.Urls.split(',');
    for (let index = 0; index < urls.length; index++) {
      const url = urls[index].trim();

      this.searchService.putCrawl(api, {
        auth_token: this.crawlForm.value.APIKey,
        url: this.crawlForm.value.BaseUrl + this.crawlForm.value.Type + url
      }).subscribe(res => {
        this.sharedService.showSuccess(url);
        console.log('Success >>', index, url, res);
      }, err => {
        this.sharedService.showError(err);
        console.log('Error >>', index, url, err);
      });
    }
  }

  onEnvChange() {
    this.crawlForm.patchValue(this.config[this.crawlForm.value.Environment]);
  }

  search() {
    this.searchService.search({
      "engine_key": environment.babySearch.engine_key,
      "q": "luna"
    }).subscribe(res => {
      this.sharedService.showSuccess();
      console.log(res);
    }, err => {
      this.sharedService.showError(err);
      console.log(err);
    });
  }

}
