import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.css']
})
export class RequestCardComponent implements OnInit {

  @Input() title;
  @Input() requestor;
  @Input() owner;
  @Input() project;
  @Input() status;
  @Input() id;
  @Output() onStatusChange = new EventEmitter();


  constructor(
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
  }

  async accept() {
    await this.requestService.modifyStatus(this.id, "Accepted");
    this.onStatusChange.emit("Accepted");
  }

  async reject() {
    await this.requestService.modifyStatus(this.id, "Rejected");
    this.onStatusChange.emit("Rejected");
  }
}
