import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { UsersService } from '../../../manage-users/services/users.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {


  constructor(
        @Inject(MAT_DIALOG_DATA) public data :any ,//pour obtenir data de list-task
              private fb:FormBuilder ,
              public dialog: MatDialogRef<AddTaskComponent> ,
              private dialogRef: MatDialogRef<AddTaskComponent>,
              public matDialog:MatDialog,
              private service :TasksService,
              private toastr:ToastrService,
              private spinner: NgxSpinnerService,
              private userService:UsersService)
              {dialogRef.disableClose = true;
                this.getDataFromSubject() }

              //  constructor(private dialogRef: MatDialogRef<DialogComponent>){
                //  dialogRef.disableClose = true;
                //}

  users:any = []
  newTaskForm!: FormGroup;
  fileName='';
  formValues:any; //variable pour emmagasiner les donnees de formulaire add-task
  ngOnInit(): void {
   // console.log(this.data)pour voir contenu de data qui vient de list-task
    this.createForm()


  }

  createForm(){
    this.newTaskForm=this.fb.group({
      title:[this.data?.title||'',[Validators.required,Validators.minLength(5)]],
      userId:[this.data?.userId?._id||'',Validators.required],
      image:[this.data?.image||'',Validators.required],
      description:[this.data?.description||'',Validators.required],
      //pour afficher les donner dans modal pop up lors clik sur update
      deadline:[this.data ? new Date (this.data?.deadline.split('-').reverse().join('-')).toISOString():'',Validators.required]
        // pour afficher la date avec le format demande on declare new date puis split transforme
        //date en array de petites chianes : les elements:petites chaines eloigne par -  puis reverse() renverse la date qui est array pour avoir le bon format
        //puis join fusionne les petites chaines en une seule et retourne une chiane non pas tableau - toISOString c pour respecter le format demande et commme string
    })

    this.formValues=this.newTaskForm.value//enregistrer toutes les valeurs de formulaire ds formValues
  }

  selectImage(event: any): void{
    this.fileName=event.target.value
    this.newTaskForm.get('image')?.setValue(event.target.files[0])
    // pour mettre limage ds TaskForm
 }

  createTask():void {
          this.spinner.show()
          let model = this.prepereFormData()
          //mettre ds model le return de la fn prepereFormData()

         /* let formData = new FormData()
          formData.append('title',this.newTaskForm.value['title'])
          formData.append('userId',this.newTaskForm.value['userID'])
          formData.append('image',this.newTaskForm.value['image'])
          formData.append('description',this.newTaskForm.value['description'])
          formData.append('deadline',this.newTaskForm.value['deadline'])
          console.log(formData)*/
    this.service.createTask(model).subscribe((_res:any)=>{
               //envoyer model
               this.toastr.success('creer avec success','success')
               this.spinner.hide()
               this.dialog.close(true)
    },error=>{ this.toastr.error(error.error.message);})
               this.spinner.hide()
  }


  prepereFormData(){
    let newData = moment(this.newTaskForm.value['deadline']).format('DD-MM-YYYY')
    //donner nouvelle forme a deadline : date
    // this.newTaskForm.get('deadline')?.setValue(newData)
    //mettre la nouvelle forme de deadline
    let formData = new FormData()
    Object.entries(this.newTaskForm.value).forEach(([key,value]:any)=>{
      //pour mettre a chaque key sa valeur devant elle
      //formData.append(key,value)
        //console.log(key,value)
      if (key=='deadline'){
        formData.append(key,newData)
      }
      else{
        formData.append(key,value)
      }
      //on a remplacer :this.newTaskForm.get('deadline')?.setValue(newData) par if

    })
    //entries: pour controler key value nous donne key value ds un tableau
     return formData
  }

updateTask(){
  this.spinner.show()
  let model = this.prepereFormData()
  this.service.updateTask(model,this.data._id).subscribe((_res:any)=>{
    this.toastr.warning('updated avec success','tbedlet ya bougelb')
    this.spinner.hide()
    this.dialog.close(true)
},error=>{ this.toastr.error(error.error.message);})
    this.spinner.hide()

}

   close(){
    //Object.entries(this.formValues).forEach(([key,value]:any)=>{
    //})
    //on remplace entries par keys seulement car on a besoin que de key on a pas besoin de value
    let haschanges = false
    Object.keys(this.formValues).forEach(item=>{
       if(this.formValues[item]!==this.newTaskForm.value[item]){
        //comparer les enregistrements ancien et nouveau un par un
         haschanges = true
       }
    }
    )
    if(haschanges){
      const dialogRef = this.matDialog.open(ConfirmationComponent, {
        width:'750px'
      });
      dialogRef.afterClosed().subscribe(result => {
          if(result){

            //on ajoute ca pour que tasks sajoute directement dans la liste sans rafraichir la page
          }
      });
    }
    else{
      this.dialog.close();//pour fermer fenetre de dialogue
    }
   }

  getDataFromSubject(){
    this.userService.userData.subscribe((res:any)=>{
        this.users= this.usersMapping(res.data)

    })
  }
  usersMapping(data:any[]){
         let newArray= data.map(item=>{
          return {id:item._id,
                  name:item.username
          }
         })
         return newArray
  }

}
