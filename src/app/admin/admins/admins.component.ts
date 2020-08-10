import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  isVisible = false;
  validateForm!: FormGroup;
  admins:any;
  constructor(private fb: FormBuilder, private AdminService: AdminService) { }

  async ngOnInit() {
    this.validation();
    this.admins = await this.AdminService.getAdmins()
  }

  validation() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  addAdmin() {
    this.submitForm();
    if (this.validateForm.valid) {
      let admin = {
        "name": this.validateForm.value.name,
        "email": this.validateForm.value.email,
        "password": Md5.hashStr(this.validateForm.value.password)
      }
      this.AdminService.addAdmin(admin).subscribe(async res => {
        alert('success');
          this.isVisible = false;
          this.validateForm.reset();
          this.admins = await this.AdminService.getAdmins()
      }, err => {
        alert(err.error)
      })
    }
  }
  showAdminsModel(): void {
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }
}
