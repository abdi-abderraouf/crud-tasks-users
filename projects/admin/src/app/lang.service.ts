import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  private langSubject = new Subject<string>();
  lang$ = this.langSubject.asObservable();
  currentLang: string;

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.getDefaultLang();
   }

  changeLang(lang: string): void {
    this.translate.use(lang);
    this.currentLang = lang;
    this.langSubject.next(lang);
    
  }
}
