import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';
import { CompteRegister } from '../constant/DTOs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

//createAccountuser(model:CompteRegister){
  //return  this.http.post('https://crud-hiz5.onrender.com/auth/createAccount',model)
// ou bien :
//return this.http.post(environment.baseApi.replace('/tasks','/auth') + '/createAccount',model)
//https://crud-hiz5.onrender.com/tasks  est remplacer par baseApi  //api rassmiya men swagger
//}

}
