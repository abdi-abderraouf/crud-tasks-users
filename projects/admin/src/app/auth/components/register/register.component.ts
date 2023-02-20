import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor( private formBuilder: FormBuilder,private router: Router,private service: RegisterService,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      role:['admin']
    });

  }

  register() {
    this.service.register(this.registerForm.value).subscribe(
      (_data: any) => {
        this.toaster.success("success you are registered in our site","register success")
        this.router.navigate(['/tasks']);
      },
      ( _error: any) => {
        this.toaster.error("try again ","register error");

      }
    );
    }

}

