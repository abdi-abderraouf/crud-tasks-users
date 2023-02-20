import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from '../../lang.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  lang:any


  constructor(private translate: TranslateService,
    private langService: LangService,
    private router:Router) {
    this.lang=this.translate.currentLang;
   }

  ngOnInit(): void {
    this.lang=this.translate.defaultLang;
    // subscribe to the lang$ observable in the LangService to get updates on the active language
    this.langService.lang$.subscribe(lang => {
      this.lang = lang;

    });
    }
  changeLang(key:string):void {
    switch(key) {
        case 'en':
            this.translate.use('en');
            break;
        case 'fr':
            this.translate.use('fr');
            break;
        case 'ar':
            this.translate.use('ar');
            break;
        default:
            break;
    }
    this.lang = key;
    localStorage.setItem('language', key);
   //window.location.reload();
   this.langService.changeLang(key)
  }

  logout(){
    this.router.navigate([''])
    console.log('logout fonctionne')
    localStorage.removeItem('token')

  }

}


  /*changeLanguage(){
    if(this.lang=='en'){
    localStorage.setItem('language','ar')
  }
  else{
    localStorage.setItem('language','en')
  }
  window.location.reload()
  } c etait faite pour deux langues seulement*/


/*  import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private translate: TranslateService, private langService: LangService) { }

  ngOnInit(): void {
    // subscribe to the lang$ observable in the LangService to get updates on the active language
    this.langService.lang$.subscribe(lang => {
      this.translate.use(lang);
    });
  }

  changeLang(lang: string) {
    this.langService.changeLang(lang);
  }

}
  */
