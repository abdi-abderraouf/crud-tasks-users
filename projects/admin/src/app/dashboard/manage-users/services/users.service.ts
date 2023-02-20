import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from './../../../../../../user/src/environments/environment';
export interface userStatus{
  id:string,
  status:string
}


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http:HttpClient) { }
userData = new BehaviorSubject({});//declaration d'un nouveau behavior pour stocker dedans les donnes venant du back
  getAllUrs(filter:any){
    console.log('filter ds getAllUrs ds usersservice',filter)
    let params= new HttpParams()
    if(filter){
    Object.entries(filter).forEach(([key,value]:any)=>{
      if(value){
        params=params.append(key,value)
      }
    })
  }
      return this.http.get(environment.baseApi.replace('tasks','auth')+'/users',{params})
  }

  deleteserv(id:string){

    return this.http.delete(environment.baseApi.replace('tasks','auth')+'/user/'+id)
  }

  changeStatuserv(model:userStatus){
    console.log('model ds service',model)
    return this.http.put(environment.baseApi.replace('tasks','auth')+'/user-status',model)
  }

  getAllUsers(model?:any){
    console.log('model ds getAllUsers ds service',model)
     this.getAllUrs(model).subscribe((res:any) =>{
      this.userData.next({
        data : res.users,
        total : res.totalItems
        //donnee senregistre ds le behavior data et total
      })

     })
  }


}

