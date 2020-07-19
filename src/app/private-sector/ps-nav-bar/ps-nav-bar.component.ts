import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ps-nav-bar',
  templateUrl: './ps-nav-bar.component.html',
  styleUrls: ['./ps-nav-bar.component.css']
})
export class PsNavBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  routeToProjects(){
    this.router.navigate(["projects/home"])
  }
  routeToProfile(){
    this.router.navigate(["privateSector/profile"])
  }
}
