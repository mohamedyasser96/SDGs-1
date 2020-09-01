import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ngo-nav-bar',
  templateUrl: './ngo-nav-bar.component.html',
  styleUrls: ['./ngo-nav-bar.component.css']
})
export class NgoNavBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  routeToProjects(){
    this.router.navigate(["projects/home"])
  }
  routeToProfile(){
    this.router.navigate(["ngo/profile"])
  }

  routeToRequests() {
    this.router.navigate(['ngo/sentRequests']);
  }

  routeToRecRequests() {
    this.router.navigate(['ngo/recievedRequests']);
  }
}
