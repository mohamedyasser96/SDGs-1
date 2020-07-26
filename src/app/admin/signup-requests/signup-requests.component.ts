import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { AdminService } from 'src/app/services/admin.service';
import { NgoService } from 'src/app/services/ngo.service';
@Component({
  selector: 'app-signup-requests',
  templateUrl: './signup-requests.component.html',
  styleUrls: ['./signup-requests.component.css']
})
export class SignupRequestsComponent implements OnInit {

  admin: any;
  signupRequests: any;
  unauthorized = false;
  detailsVisible = false;
  selectedEntityToView: any;
  selectedEntityToViewKeys: any;
  selectedEntityToViewValues: any;

  constructor(
    private adminService: AdminService,
    private ngoService: NgoService
  ) { }

  async ngOnInit() {
    let tokenInfo = jwt_decode(localStorage.getItem('token'));
    this.admin = {
      email: tokenInfo.email,
      name: 'Admin'
    }
    await this.retrieveSignupRequests();
  }

  async retrieveSignupRequests() {
    try {
      this.signupRequests = await this.adminService.getSignupRequests();
    } catch (err) {
      if (err.status == '401')
        this.unauthorized = true;
      else
        alert(err.error);
    }
  }

  cancelDetails() {
    this.detailsVisible = false;
    this.selectedEntityToView = null;
    this.selectedEntityToViewKeys = null;
    this.selectedEntityToViewValues = null;
  }

  showDetails(index) {
    this.detailsVisible = true;
    this.selectedEntityToView = this.signupRequests[index];
    let entity = this.parseSelectedEntityForViewing(this.selectedEntityToView);
    this.selectedEntityToViewKeys = Object.keys(entity);
    this.selectedEntityToViewValues = Object.values(entity);
  }

  parseSelectedEntityForViewing(entity) {
    let directionsToImpact = [];
    let intendedSDGs = [];
    let resources = [];
    let workLocations = [];

    let selectedEntityBackup = JSON.parse(JSON.stringify(entity));
    delete selectedEntityBackup.name;
    delete selectedEntityBackup.files;

    selectedEntityBackup.directionsToImpact.forEach(dir => {
      directionsToImpact.push(dir.name)
    })

    selectedEntityBackup.intendedSDGs.forEach(sdg => {
      intendedSDGs.push(sdg.name)
    })

    selectedEntityBackup.resources.forEach(resource => {
      resources.push(resource.name)
    })

    selectedEntityBackup.workLocations.forEach(workLocation => {
      workLocations.push(workLocation.area)
    })

    selectedEntityBackup.directionsToImpact = directionsToImpact;
    selectedEntityBackup.intendedSDGs = intendedSDGs;
    selectedEntityBackup.resources = resources;
    selectedEntityBackup.workLocations = workLocations;

    delete selectedEntityBackup.name;
    delete selectedEntityBackup.files;
    delete selectedEntityBackup.projects;

    return selectedEntityBackup;
  }

  download(file) {
    let link = this.ngoService.generateFileLink(file.data, file.fileType, file.fileName);
    window.open(link, "_blank");
  }

  async approveRequest(id, type) {
    try {
      await this.adminService.approveRequest(id, type);
      await this.retrieveSignupRequests();
      alert("Request approved")
    } catch (err) {
      if (err.status == '401')
        this.unauthorized = true;
      else
        alert(err.error);
    }
  }
}
