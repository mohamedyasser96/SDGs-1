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
    this.ps = await this.retrievePS();
    this.loading = false;
  }
  async retrievePS() {
    try {
      const ps = await this.privateSectorService.getPS();
      console.log(ps)
      return ps;
    } catch (err) {
        alert(err.error.message);
    }
  }
}
