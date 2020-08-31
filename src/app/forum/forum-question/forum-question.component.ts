import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/services/forum.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum-question',
  templateUrl: './forum-question.component.html',
  styleUrls: ['./forum-question.component.css']
})
export class ForumQuestionComponent implements OnInit {

  question:any;
  showReplyModal = false;
  validateForm: FormGroup;
  loading:boolean;

  constructor(private ForumService:ForumService, private fb: FormBuilder, private router:Router) { }

  async ngOnInit() {
    this.validation();
    this.loading = true;
    try{
    this.question = await this.ForumService.getQuestion(this.ForumService.getQuestionid());
    }catch(error){
      this.router.navigate(["forum/home"])
    }
    this.loading = false;
  }
  showReply(){
    this.showReplyModal = true;
  }

  handleCancel() {
    this.showReplyModal = false;
  }
  validation() {
    this.validateForm = this.fb.group({
      answer: [null, [Validators.required]]
    });
  }
  submitReply(){
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status == "VALID") {
      let info = JSON.parse(localStorage.getItem("info"))
      let answer = {
        "answer": this.validateForm.value.answer,
        "question": this.ForumService.getQuestionid(),
        "submitter":info.id
      }
      this.ForumService.submitAnswer(answer).subscribe(async res => {
        alert('success');
          this.question = await this.ForumService.getQuestion(this.ForumService.getQuestionid());
          this.validateForm.reset();
          this.showReplyModal = false;
      }, err => {
        alert(err.error)
      })
    }
  }

}
