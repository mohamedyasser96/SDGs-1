import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngo-profile',
  templateUrl: './ngo-profile.component.html',
  styleUrls: ['./ngo-profile.component.css']
})
export class NgoProfileComponent implements OnInit {
  info: any;

  constructor() { }

  ngOnInit(): void {
    this.info = JSON.parse(localStorage.getItem('info'))
    this.info.projectsCreated.concat(this.info.projectsJoined)
    this.info["projects"] = this.info.projectsCreated
    console.log(this.info.projects)
  }

}
