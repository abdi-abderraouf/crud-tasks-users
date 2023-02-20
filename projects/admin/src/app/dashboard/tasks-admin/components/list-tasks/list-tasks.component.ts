import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ConfirmationdeleteComponent } from '../confirmationdelete/confirmationdelete.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from '../../../manage-users/services/users.service';


export interface PeriodicElement {
  title: string;
  user: string;
  deadline: string;
  status: string;
}
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  [x: string]: any;
  displayedColumns: string[] = ['position','image', 'title', 'user' ,'deadline','status', 'actions'];
  dataSource!: any[];
  tasksFilter!:FormGroup

  users:any = []
  status:any = [
    {name:this.translate.instant("tasks.Complete")},
    {name:"In-Progress"},
  ]
  page:any=1
  total:any
  userData!:any

filtration:any={
  page:this.page,
  limit:5
}// declaration objet  pour mettre dedans ttes les donnees filtres
timeOutId:any

  constructor(private service:TasksService,
    public dialog: MatDialog,
    private toastr:ToastrService,
    public matDialog:MatDialog,
    private translate:TranslateService,
    private userService:UsersService) {

      this.getDataFromSubject()

     }

  ngOnInit(): void {
    this.getUsers()
    this.getAllTasks()

  }

  changePage(event:any){
    this.page=event
    this.filtration['page']=event
    //pour filtration influence et apparait ds la pagination
    this.getAllTasks()
  }
  selectData(event:any,type:any): void {
    this.page=1
    this.filtration['page']=1
    this.filtration[type]=moment(event.value).format('DD-MM-YYYY')
    //importer date debut et date fin de html et les formater grace a moment
    if(this.filtration['toDate']&&this.filtration['fromDate']){
    this.getAllTasks();
  }
  }

 selectStatus(event:any){
    this.page=1
    this.filtration['page']=1
//pour que le filtrage commence des la page 1
    this.filtration['status']=event.value
    this.getAllTasks();
 }
  selectUser(event:any){
    this.page=1
    this.filtration['page']=1
   // console.log(event.value)
    this.filtration['userId']=event.value;
    //console.log(this.filtration.userId)
     this.getAllTasks();
  }

  search(event:any):void{
    this.page=1
    this.filtration['page']=1
    this.filtration['keyword']=event.value;
    clearTimeout(this.timeOutId)
    //pour effacer les times out precedente et laisser que la derniere
    //pour ne laisser que le dernier mot ecrit apres 2 secondes
    this.timeOutId=setTimeout(() => {
      this.getAllTasks();
    },2000);
    //seTimeout:pour afficher(declencher getAllTasks) apres 2 seconde
    }

 //mettre value de levent dans keyword qui est propriete de filtration

  getAllTasks():void {
    this.service.getAllTasks(this.filtration).subscribe((res:any)=>{
     this.dataSource = this.mapping(res.tasks)
     this.total=res.totalItems
  })
}
mapping(data:any[]){
  let newTasks = data.map((item:any)=>{
    return{
    ...item,
    user:item.userId.username
          }
//map prend element par element du tableau data et change son contenu
// ...item tous les elements ne changent pas sauf user
// sera remplacer par username car user est un objet contenant : id username email li sajjal bihom
  })
  return newTasks
}


addTask(){
  const dialogRef = this.dialog.open(AddTaskComponent, {
    width:'750px',height:'500px'
  });
  dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllTasks()
        //on ajoute ca pour que tasks sajoute directement dans la liste sans rafraichir la page
      }
  });
}

deleteTask(id:any){
  const dialogRef = this.dialog.open(ConfirmationdeleteComponent, {
      width: '250px',});

   dialogRef.afterClosed().subscribe(result => {
    if(result){
    this.service.deleteTask(id).subscribe((result:any) => {
      if(result){
       this.toastr.success('successfully deleted','deleted ya maallem');
       this.getAllTasks()
      }
   },error=>{this.toastr.error(error.error.message);})
  }
  else{
    this.getAllTasks()
  }
    });

  }




updateTask(element:any){
  const dialogRef = this.dialog.open(AddTaskComponent, {
    width:'750px',height:'500px',
    data:element
  });
  dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllTasks()
      }
  });
}

getUsers(){
  this.userService.getAllUsers()
}
getDataFromSubject(){
  this.userService.userData.subscribe((res:any)=>{
      this.users= this.usersMapping(res.data)

  })
}


usersMapping(data:any[]){
       let newArray= data?.map(item=>{
        return {id:item._id,
                name:item.username
        }
       })
       return newArray
}
}




