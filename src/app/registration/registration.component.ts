import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { NgoService } from '../services/ngo.service';
import { LocationsService } from '../services/locations.service';
import { DirectionsService } from '../services/directions.service';
import { ResourcesService } from '../services/resources.service';
import { SDGsService } from '../services/sdgs.service';
import { PsService } from '../services/ps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  validateNGO!: FormGroup;
  validatePS!: FormGroup;
  showNGO = false;
  showPS = false;
  radioValue;
  listOfSDGs = [];
  listOfLocations = [];
  listOfDirections = [];
  listOfResources = [];
  SDGs = [];
  Locations = [];
  Directions = [];
  Resources = [];
  fileList = [];

  constructor(private fb: FormBuilder, private ngoService: NgoService,
    private sdgsService: SDGsService,
    private psService: PsService,
    private locationsService: LocationsService,
    private directionsService: DirectionsService,
    private resourcesService: ResourcesService,
    private router: Router) { }

  async ngOnInit() {
    this.validateNGOForm();
    this.validatePSForm();
    this.listOfDirections = await this.directionsService.getDirections();
    this.listOfLocations = await this.locationsService.getLocations();
    this.listOfResources = await this.resourcesService.getResources();
    this.listOfSDGs = await this.sdgsService.getSDGs();
  }

  validateNGOForm() {
    this.validateNGO = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      name: [null, [Validators.required]],
      mainContact: [null, [Validators.email, Validators.required]],
      vision: [null, [Validators.required]],
    });
  }
  validatePSForm() {
    this.validatePS = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      name: [null, [Validators.required]],
      mainContact: [null, [Validators.required]],
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

  showRegistration() {
    if (this.radioValue == 'NGO') {
      this.showNGO = true;
      this.showPS = false;
    } else {
      this.showNGO = false;
      this.showPS = true;
    }
    this.SDGs = [];
    this.Directions = [];
    this.Locations = [];
    this.Resources = [];
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
  registerNGO() {
    this.submitNGOForm();
    if (
      this.validateNGO.valid &&
      this.SDGs.length != 0 &&
      this.Directions.length != 0 &&
      this.Locations.length != 0 &&
      this.fileList.length != 0 &&
      this.Resources.length != 0
    ) {
      const formData = new FormData();
      formData.append('name', this.validateNGO.value.name);
      formData.append('email', this.validateNGO.value.email);
      formData.append(
        'password',
        this.validateNGO.value.password.toString()
      );
      formData.append('contact', this.validateNGO.value.mainContact);
      formData.append('vision', this.validateNGO.value.vision);
      this.Resources.forEach((resource: any) => {
        formData.append('resource', resource);
      });
      this.Locations.forEach((location: any) => {
        formData.append('workLocation', location);
      });
      this.Directions.forEach((direction: any) => {
        formData.append('directionToImpact', direction);
      });
      this.SDGs.forEach((sdg: any) => {
        formData.append('intendedSDG', sdg);
      });
      this.fileList.forEach((file: any) => {
        formData.append('file', file);
      });
      this.ngoService.register(formData).subscribe(
        (res) => {
          alert('success');
          this.router.navigate(['/login'])
        },
        (err) => {
          alert(err.error);
        }
      );
    }
  }

  registerPS() {
    this.submitPSForm();
    if (
      this.validatePS.valid &&
      this.Resources.length != 0 &&
      this.Directions.length != 0 &&
      this.Locations.length != 0
    ) {
      let PS = {
        'name': this.validatePS.value.name,
        "email": this.validatePS.value.email,
        "password": this.validatePS.value.password,
        'contact': this.validatePS.value.mainContact,
        "resource": this.Resources,
        "directionToImpact": this.Directions,
        "workLocation": this.Locations,
        "intendedSDG": this.SDGs
      }
      this.psService.register(PS).subscribe(
        (res) => {
          alert('success');
          this.router.navigate(['/login'])
        },
        (err) => {
          alert(err.error);
        }
      );
    }
  }

  beforeUpload = (file: File) => {
    this.fileList = this.fileList.concat(file);
    return false;
  }
}
