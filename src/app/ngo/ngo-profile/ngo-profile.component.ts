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
    //Data to test projects
    // this.info.projects.push({
    //   "name":"project 1",
    //   "aim":"ZeroHunger"
    // })
    // this.info.projects.push({
    //   "name":"project 2",
    //   "aim":"Peace"
    // })
  }

}
