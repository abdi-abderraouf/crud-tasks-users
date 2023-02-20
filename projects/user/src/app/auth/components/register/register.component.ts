import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CompteRegister } from '../../constant/DTOs';
import { group } from '@angular/animations';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  constructor(private fb:FormBuilder,
    private service:LoginService,
    private toaster:ToastrService,
    private route:Router
    ) { }
  registerForm!:FormGroup;
  ngOnInit(): void {
    this.createForm();
  }

createForm(){
  this.registerForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    username:['',Validators.required],
    confirmPassword:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
  },
     {validators:this.checkPassword} )
}

/*createAccount(){
  this.service.createAccountuser(this.registerForm.value).subscribe((_data:any)=>{
    alert('user saved');
             this.toaster.success("success you are registered in our site comme utilisateur","register success");
             this.route.navigate(['login']);
  },(_err:any)=>{
             this.toaster.error("essayer de nouveau","register error");
  }
  );
    }*/
//autre methode:
createAccount(){
  const Model:CompteRegister={
    email: this.registerForm.value['email'],
    password: this.registerForm.value['password'],
    username: this.registerForm.value['username'],
    role: 'user',
    confirmPassword: ''
  }
  this.service.createAccountuser(Model).subscribe((_res:any) =>{
    this.route.navigate(['/tasks']);
    this.toaster.success("success you are registered in our site comme utilisateur","success")
  });

}
    checkPassword:ValidatorFn = (group:AbstractControl):ValidationErrors | null =>{
    let pass = group.get("password")?.value;
    let confirmPass = group.get("confirmPassword")?.value;
    return pass === confirmPass ? null : {notsame : true};

  }
}


