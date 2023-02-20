import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'projects/admin/src/app/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lang: any;
  language:any;

  constructor(private translate: TranslateService, private langService: LangService) {
    this.lang = localStorage.getItem('language') || translate.defaultLang;
    translate.use(this.lang);


    // subscribe to the lang$ observable in the LangService to get updates on the active language
    this.langService.lang$.subscribe((lang: any) => {
      this.lang = this.lang;
      translate.use(lang);

    });
  }





  title = 'angulartasks';
}
