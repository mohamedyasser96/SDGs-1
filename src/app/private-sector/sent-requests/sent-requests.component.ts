import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-sent-requests',
  templateUrl: './sent-requests.component.html',
  styleUrls: ['./sent-requests.component.css']
})
export class SentRequestsComponent implements OnInit {

  sentRequests: any;
  requests = [];
  ps: any;

  constructor(
    private requestService: RequestService
  ) { }

  async ngOnInit() {
    this.sentRequests = await this.requestService.getSentRequests();
    this.ps = JSON.parse(localStorage.getItem('info'));

    let row = [];
    for (var i = 0; i < this.sentRequests.length; i++) {
      if (row.length < 2)
        row.push(this.sentRequests[i])
      
      if (row.length == 2) {
        this.requests.push(row);
        row = [];
      }
    }
    if (row.length > 0) 
      this.requests.push(row);
  }
}
