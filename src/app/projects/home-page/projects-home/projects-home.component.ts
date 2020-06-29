import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-projects-home',
  templateUrl: './projects-home.component.html',
  styleUrls: ['./projects-home.component.css']
})
export class ProjectsHomeComponent implements OnInit {

  isVisible: boolean;
  validateForm!: FormGroup;
  isPS: boolean;
  projects = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
    //TODO check if token is PS or NGO for nav-bar
    this.isPS  = true;
    // Data to test projects
    // this.projects.push({
    //    name: 'project 1',
    //    aim: 'ZeroHunger'
    //  });
    // this.projects.push({
    //    name: 'project 2',
    //    aim: 'Peace'
    //  });
    // this.projects.push({
    //   name: 'project 2',
    //   aim: 'Peace'
    // });
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
    if(this.validateForm.status == "VALID") {
      this.isVisible = false;
      this.validateForm.reset();
    }
  }
  showCreateProject(): void {
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }
}
