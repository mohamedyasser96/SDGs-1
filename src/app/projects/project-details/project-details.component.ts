import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: any;
  showAskQuestionModal = false;
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private ProjectService: ProjectService) { }

  ngOnInit(): void {
    this.validation()
    this.project = this.ProjectService.getStoredProject();
  }
  showAskQuestion() {
    this.showAskQuestionModal = true;
  }
  handleCancel() {
    this.showAskQuestionModal = false;
  }
  async submitQuestion() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status == "VALID") {
      let info = {
        "question": this.validateForm.value.question,
        "project": this.project.id
      }
      this.ProjectService.addQuestion(info).toPromise().then(async res => {
        this.project = await this.ProjectService.getProject(this.project.id)
      }).catch(err => {
        alert("cannot add question")
      });
      this.project = await this.ProjectService.getProject(this.project.id)
      this.validateForm.reset();
      this.showAskQuestionModal = false;
    }

  }
  validation() {
    this.validateForm = this.fb.group({
      question: [null, [Validators.required]],
    });
  }
}
