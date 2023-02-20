import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'projects/user/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  detailTask(MODEL: { id: any; }) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }
  getUserTasks(userId:string,TasksParams:any){
    let params= new HttpParams
    Object.entries(TasksParams).forEach(([key,value]:any)=>{
      params=params.append(key,value)
    })
    return this.http.get(environment.baseApi+'/user-tasks/'+userId,{params})
  }

  completeTask(model:object){
    //console.log('model',model)
    return this.http.put(environment.baseApi+'/complete',model)
  }

  taskDetails(id:any){
    return this.http.get(environment.baseApi+'/task/'+id)
  }
}
