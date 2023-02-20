import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './../../services/login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {





  constructor(
    private fb:FormBuilder,
    private router:Router,
    private service:LoginService,
    private toaster:ToastrService,
    private spinner: NgxSpinnerService
    ) { }


  loginForm!: FormGroup;
  ngOnInit(): void {
   this.createForm()
  }

  createForm(){
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      role:['admin']
        })
      }


  login(){
        this.spinner.show();
        this.service.login(this.loginForm.value).subscribe((res:any) =>{
          localStorage.setItem('token',res.token)//enregistrer token qui viens de la reponse
                                                 // dans localStorage
          this.toaster.success("success you can surf in our site","login success");
          this.router.navigate(['dashboard']);//naviger vers dashboard
          this.spinner.hide();
        },error =>{
          this.toaster.error("user name or password incorrect ","error");
          this.spinner.hide();
        })


    }
}
