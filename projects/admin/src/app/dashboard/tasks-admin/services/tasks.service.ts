import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  userData: any;

  constructor(private http:HttpClient) { }

  getAllTasks(filter:any){
    let params =new HttpParams()//declaration de params pour envoyer valeur de filter ds params
   /* if(filter.keyword){//si ca existe on lenvoie cad on lajoute a params si non c pas la peine
    params = params.append('keyword',filter.keyword)//on ajoute a params valeur de keyword
   }
   if(filter.userId){//si ca existe on lenvoie cad on lajoute a params si non c pas la peine
    params = params.append('userId',filter.userId)//on ajoute a params valeur de userId
   }*/
    /* let headers = new HttpHeaders()//pour envoyer token dans le header
    headers = headers.append('Authorization' ,`Bearer ${localStorage.getItem('token')}`)
    return this.http.get('https://crud-hiz5.onrender.com/tasks/all-tasks',{headers})*/
   Object.entries(filter).forEach(([key,value]:any)=>{
    if(value){
      params = params.append(key,value)
    }
   })//on utilise Object entries pour faire les deux tres  au lieu de faire keyword et userId chacune a part

    return this.http.get(environment.baseApi + '/all-tasks',{params})

  }       //on envoie lobjet params qui contient keyword ds value

  createTask(model:any){
     return this.http.post(environment.baseApi + '/add-task',model)
  }
  //pour creer nouvelle task

  deleteTask(id:any){
    return this.http.delete(environment.baseApi + '/delete-task/'+id )
  }

  updateTask(model:any,id:any){
    return this.http.put(environment.baseApi + '/edit-task/'+id,model)
  }
}




