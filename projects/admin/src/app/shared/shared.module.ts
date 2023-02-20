import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forChild({extend:true})//pour passer translation vers tous 
  ],
  exports:[
    TranslateModule
  ]
})
export class SharedModule { }
