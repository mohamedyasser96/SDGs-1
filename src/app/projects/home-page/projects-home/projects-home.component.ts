import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { SDGsService } from 'src/app/services/sdgs.service';
import { LocationsService } from 'src/app/services/locations.service';
import { ResourcesService } from 'src/app/services/resources.service';
import { Router } from '@angular/router';
import { PsService } from 'src/app/services/ps.service';
import { NgoService } from 'src/app/services/ngo.service';
@Component({
  selector: 'app-projects-home',
  templateUrl: './projects-home.component.html',
  styleUrls: ['./projects-home.component.css']
})
export class ProjectsHomeComponent implements OnInit {

  isVisible: boolean;
  validateForm!: FormGroup;
  isPS: boolean;
  listOfSDGs = [];
  listOfLocations = [];
  listOfResources = [];
  privateSectors=[];
  ngos=[];
  selectedPrivateSectors =[];
  selectedNGOs=[];
  SDGs = [];
  Locations = [];
  Resources = [];
  projects = [];
  filterArgs = {"aim":""}; 
  radioValue = null;
  viewers = [];

  constructor(
    private fb: FormBuilder,
    private ProjectService: ProjectService,
    private sdgsService: SDGsService,
    private locationsService: LocationsService,
    private resourcesService: ResourcesService,
    private privateSectorService: PsService,
    private ngoService: NgoService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.validation();
    this.listOfLocations = await this.locationsService.getLocations();
    this.listOfResources = await this.resourcesService.getResources();
    this.listOfSDGs = await this.sdgsService.getSDGs();
    this.privateSectors = await this.privateSectorService.getPS();
    this.ngos = await this.ngoService.getNGOs();
    this.projects = await this.ProjectService.getProjects();
    //TODO check if token is PS or NGO for nav-bar
    this.isPS = true;
  }

  validation() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      aim: [null, [Validators.required]],
      duration: [null, [Validators.required]],
      people: [null, [Validators.required]],
    });
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  addProject() {
    this.viewers = [];
    this.submitForm();
    if (this.Resources.length != 0 &&
      this.SDGs.length != 0 &&
      this.Locations.length != 0) {
        if(this.radioValue == "All"){
          this.ngos.forEach(ngo => {
            this.viewers.push(ngo.id)
          });
          this.privateSectors.forEach(ps => {
            this.viewers.push(ps.id)
          });
        }
        else if(this.radioValue == "Private Sectors"){
          this.privateSectors.forEach(ps => {
            this.viewers.push(ps.id)
          });
        }
        else if(this.radioValue == "NGOs"){
          this.ngos.forEach(ngo => {
            this.viewers.push(ngo.id)
          });
        }
        else if(this.radioValue == "Specific"){
          this.viewers = this.selectedPrivateSectors.concat(this.selectedNGOs);
        }
        console.log(this.viewers)
      let project = {
        'name': this.validateForm.value.name,
        "aim": this.validateForm.value.aim,
        "duration": this.validateForm.value.duration,
        "peopleTargeted": this.validateForm.value.people,
        "resource": this.Resources,
        "workLocation": this.Locations,
        "intendedSDG": this.SDGs,
        "viewer":this.viewers
      }
      console.log(project)
      this.ProjectService.addProject(project).subscribe(
        (res) => {
          alert('success');
          this.isVisible = false;
          this.validateForm.reset();
        },
        (err) => {
          alert(err.error);
        }
      );
    }
  }

  showCreateProject(): void {
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  pro(project) {
    this.ProjectService.storeProject(project)
    this.router.navigate(['projects/details'])
  }
}
