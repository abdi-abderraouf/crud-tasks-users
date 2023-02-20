import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';
import { CompteLogin, CompteRegister } from '../constant/DTOs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient) { }

  createAccountuser(model: CompteRegister) {
    return this.http.post(environment.baseApi.replace('/tasks','/auth') + '/createAccount',model)
  }

login(model:CompteLogin){
return this.http.post(environment.baseApi.replace('/tasks','/auth') + '/login',model)
//this.http.post('https://crud-hiz5.onrender.com/auth/createAccount',model)

}

}

