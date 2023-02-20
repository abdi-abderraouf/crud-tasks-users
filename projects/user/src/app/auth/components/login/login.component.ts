import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private router:Router,
    private service:LoginService,
    private toaster:ToastrService
   ) { }

  ngOnInit(): void {
    this.createForm()
  }

  loginForm!:FormGroup;

  createForm(){
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.min(3),Validators.max(20)]],
      role:['user']
    })
  }
  login(){
     this.service.login(this.loginForm.value).subscribe((res:any) =>{
      localStorage.setItem('token',res.token);
      this.router.navigate(['/dashboard/tasks']);
      this.toaster.success('login success','success');
     //error=>{this.toaster.error('chek your password and email','error')
    });
  }

}
