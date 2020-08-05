import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {

  constructor(
    private modalService: NzModalService,
    private router: Router
  ) { }

  ngOnInit() {
    let modal = this.modalService.error({
      nzTitle: 'Session expired',
      nzContent: 'Please try logging back in again by clicking OK to return to login page. Automatically redirecting you to the login page in 10 seconds',
      nzOnOk: () => { modal.destroy(); this.router.navigate(['/login']); clearTimeout(x); }
    });

    let x = setTimeout(() => { modal.destroy(), this.router.navigate(['/login']) }, 10000)
  }

}
