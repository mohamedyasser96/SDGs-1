import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Md5 } from 'ts-md5';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitClicked(): void {
    if (this.validateForm.valid) {
      // let user = {
      //   "username": this.validateForm.value.username,
      //   "password": Md5.hashStr(this.validateForm.value.password),
      // }

      let user = {
        "username": this.validateForm.value.username,
        "password":this.validateForm.value.password,
      }
      this.userService.login(user).subscribe(res => {
        localStorage.setItem("token", res.token)
        let info = jwt_decode(res.token)
        localStorage.setItem("info", JSON.stringify(info))
        if (info.type == "NGO")
          this.router.navigate(['/ngo/profile'])
        else if (info.type == "PrivateSector")
          this.router.navigate(['privateSector/profile'])
        else if (info.type == "Admin") 
          this.router.navigate(['admin/home'])
      }, err => {
        alert("invalid login")
      })
    }
  }
}
