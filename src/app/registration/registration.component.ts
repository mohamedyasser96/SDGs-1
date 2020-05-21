import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  validateNGO!: FormGroup;
  validateStaff!: FormGroup;
  validatePS!: FormGroup;
  showNGO = false;
  showPS = false;
  isVisibleAddStaff = false;
  radioValue;
  staffEmail;
  listOfSDGs: Array<{ label: string; value: string }> = [];
  listOfLocations: Array<{ label: string; value: string }> = [];
  listOfDirections: Array<{ label: string; value: string }> = [];
  listOfResources: Array<{ label: string; value: string }> = [];
  listOfStaff: Array<{ id: number; controlInstance: string }> = [];
  SDGs = [];
  Locations = [];
  Directions = [];
  Resources = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateNGOForm();
    this.validateStaffForm();
    this.validatePSForm();
  }

  validateNGOForm() {
    this.validateNGO = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      name: [null, [Validators.required]],
      mainContact: [null, [Validators.required]],
      vision: [null, [Validators.required]],
      SDGs: [null, [Validators.required]],
      Directions: [null, [Validators.required]],
      Locations: [null, [Validators.required]],
      Resources: [null, [Validators.required]],
    });
  }
  validateStaffForm() {
    this.validateStaff = this.fb.group({
      member: [null, [Validators.required]],
    });
    this.addField();
  }

  validatePSForm() {
    this.validatePS = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      name: [null, [Validators.required]],
      mainContact: [null, [Validators.required]],
      Directions: [null, [Validators.required]],
      Locations: [null, [Validators.required]],
      Resources: [null, [Validators.required]],
    });
  }
  updateConfirmValidator(): void {
    /** wait for refresh value */
    if (this.showNGO) {
      Promise.resolve().then(() =>
        this.validateNGO.controls.checkPassword.updateValueAndValidity()
      );
    } else {
      Promise.resolve().then(() =>
        this.validatePS.controls.checkPassword.updateValueAndValidity()
      );
    }
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (this.showNGO) {
      if (!control.value) {
        return { required: true };
      } else if (control.value !== this.validateNGO.controls.password.value) {
        return { confirm: true, error: true };
      }
      return {};
    } else {
      if (!control.value) {
        return { required: true };
      } else if (control.value !== this.validatePS.controls.password.value) {
        return { confirm: true, error: true };
      }
      return {};
    }
  }
  addStaffMembers() {
    this.isVisibleAddStaff = true;
    this.addField();
  }
  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id =
      this.listOfStaff.length > 0
        ? this.listOfStaff[this.listOfStaff.length - 1].id + 1
        : 0;
    const control = {
      id,
      controlInstance: `${this.staffEmail}`,
    };
    this.listOfStaff.push(control);
    this.staffEmail = null;
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfStaff.length > 1) {
      const index = this.listOfStaff.indexOf(i);
      this.listOfStaff.splice(index, 1);
    }
  }

  showRegistration() {
    if (this.radioValue == 'NGO') {
      this.showNGO = true;
      this.showPS = false;
    } else {
      this.showNGO = false;
      this.showPS = true;
    }
    this.SDGs = null;
    this.Directions = null;
    this.Locations = null;
    this.Resources = null;
  }
  submitNGOForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateNGO.controls) {
      this.validateNGO.controls[i].markAsDirty();
      this.validateNGO.controls[i].updateValueAndValidity();
    }
  }
  submitPSForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validatePS.controls) {
      this.validatePS.controls[i].markAsDirty();
      this.validatePS.controls[i].updateValueAndValidity();
    }
  }
  handleCancelAddStaff() {
    this.isVisibleAddStaff = false;
    // tslint:disable-next-line: forin
    for (const i in this.validateStaff.controls) {
      this.validateStaff.controls[i].markAsDirty();
      this.validateStaff.controls[i].updateValueAndValidity();
    }
  }
}
