import { Component, OnInit } from '@angular/core';
import { PsService } from 'src/app/services/ps.service';

@Component({
  selector: 'app-ps-profile',
  templateUrl: './ps-profile.component.html',
  styleUrls: ['./ps-profile.component.css']
})
export class PsProfileComponent implements OnInit {

  loading: boolean;
  ps: any;

  constructor( private privateSectorService: PsService) { }

 async ngOnInit() {
    this.loading = true;
    this.ps = JSON.parse(localStorage.getItem('info'))
    this.ps.projectsCreated.concat(this.ps.projectsJoined)
    this.ps["projects"] = this.ps.projectsCreated
    this.loading = false;
  }
}
