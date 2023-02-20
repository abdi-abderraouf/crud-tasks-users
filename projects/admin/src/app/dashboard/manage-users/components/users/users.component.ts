import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService, userStatus } from './../../services/users.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'email' ,'tasksAssigned', 'actions'];
  dataSource:any=[]=[];
  status!:string;
  id!:string;
  total!: any;


  constructor(private service :UsersService,
              private toaster:ToastrService) {
                this.getDataFromSubject()//appel de la fn subscribe a behavior
              }
page:number=1;
totalItems!:number;

  ngOnInit(): void {
    this.getUser()
  }



changePage(event:any){
   this.page=event
   console.log('page act =',this.page)
   this.getUser()
   console.log('Model ds changepage',this.Model)
}


delete(id:string,index:number){
  if(this.dataSource[index].assignedTasks>0){
    this.toaster.error('on ne peut pas supprimer ce user')
  }
  else{
    this.service.deleteserv(id).subscribe((res:any)=>{
      this.toaster.success('user was deleted successfully')
      this.getUser()
  })
}}

changeStatus(id:string,status:string,index:number){
  if(this.dataSource[index].assignedTasks>0){
    this.toaster.error('on ne peut pas changer le statut de ce user')
  }
  else{
  const model={id:'string',
               status: 'string'
              }
  model.id=id;
  model.status=status;
  this.service.changeStatuserv(model).subscribe((res:any)=>{
    this.toaster.success('status was changed')
    this.getUser()
  })
}
}
// declaration objet  pour mettre dedans ttes les donnees filtres
timeOutId:any


Model:any={
  page:this.page,
  limit:5,
  name:''
}
model:any={
  page:this.page,
  limit:this.totalItems,
  name:''
}
search(event:any){
    this.model['page']=this.page
    this.model['name']=event.value;
    console.log('le Model ds search',this.model)
    clearTimeout(this.timeOutId)
    //pour effacer les times out precedente et laisser que la derniere
    //pour ne laisser que le dernier mot ecrit apres 2 secondes
    this.timeOutId=setTimeout(() => {
      this.getUsersearch(this.model);
    },2000);
    //seTimeout:pour afficher(declencher getAllUsers) apres 2 seconde
}
getUsersearch(model:any){
  console.log('model ds getUser ds users',model)
  this.service.getAllUsers(model)
}
getUser(){
  const Model:any={
    page:this.page,
    limit:5,
    name:''
  }
   console.log('model ds getUser ds users',Model)
   this.service.getAllUsers(Model)
}

getDataFromSubject(){
  this.service.userData.subscribe((res:any)=>{//subscribe ds behavior et listen to data
    console.log('reponse ds getDataFromSubject appele ds constructer',res)
      this.dataSource=res.data
      this.totalItems=res.total
  })
}

}

