import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/services/forum.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home-forum',
  templateUrl: './home-forum.component.html',
  styleUrls: ['./home-forum.component.css']
})
export class HomeForumComponent implements OnInit {

  questions: any;
  validateForm: FormGroup;
  showAskQuestionModal = false;

  constructor(private ForumService: ForumService, private Router: Router, private fb: FormBuilder) { }

  async ngOnInit() {
    this.validation()
    this.questions = await this.ForumService.getQuestions();
  }

  showAskQuestion() {
    this.showAskQuestionModal = true;
  }
  handleCancel() {
    this.showAskQuestionModal = false;
  }
  validation() {
    this.validateForm = this.fb.group({
      question: [null, [Validators.required]],
      title: [null, [Validators.required]]
    });
  }

  viewQuestion(id) {
    console.log(id)
    this.ForumService.setQuestionid(id);
    this.Router.navigate(["forum/question"])
  }
  async submitQuestion() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status == "VALID") {
      let info = JSON.parse(localStorage.getItem("info"))
      let question = {
        "title": this.validateForm.value.title,
        "question": this.validateForm.value.question,
        "submitter": info.id
      }
      this.ForumService.submitQuestion(question).subscribe(async res => {
        alert('success');
        this.questions = await this.ForumService.getQuestions();
        this.validateForm.reset();
        this.showAskQuestionModal = false;
      }, err => {
        alert(err.error)
      })
    }

  }
}
