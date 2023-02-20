import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  register(model:Register){
    return this.http.post('https://crud-hiz5.onrender.com/auth/createAccount',model)
  
}
}
